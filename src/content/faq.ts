export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqContent = {
  items: readonly FaqItem[];
};

export const faq = {
  items: [],
} as const satisfies FaqContent;
