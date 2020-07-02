/** An Object whose props hold strings or nulls. */
export type ValidRecord = Record<string, string | null>

export function isValidRecord(x: unknown): x is ValidRecord {
  if (x instanceof Object) {
    return Object.values(x).every(y => typeof y === 'string' || y === null)
  } else {
    return false
  }
}
