export type Union<Key extends string, T> = {
  case: Key;
  value: T;
};
export type DiscriminatedUnion<U extends Union<string, any>[]> = U[number]