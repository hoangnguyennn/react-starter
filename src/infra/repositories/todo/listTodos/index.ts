import { todoClient } from '@hn/infra/apis/todoClient'
import { determinationOfErrorCodes } from '@hn/repositories/common/error/determinationOfErrorCodes'
import { RepositoryError } from '@hn/repositories/common/error/repositoryError'
import { createConnectTo } from '@hn/utils/createConnectTo'
import { isErr, Result, unwrapErr } from '@hn/utils/result'
import { ListTodosResponse } from './types'

export const listTodos = async (): Promise<Result<ListTodosResponse, RepositoryError | Error>> => {
  const request = createConnectTo(todoClient.listTodos)
  const response = await request({})

  if (isErr(response)) {
    return determinationOfErrorCodes(unwrapErr(response))
  }

  return response
}
