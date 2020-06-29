import { validate } from './validator.ts'

function looker() {
  const [jsonString] = Deno.args

  const result = validate(jsonString)

  if (result.kind === 'failure') {
    console.error(result.reason)
    Deno.exit(1)
  }

  // validate max `'# ' + key + ':  ' + value`.length < 89
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

/*
  parser() should transform `null`s in `undefined`s
  parser() should only pass `[]`, `{}`, `[1, '1']`, `{ 1: 1, 2: '2', 3: undefined }`
  (an Object whose props are primitive values)
*/
