import { Result } from './unwrap_result.ts'
import { ValidRecord } from './is_valid_record.ts'

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

  display(): void {
    console.log(this.lines().join('\n'))
  }

  lines(): string[] {
    return [this.head(), ...this.body(), this.foot()]
  }

  private head(): string {
    if (this.header?.length) {
      return ('#' + `  ${this.header.toUpperCase()}  `.padStart(this.padding + 4, '=')).padEnd(
        Body.MAX_LINE,
        '='
      )
    }
    return this.foot()
  }

  private body(): string[] {
    return Object.entries(this.payload).map(
      ([key, value]) =>
        this.leftMargin +
        key.padStart(this.padding, ' ').toUpperCase() +
        this.separator +
        this.valueOrPlaceholder(value)
    )
  }

  private foot(): string {
    return '#'.padEnd(Body.MAX_LINE, '=')
  }

  private valueOrPlaceholder(value: string | null) {
    return value || this.placeholder
  }

  private validatePayload(): void {
    const lineSizes = Object.values(this.payload).map(value => {
      return (
        this.leftMargin.length +
        this.padding +
        this.separator.length +
        this.valueOrPlaceholder(value).length
      )
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
