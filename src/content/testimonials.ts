export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

export type TestimonialsContent = {
  items: readonly Testimonial[];
};

export const testimonials = {
  items: [],
} as const satisfies TestimonialsContent;
