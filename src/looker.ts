import { Body } from './body.ts'
import { unwrapResultOrExit } from './unwrap_result.ts'
import { validate } from './validator.ts'

function looker(): void {
  const [jsonString] = Deno.args
  const validRecord = unwrapResultOrExit(validate(jsonString))
  const body = unwrapResultOrExit(Body.build(validRecord))
  body.display()
}

if (import.meta.main) {
  looker()
}
