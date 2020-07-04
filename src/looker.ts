import { Body } from './body.ts'
import { unwrapResultOrExit } from './unwrap_result.ts'
import { validate } from './validator.ts'

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
