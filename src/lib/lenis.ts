export type LenisOptions = Record<string, unknown>;

export type LenisInstance = {
  destroy: () => void;
  raf: (time: number) => void;
};

export function createLenis(_options?: LenisOptions): LenisInstance | null {
  return null;
}
