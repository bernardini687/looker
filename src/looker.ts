import { validate } from './validator.ts'

function looker() {
  const [jsonString] = Deno.args

  const result = validate(jsonString)

  if (result.kind === 'failure') {
    console.error(result.reason)
    Deno.exit(1)
  }

  // validate max `'# ' + key + ':  ' + value`.length < 89
  // build instance with metadata (header, leftPadding, payload)

  console.log(result.value)
}

if (import.meta.main) {
  looker()
}

/*
  Usage:

    looker '{"header":"function","name":"info","description":"Display info.","parameter  1":null}' | pbcopy

  Result:

    #===  FUNCTION  ========================================================================
    #         NAME:  info
    #  DESCRIPTION:  Display info.
    # PARAMETER  1:  ---
    #=======================================================================================
*/
