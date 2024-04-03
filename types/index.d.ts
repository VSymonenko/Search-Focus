interface FrameKey {
  readonly name: string;
  readonly id: string;
}

interface FindOptions {
  caseSensitive: boolean;
  bounderies: boolean;
}

type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
