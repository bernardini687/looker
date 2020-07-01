import { validate } from './validator.ts'

function looker() {
  const [jsonString] = Deno.args

  const result = validate(jsonString)

  if (result.kind === 'failure') {
    console.error(result.reason)
    Deno.exit(1)
  }

  // try/catch new Body

  // body.display()

  console.log(result.value)
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
