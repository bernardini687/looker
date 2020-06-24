import { assertEquals } from './dev_deps.ts'
import { parser as subject } from './parser.ts'

Deno.test('foo', () => {
  const result = subject('[]')
  assertEquals(result, { kind: 'success', value: [] })
})

Deno.test('foo', () => {
  const result = subject('{"foo":"bar"}')
  assertEquals(result, { kind: 'success', value: { foo: 'bar' } })
})

Deno.test('foo', () => {
  const result = subject('')
  assertEquals(result, {
    kind: 'failure',
    value: 'Unexpected end of JSON input: ""',
  })
})

Deno.test('foo', () => {
  const result = subject((undefined as unknown) as string)
  assertEquals(result, {
    kind: 'failure',
    value: 'Unexpected token u in JSON at position 0: "undefined"',
  })
})
