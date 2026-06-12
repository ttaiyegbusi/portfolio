import { useCallback, useMemo, useState } from "react";
import ExplorationsSidebar from "./dribbble/ExplorationsSidebar";
import DesignGrid from "./dribbble/DesignGrid";
import PreviewWindow from "./dribbble/PreviewWindow";
import { designShots } from "../../data/designShots";
import type { AppContentProps } from "../../types";
import type { DesignShot } from "../../data/designShots";

export default function DribbbleApp({ controls, dragHandleProps }: AppContentProps) {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [previewDesign, setPreviewDesign] = useState<DesignShot | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Filter designs by year
  const yearDesigns = useMemo(() => {
    return designShots.filter((d) => d.year === selectedYear);
  }, [selectedYear]);

  // Get the current preview design from the filtered list
  const currentPreviewDesign = useMemo(() => {
    if (!previewDesign) return null;
    const idx = yearDesigns.findIndex((d) => d.id === previewDesign.id);
    if (idx === -1) return null;
    setPreviewIndex(idx);
    return yearDesigns[idx];
  }, [previewDesign, yearDesigns]);

  const handleSelectDesign = useCallback((design: DesignShot) => {
    setPreviewDesign(design);
  }, []);

  const handlePrevious = useCallback(() => {
    if (previewIndex > 0) {
      setPreviewDesign(yearDesigns[previewIndex - 1]);
    }
  }, [previewIndex, yearDesigns]);

  const handleNext = useCallback(() => {
    if (previewIndex < yearDesigns.length - 1) {
      setPreviewDesign(yearDesigns[previewIndex + 1]);
    }
  }, [previewIndex, yearDesigns]);

  const handleClosePreview = useCallback(() => {
    setPreviewDesign(null);
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white/80">
      {/* Header */}
      <header
        {...dragHandleProps}
        className="flex h-[38px] shrink-0 cursor-default select-none items-stretch border-b border-borderFaint bg-white/95"
      >
        <div className="flex items-center border-r border-borderFaint px-4">{controls}</div>
        <div className="flex items-center border-r border-borderFaint px-4 text-[12px] font-semibold text-[#2F2F2F]">
          Dribbble
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-4">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[7px] w-[7px] rounded-full bg-[#D5D5D5]" />
          ))}
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <ExplorationsSidebar selectedYear={selectedYear} onYearChange={setSelectedYear} />
        <DesignGrid designs={yearDesigns} onSelectDesign={handleSelectDesign} />
      </div>

      {/* Preview window */}
      {currentPreviewDesign && (
        <PreviewWindow
          design={currentPreviewDesign}
          isOpen={previewDesign !== null}
          onClose={handleClosePreview}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoPrevious={previewIndex > 0}
          canGoNext={previewIndex < yearDesigns.length - 1}
        />
      )}
    </div>
  );
}
