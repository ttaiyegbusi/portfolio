import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ArticleListItem from "./notes/ArticleListItem";
import ArticlePreview from "./notes/ArticlePreview";
import { mediumArticles } from "../../data/mediumArticles";

export default function NotesApp() {
  const [selectedArticleId, setSelectedArticleId] = useState(mediumArticles[0]?.id);

  const selectedArticle = mediumArticles.find((a) => a.id === selectedArticleId);

  return (
    <div className="flex h-full w-full bg-white">
      {/* Floating sidebar */}
      <aside className="flex w-[220px] shrink-0 flex-col rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-white/40 p-3 m-4 h-fit max-h-[calc(100%-2rem)] overflow-y-auto">
        <h3 className="mb-3 text-[13px] font-semibold text-inkStrong px-1">Articles</h3>
        <div className="space-y-1">
          {mediumArticles.map((article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              isSelected={selectedArticleId === article.id}
              onClick={() => setSelectedArticleId(article.id)}
            />
          ))}
        </div>
      </aside>

      {/* Main reading area */}
      <div className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <ArticlePreview key={selectedArticle.id} article={selectedArticle} />
          ) : (
            <div className="flex items-center justify-center h-full text-inkMuted">
              No article selected
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
