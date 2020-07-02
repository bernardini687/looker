import { assertEquals, assertThrows } from './dev_deps.ts'
import { Body as Subject } from './body.ts'

/*
#  FOO  ============
#  BAR:  baz
#===================

#  FOOFOOFOOFOOFOO
#              BAR:  baz
#===================

#  ASDF  ===========
#   BAR:  baz
#===================

#===================
#  ASDF:  asdf
#   BAR:  baz
#===================
*/

const leftMargin = '#  '
const placeholder = '---'
const separator = ':  '

Deno.test('build a Body with header', () => {
  const validRecord = { header: 'foo', bar: 'baz' }
  const { header, ...payload } = validRecord

  const result = new Subject(validRecord)

  assertEquals(result, {
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

  const result = new Subject(validRecord)

  assertEquals(result, {
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

  const result = new Subject(validRecord)

  assertEquals(result, {
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

  const result = new Subject(validRecord)

  assertEquals(result, {
    header: '',
    leftMargin,
    padding: 4,
    payload: validRecord,
    placeholder,
    separator,
  })
})

Deno.test('throws if header exceeds max length', () => {
  const validRecord = { header: 'asdf'.repeat(20), asdf: 'asdf' }

  /*
  #  asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf  ===
  #                                                                              asdf:  asdf
  #=======================================================================================
  */

  assertThrows(
    () => {
      new Subject(validRecord)
    },
    Error,
    'get rid of 2 character'
  )
})

Deno.test('throw if payload exceeds max length', () => {
  const validRecord = { asdf: 'asdf'.repeat(20), foo: 'bar' }

  /*
  #=======================================================================================
  #  asdf:  asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
  #   foo:  bar
  #=======================================================================================
  */

  assertThrows(
    () => {
      new Subject(validRecord)
    },
    Error,
    'get rid of 2 character'
  )
})

Deno.test('edge case:', () => {
  /*
  #=======================================================================================
  –  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:  ---
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

Deno.test('edge case:', () => {
  /*
  #=======================================================================================
  –  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:  ---
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

Deno.test('edge case:', () => {
  /*
  #  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  #=======================================================================================
  */
  const size85Header = 'a'.repeat(85)
  console.log(new Subject({ header: size85Header }))

  const size87Header = 'a'.repeat(87)
  console.log(new Subject({ header: size87Header }))

  // if only header, 88 - '#  ' - '  ' should be max allowed (83)
  // test if edge case header plus

  /*
  #  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  #                                                                                    f:  b
  #=======================================================================================
  */

  /*
  #  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  #                                                                                  f:  b
  #=======================================================================================
  */
})

/*
  extra long header
  just about right header

  extra long value
  just about right value

  extra long key
  just about right key

  just about right header + key/value
*/

// { header: 'asdf'.repeat(20) }

// { header: 'asdf'.repeat(40) }

// { foo: 'asdf'.repeat(40) }

// const superLongKey = 'asdf'.repeat(40)
// { [superLongKey]: 'asdf'.repeat(40) }
// { [superLongKey]: 'asdf' }
