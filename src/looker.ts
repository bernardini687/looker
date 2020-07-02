import { validate } from './validator.ts'
import { Body } from './body.ts'

type Result<T> =
  | {
      kind: 'success'
      value: T
    }
  | {
      kind: 'failure'
      reason: string
    }

function unwrapResultOrExit<T>(result: Result<T>): T {
  if (result.kind === 'failure') {
    console.error(result.reason)
    Deno.exit(1)
  }
  return result.value
}

function looker(): void {
  const [jsonString] = Deno.args

  const validRecord = unwrapResultOrExit(validate(jsonString))

  const body = unwrapResultOrExit(Body.build(validRecord))

  console.log(body)
}

if (import.meta.main) {
  looker()
}

/*
  Usage:

    looker '{"header":"function","name":"info","description":"Display info.","parameter  1":null}' | pbcopy

  Result:

    #====  FUNCTION  =======================================================================
    #          NAME:  info
    #   DESCRIPTION:  Display info.
    #  PARAMETER  1:  ---
    #=======================================================================================

    #  FUNCTIONFUNCTION  ===================================================================
    #              NAME:  info
    #       DESCRIPTION:  Display info.
    #      PARAMETER  1:  ---
    #=======================================================================================
*/
