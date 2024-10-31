export type TEntityForm<T> = {
  [Property in keyof T]:T[Property] extends (boolean | any[]) ? T[Property] : (T[Property] | null)
}