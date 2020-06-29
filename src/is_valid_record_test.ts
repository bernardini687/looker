import { assert } from './dev_deps.ts'
import { isValidRecord as subject } from './is_valid_record.ts'

Deno.test('is a record', () => {
  let result = subject({})
  assert(result)

  result = subject([])
  assert(result)

  result = subject({ foo: 'bar' })
  assert(result)

  result = subject(['bar'])
  assert(result)

  result = subject({ foo: 1 })
  assert(result)

  result = subject([1])
  assert(result)

  result = subject({ foo: true })
  assert(result)

  result = subject([true])
  assert(result)

  result = subject({ foo: null })
  assert(result)

  result = subject([null])
  assert(result)
})

Deno.test('is not a record', () => {
  let result = subject('bar')
  assert(!result)

  result = subject(1)
  assert(!result)

  result = subject(true)
  assert(!result)

  result = subject(null)
  assert(!result)

  result = subject(undefined)
  assert(!result)

  result = subject([undefined])
  assert(!result)

  result = subject({ foo: {} })
  assert(!result)

  result = subject({ foo: [] })
  assert(!result)

  result = subject(['bar', {}])
  assert(!result)

  result = subject([1, [true]])
  assert(!result)
})
