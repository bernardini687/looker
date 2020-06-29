type Primitive = boolean | number | string | undefined

export type ValidRecord = Record<string, Primitive>

export function isValidRecord(x: unknown): x is ValidRecord {
  if (x instanceof Object) {
    return Object.values(x).every(y =>
      ['boolean', 'number', 'string', 'undefined'].includes(typeof y)
    )
  } else {
    return false
  }
}
