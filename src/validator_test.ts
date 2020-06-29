import { assertEquals } from './dev_deps.ts'
import { validate as subject } from './validator.ts'

Deno.test('foo', () => {
  const result = subject('[]')
  assertEquals(result, { kind: 'success', value: [] })
})

Deno.test('foo', () => {
  const result = subject('{}')
  assertEquals(result, { kind: 'success', value: {} })
})

Deno.test('foo', () => {
  const result = subject('{"foo":"bar"}')
  assertEquals(result, { kind: 'success', value: { foo: 'bar' } })
})

Deno.test('foo', () => {
  const result = subject('{"foo":null}')
  assertEquals(result, { kind: 'success', value: { foo: undefined } })
})

Deno.test('bar', () => {
  const result = subject('')
  assertEquals(result, {
    kind: 'failure',
    reason: 'Unexpected end of JSON input: ""',
  })
})

Deno.test('bar', () => {
  const result = subject((undefined as unknown) as string)
  assertEquals(result, {
    kind: 'failure',
    reason: 'Unexpected token u in JSON at position 0: "undefined"',
  })
})

Deno.test('baz', () => {
  const result = subject('1')
  assertEquals(result, {
    kind: 'failure',
    reason: 'Input must contain at least one key/value pair: "1"',
  })
})

Deno.test('baz', () => {
  const result = subject('true')
  assertEquals(result, {
    kind: 'failure',
    reason: 'Input must contain at least one key/value pair: "true"',
  })
})
