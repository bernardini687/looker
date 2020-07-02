import { ValidRecord } from './is_valid_record.ts'

export class Body {
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

  private validatePayload(): void {
    const lineSizes = Object.values(this.payload).map(value => {
      const valueSize = value?.length || this.placeholder.length

      return this.leftMargin.length + this.padding + this.separator.length + valueSize
    })

    const actualHeaderSize = this.leftMargin.length + this.header.length

    const maxLineSize = Math.max(...lineSizes, actualHeaderSize)

    // 88 should be a class constant
    // 88 - 2 (for global margin)
    if (maxLineSize > 88) {
      throw new Error(`get rid of ${maxLineSize - 88} characters`)
    }
  }

  private maxFieldSize(): number {
    return Math.max(...Object.keys(this.payload).map(key => key.length), this.header.length)
  }
}
