// Section 7 — Built Inside a Wedding Studio. Replaces a conventional
// testimonials/social-proof section on purpose: no invented customer
// logos, no fabricated statistics, no testimonial carousel. This is the
// product's origin story — credibility through authenticity, not
// marketing claims.

export const sectionCopy = {
  eyebrow: "OUR STORY",
  headline: "Built inside a wedding studio.",
  body: [
    "SnapOps AI wasn't created in a boardroom.",
    "It was built while running Nuptial Diaries.",
    "Every workflow, every automation and every feature was shaped by real wedding projects, real clients and real operational challenges.",
    "This is software created by people who run a wedding studio every single day.",
  ],
};

// Real photo goes at public/images/founder-story.jpg once it exists. Until
// then, PhotoOrPlaceholder (in index.tsx) renders a premium placeholder in
// its place at the same dimensions — no stock or AI-generated image here.
export const photo = {
  src: "/images/founder-story.jpg",
  alt: "The Nuptial Diaries studio at work",
};

// A founder statement, not a testimonial — deliberately unnamed rather
// than attributed to an invented person.
export const founderNote = {
  quote:
    "We built the software we always wished existed. After years of managing weddings, clients, payments and deliveries manually, we decided to build the operating system our studio deserved. Now we're making it available to every wedding studio.",
  attribution: "— The Founder, Nuptial Diaries",
};

export const timelineSteps = [
  "Wedding Studio",
  "Operational Challenges",
  "Built SnapOps AI",
  "Now available for every wedding studio",
];
