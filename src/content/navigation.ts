export type NavigationItem = {
  id: string;
  label: string;
  href: string;
};

export type NavigationContent = {
  primary: readonly NavigationItem[];
  footer: readonly NavigationItem[];
};

export const navigation = {
  primary: [],
  footer: [
    { id: "terms", label: "Terms of Service", href: "/terms" },
    { id: "privacy", label: "Privacy Policy", href: "/privacy" },
    { id: "refund-policy", label: "Refund Policy", href: "/refund-policy" },
  ],
} as const satisfies NavigationContent;
