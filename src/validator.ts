import { isValidRecord, ValidRecord } from './is_valid_record.ts'
import { Result } from './unwrap_result.ts'

export function validate(jsonString: string): Result<ValidRecord> {
  try {
    const parsed = JSON.parse(jsonString)

    if (isValidRecord(parsed)) {
      return { kind: 'success', value: parsed }
    } else {
      throw new Error('Input must be an object with string values')
    }
  } catch (error) {
    return { kind: 'failure', reason: `${error.message}: "${jsonString}"` }
  }
}
