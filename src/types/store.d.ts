declare namespace Store {
  export interface IAppState {
    isLoading: boolean
    language: string
    snackbars: Types.ISnackbar[]
  }

  export interface IAuthState {
    token: string
  }

  export interface IRootState {
    app: IAppState
    auth: IAuthState
    pageBuilder: PageBuilder.IPageBuilderState
  }

  export interface IAction<T> {
    type: string
    payload: T
  }
}
