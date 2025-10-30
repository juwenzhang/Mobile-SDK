export type Nullish = null | undefined;

export type Keyvalue<T = any> = Record<string, T>

export type Noop = () => void;

export type Callback<T = any> = (res: T) => void;

export type MayBePromise<T> = T | Promise<T>;