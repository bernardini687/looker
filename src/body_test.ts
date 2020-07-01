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
    separator,
  })
})

Deno.test('build a Body without header', () => {
  const validRecord = { asdf: 'asdf', foo: 'bar' }

  const result = new Subject(validRecord)

  assertEquals(result, {
    header: undefined,
    leftMargin,
    padding: 4,
    payload: validRecord,
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

// edge cases
// const size80Key = 'a'.repeat(80)
// { header: null, [size80Key]: null }

// { header: 'asdf'.repeat(20) }

// { header: 'asdf'.repeat(40) }

// { foo: 'asdf'.repeat(40) }

// const superLongKey = 'asdf'.repeat(40)
// { [superLongKey]: 'asdf'.repeat(40) }
// { [superLongKey]: 'asdf' }
