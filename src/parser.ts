type ParserResult =
  | {
      kind: 'success'
      value: JSON
    }
  | {
      kind: 'failure'
      value: string
    }

export function parser(x: string): ParserResult {
  try {
    return { kind: 'success', value: JSON.parse(x) }
  } catch (error) {
    return { kind: 'failure', value: `${error.message}: "${x}"` }
  }
}
