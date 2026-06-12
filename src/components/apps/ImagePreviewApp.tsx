import { motion } from "framer-motion";
import { usePreview } from "../../context/PreviewContext";
import type { AppContentProps } from "../../types";

export default function ImagePreviewApp({ dragHandleProps, controls }: AppContentProps) {
  const { imageUrl, title } = usePreview();

  if (!imageUrl || !title) {
    return (
      <div className="flex h-full w-full flex-col bg-white">
        <header
          {...dragHandleProps}
          className="flex h-[38px] shrink-0 cursor-default select-none items-stretch border-b border-borderLight bg-chrome"
        >
          <div className="flex items-center border-r border-borderLight px-4">{controls}</div>
          <div className="flex items-center border-r border-borderLight px-4 text-[12px] font-semibold text-[#2F2F2F]">
            Preview
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-4">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-[7px] w-[7px] rounded-full bg-[#D5D5D5]" />
            ))}
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center text-inkMuted">
          No image selected
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <header
        {...dragHandleProps}
        className="flex h-[38px] shrink-0 cursor-default select-none items-stretch border-b border-borderLight bg-chrome"
      >
        <div className="flex items-center border-r border-borderLight px-4">{controls}</div>
        <div className="flex items-center border-r border-borderLight px-4 text-[12px] font-semibold text-[#2F2F2F] truncate">
          {title}
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-4">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[7px] w-[7px] rounded-full bg-[#D5D5D5]" />
          ))}
        </div>
      </header>

      {/* Image viewer */}
      <div className="flex-1 overflow-auto bg-[#F7F7F7] flex items-center justify-center p-6">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          src={imageUrl}
          alt={title}
          className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
}
