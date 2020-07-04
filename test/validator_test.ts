import { assertEquals } from '../dev_deps.ts'
import { validate as subject } from '../src/validator.ts'

Deno.test('allowed objects', () => {
  let result = subject('{}')
  assertEquals(result, { kind: 'success', value: {} })

  result = subject('{"1":"1","foo":"bar"}')
  assertEquals(result, { kind: 'success', value: { 1: '1', foo: 'bar' } })

  result = subject('{"foo":null,"bar":"baz"}')
  assertEquals(result, { kind: 'success', value: { foo: null, bar: 'baz' } })
})

Deno.test('allowed arrays', () => {
  let result = subject('[]')
  assertEquals(result, { kind: 'success', value: [] })

  result = subject('["foo","1",null]')
  assertEquals(result, { kind: 'success', value: ['foo', '1', null] })
})

Deno.test('invalid json input', () => {
  let result = subject('')
  assertEquals(result, {
    kind: 'failure',
    reason: 'Unexpected end of JSON input: ""',
  })

  result = subject((undefined as unknown) as string)
  assertEquals(result, {
    kind: 'failure',
    reason: 'Unexpected token u in JSON at position 0: "undefined"',
  })
})

Deno.test('invalid primitive inputs', () => {
  let result = subject('1')
  assertEquals(result, {
    kind: 'failure',
    reason: 'Input must be an object with primitive values: "1"',
  })

  result = subject('true')
  assertEquals(result, {
    kind: 'failure',
    reason: 'Input must be an object with primitive values: "true"',
  })

  result = subject('null')
  assertEquals(result, {
    kind: 'failure',
    reason: 'Input must be an object with primitive values: "null"',
  })
})

Deno.test('invalid complex inputs', () => {
  let result = subject('{"bar":{}}')
  assertEquals(result, {
    kind: 'failure',
    reason: 'Input must be an object with primitive values: "{"bar":{}}"',
  })

  result = subject('[true,1,"1",[]]')
  assertEquals(result, {
    kind: 'failure',
    reason: 'Input must be an object with primitive values: "[true,1,"1",[]]"',
  })
})
