import { assertEquals, assertThrows } from './dev_deps.ts'
import { Body as Subject } from './body.ts'

Deno.test('successfully build a Body with header', () => {
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

Deno.test('successfully build a Body without header', () => {
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

// Deno.test('throws if header exceeds max length', () => {
//   const validRecord = { header: 'asdf'.repeat(20), asdf: 'asdf' }

//   assertThrows(
//     () => {
//       new Subject(validRecord)
//     },
//     Error,
//     'get rid of 1 character'
//   )
// })

Deno.test('throw if payload exceeds max length', () => {
  const validRecord = { foo: 'bar', asdf: 'asdf'.repeat(20) }

  assertThrows(
    () => {
      new Subject(validRecord)
    },
    Error,
    'get rid of 1 character'
  )
})
