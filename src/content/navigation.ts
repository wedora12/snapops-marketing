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
  footer: [],
} as const satisfies NavigationContent;
