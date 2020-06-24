type ParserResult =
  | {
      kind: 'success'
      value: object // `ts` way of expressing parsed JSON type?
    }
  | {
      kind: 'failure'
      value: string
    } // `ts` way of expressing a `discriminated unions` type?

export function parser(x: string): ParserResult {
  try {
    return { kind: 'success', value: JSON.parse(x) }
  } catch (error) {
    return { kind: 'failure', value: `${error.message}: "${x}"` }
  }
}
