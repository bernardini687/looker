import { assertEquals, assertThrows } from './dev_deps.ts'
import { Body as Subject } from './body.ts'

Deno.test('successfully build a Body with metadata', () => {
  const validRecord = { header: 'foo', bar: 'baz' }
  const { header, ...payload } = validRecord

  const result = new Subject(validRecord)

  assertEquals(result, {
    header,
    leftMargin: '# ',
    padding: 3,
    payload,
    separator: ':  ',
  })
})

Deno.test('successfully build a Body with metadata', () => {
  const validRecord = { asdf: 'asdf', foo: 'bar' }

  const result = new Subject(validRecord)

  assertEquals(result, {
    header: undefined,
    leftMargin: '# ',
    padding: 4,
    payload: validRecord,
    separator: ':  ',
  })
})
