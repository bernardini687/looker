export type Result<T> =
  | {
      kind: 'success'
      value: T
    }
  | {
      kind: 'failure'
      reason: string
    }

export function unwrapResultOrExit<T>(result: Result<T>): T {
  if (result.kind === 'failure') {
    console.error(result.reason)
    Deno.exit(1)
  }
  return result.value
}
