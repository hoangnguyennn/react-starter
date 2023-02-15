/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace Types {
  export type Nullable<T> = T | null

  export interface Object<T = any> {
    [key: string]: T
  }

  export interface ISnackbarOption {
    message: string
    title?: string
  }

  export interface ISnackbar extends ISnackbarOption {
    id: string
  }
}
