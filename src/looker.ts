import { parser } from './parser.ts'

function looker() {
  const [jsonString] = Deno.args

  const { kind, value } = parser(jsonString)

  if (kind === 'failure') {
    console.error(value)
    Deno.exit(1)
  }

  // validate max `'# ' + key + ':  ' + value`.length < 89
  console.log(value)
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
