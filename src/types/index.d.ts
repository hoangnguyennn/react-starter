/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace Types {
  export type Nullable<T> = T | null

  export interface Object<T = any> {
    [key: string]: T
  }
}
