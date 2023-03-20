type Flatten<T> =
  T extends object ? {
    [K in keyof T]: T[K] extends infer O
      ? `${string & K}${O extends (any[] | File) // TODO: this should be handled differently
        ? ''
        : O extends object
          ? `.${Flatten<O>}`
          : ''}`
      : never
  }[keyof T] : ''

export type Flattened<T, TOut> = { [K in Flatten<T>]?: TOut }