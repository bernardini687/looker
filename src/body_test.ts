import { assertEquals, assertThrows } from './dev_deps.ts'
import { Body as Subject } from './body.ts'

const leftMargin = '#  '
const placeholder = '---'
const separator = ':  '

Deno.test('build a Body with header', () => {
  const validRecord = { header: 'foo', bar: 'baz' }
  const { header, ...payload } = validRecord

  assertEquals(new Subject(validRecord), {
    header,
    leftMargin,
    padding: 3,
    payload,
    placeholder,
    separator,
  })
})

Deno.test('build a Body with longer header', () => {
  const validRecord = { header: 'qwerty', foo: 'bar' }
  const { header, ...payload } = validRecord

  assertEquals(new Subject(validRecord), {
    header: 'qwerty',
    leftMargin,
    padding: 6,
    payload,
    placeholder,
    separator,
  })
})

Deno.test('build a Body with empty header', () => {
  const validRecord = { header: '', foo: 'bar' }
  const { header, ...payload } = validRecord

  assertEquals(new Subject(validRecord), {
    header: '',
    leftMargin,
    padding: 3,
    payload,
    placeholder,
    separator,
  })
})

Deno.test('build a Body without header', () => {
  const validRecord = { asdf: 'asdf', foo: 'bar' }

  assertEquals(new Subject(validRecord), {
    header: '',
    leftMargin,
    padding: 4,
    payload: validRecord,
    placeholder,
    separator,
  })
})

Deno.test('throws if header exceeds max length', () => {
  /*
#  asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf  ===
#                                                                              asdf:  asdf
#=======================================================================================
  */
  assertThrows(
    () => {
      new Subject({ header: 'asdf'.repeat(20), asdf: 'asdf' })
    },
    Error,
    'get rid of 2 character'
  )
})

Deno.test('throw if payload exceeds max length', () => {
  /*
#=======================================================================================
#  asdf:  asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
#   foo:  bar
#=======================================================================================
  */
  assertThrows(
    () => {
      new Subject({ asdf: 'asdf'.repeat(20), foo: 'bar' })
    },
    Error,
    'get rid of 2 character'
  )
})

Deno.test('edge case: null and empty string values', () => {
  /*
#=======================================================================================
#  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:  ---
#=======================================================================================
  */
  const size82Key = 'a'.repeat(82)

  assertThrows(
    () => {
      new Subject({ [size82Key]: null })
    },
    Error,
    'get rid of 3 character'
  )

  assertThrows(
    () => {
      new Subject({ [size82Key]: '' })
    },
    Error,
    'get rid of 3 character'
  )
})

Deno.test('edge case: just about right key with null value', () => {
  /*
#=======================================================================================
#  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:  ---
#=======================================================================================
  */
  const size79Key = 'a'.repeat(79)

  assertEquals(new Subject({ header: null, [size79Key]: null }), {
    header: '',
    leftMargin,
    padding: 79,
    payload: { [size79Key]: null },
    placeholder,
    separator,
  })
})

Deno.test('edge case: just about right header without payload', () => {
  /*
#  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
#=======================================================================================
  */
  const size85Header = 'a'.repeat(85)

  assertEquals(new Subject({ header: size85Header }), {
    header: size85Header,
    leftMargin,
    padding: 85,
    payload: {},
    placeholder,
    separator,
  })
})

Deno.test('edge case: just about right header with just about right payload', () => {
  /*
#  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
#                                                                                  f:  b
#=======================================================================================
  */
  const size81Header = 'a'.repeat(81)

  assertEquals(new Subject({ header: size81Header, f: 'b' }), {
    header: size81Header,
    leftMargin,
    padding: 81,
    payload: { f: 'b' },
    placeholder,
    separator,
  })
})

Deno.test('edge case: just about right header with payload', () => {
  /*
#  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
#                                                                                    f:  b
#=======================================================================================
  */
  assertThrows(
    () => {
      new Subject({ header: 'a'.repeat(83), f: 'b' })
    },
    Error,
    'get rid of 2 character'
  )
})

Deno.test('edge case: header exceeds by 1', () => {
  /*
#  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
#=======================================================================================
  */
  assertThrows(
    () => {
      new Subject({ header: 'a'.repeat(86) })
    },
    Error,
    'get rid of 1 character'
  )
})

Deno.test('edge case: value too long', () => {
  /*
#  function  ===========================================================================
#      asdf:  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
#         f:  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
#=======================================================================================
  */
  assertThrows(
    () => {
      new Subject({ header: 'function', asdf: 'a'.repeat(74), f: 'a'.repeat(75) })
    },
    Error,
    'get rid of 1 character'
  )
})
