/** An Object whose props hold strings or nulls. */
export type ValidRecord = Record<string, string | null>

export function isValidRecord(x: unknown): x is ValidRecord {
  if (x instanceof Object) {
    return Object.values(x).every(value => typeof value === 'string' || value === null)
  } else {
    return false
  }
}
