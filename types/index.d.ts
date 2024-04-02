interface FrameKey {
  name: string;
  id: string;
}

interface FindOptions {
  caseSensitive: boolean;
  bounderies: boolean;
}

type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

type FindOptions = {
  caseSensitive: boolean;
  bounderies: boolean;
};
