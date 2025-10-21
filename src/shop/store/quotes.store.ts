import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Article {
  motorcycle_type: string;
  brand?: string;
  color?: string;
  photo: string;
  amount: number;
  code: string;
}

type QuotesState = {
  articles: Article[];
  addArticle: (article: Article) => void;
  addamount: (code: string) => void;
  subtractamount: (code: string) => void;
  removeArticle: (code: string) => void;
  clearArticles: () => void;
};
export const useQuotesStore = create<QuotesState>()(
  persist(
    (set, get) => ({
      articles: [],
      addArticle: (article: Article) => {
        const articles = get().articles;
        const articleExists = articles.find((a) => a.code === article.code);
        if (!articleExists) {
          set({ articles: [...articles, article] });
        } else {
          set((state) => ({
            articles: state.articles.map((article) => {
              if (article.code === articleExists.code) {
                return { ...article, amount: article.amount + 1 };
              }
              return article;
            }),
          }));
        }
      },
      removeArticle: (code: string) =>
        set((state) => ({
          articles: state.articles.filter((article) => article.code !== code),
        })),
      addamount: (code: string) =>
        set((state) => ({
          articles: state.articles.map((article) => {
            if (article.code === code) {
              return { ...article, amount: article.amount + 1 };
            }
            return article;
          }),
        })),
      subtractamount: (code: string) =>
        set((state) => ({
          articles: state.articles.map((article) => {
            if (article.code === code && article.amount > 1) {
              return { ...article, amount: article.amount - 1 };
            }
            return article;
          }),
        })),
      clearArticles: () => set({ articles: [] }),
    }),
    {
      name: "quotes-storage",
      partialize: (state) => ({
        articles: state.articles,
      }),
    }
  )
);
