import { motion } from "framer-motion";
import ArticleTags from "./ArticleTags";
import type { MediumArticle } from "../../../data/mediumArticles";

interface ArticlePreviewProps {
  article: MediumArticle;
}

export default function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <motion.div
      key={article.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col h-full"
    >
      {/* Cover image */}
      <div
        className="h-40 rounded-lg bg-gradient-to-br mb-6 flex-shrink-0"
        style={{ backgroundImage: `url(${article.coverImage}), linear-gradient(135deg, #e0e7ff 0%, #f0e7ff 100%)` }}
      />

      {/* Article metadata */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-semibold text-inkTertiary uppercase tracking-wide">{article.source}</span>
        <span className="text-[10px] text-inkMuted">•</span>
        <span className="text-[11px] text-inkMuted">{article.date}</span>
        <span className="text-[10px] text-inkMuted">•</span>
        <span className="text-[11px] text-inkMuted">{article.readTime}</span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-inkStrong mb-2 line-clamp-3">{article.title}</h2>

      {/* Subtitle */}
      <p className="text-[15px] text-inkSecondary mb-4">{article.subtitle}</p>

      {/* Tags */}
      <div className="mb-6">
        <ArticleTags tags={article.tags} />
      </div>

      {/* Preview content with fade overlay */}
      <div className="flex-1 relative overflow-hidden">
        <div className="max-h-48 overflow-hidden">
          <p className="text-[15px] leading-relaxed text-inkSecondary">{article.excerpt}</p>
        </div>

        {/* Gradient fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
      </div>

      {/* CTA button */}
      <motion.a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 px-4 py-2.5 bg-inkStrong text-white rounded-lg font-medium text-[13px] text-center transition-all hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inkStrong/40"
      >
        Continue reading on Medium
      </motion.a>
    </motion.div>
  );
}
