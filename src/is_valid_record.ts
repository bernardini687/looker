type Primitive = boolean | number | string | null

export type ValidRecord = Record<string, Primitive>

export function isValidRecord(x: unknown): x is ValidRecord {
  if (x instanceof Object) {
    return Object.values(x).every(
      y => ['boolean', 'number', 'string'].includes(typeof y) || y === null
    )
  } else {
    return false
  }
}
