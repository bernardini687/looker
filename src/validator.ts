import { isValidRecord, ValidRecord } from './is_valid_record.ts'

type ParserResult =
  | {
      kind: 'success'
      value: ValidRecord
    }
  | {
      kind: 'failure'
      reason: string
    }

export function validate(x: string): ParserResult {
  try {
    const parsed = JSON.parse(x)

    if (isValidRecord(parsed)) {
      return { kind: 'success', value: parsed }
    } else {
      throw new Error('Input must be an object with primitive values')
    }
  } catch (error) {
    return { kind: 'failure', reason: `${error.message}: "${x}"` }
  }
}
