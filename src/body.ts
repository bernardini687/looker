import { ValidRecord } from './is_valid_record.ts'

type Result<T> =
  | {
      kind: 'success'
      value: T
    }
  | {
      kind: 'failure'
      reason: string
    }

export class Body {
  static readonly MAX_LINE = 88
  // static readonly GLOBAL_MARGIN = 2

  private readonly header: string
  private readonly leftMargin = '#  '
  private readonly padding: number
  private readonly payload: ValidRecord
  private readonly placeholder = '---'
  private readonly separator = ':  '

  constructor(validRecord: ValidRecord) {
    const { header, ...payload } = validRecord
    this.header = header || ''
    this.payload = payload
    this.padding = this.maxFieldSize()
    this.validatePayload()
  }

  static build(validRecord: ValidRecord): Result<Body> {
    try {
      return { kind: 'success', value: new this(validRecord) }
    } catch (error) {
      return { kind: 'failure', reason: 'At least one line is too long, ' + error.message }
    }
  }

  private validatePayload(): void {
    const lineSizes = Object.values(this.payload).map(value => {
      const valueSize = value?.length || this.placeholder.length

      return this.leftMargin.length + this.padding + this.separator.length + valueSize
    })

    const actualHeaderSize = this.leftMargin.length + this.header.length

    const maxLineSize = Math.max(...lineSizes, actualHeaderSize)

    // 88 - 2 (for global margin)
    if (maxLineSize > Body.MAX_LINE) {
      throw new Error(`get rid of ${maxLineSize - Body.MAX_LINE} characters`)
    }
  }

  private maxFieldSize(): number {
    return Math.max(...Object.keys(this.payload).map(key => key.length), this.header.length)
  }
}
