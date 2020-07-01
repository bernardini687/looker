import { ValidRecord } from './is_valid_record.ts'

export class Body {
  readonly header: string
  readonly leftMargin = '# '
  readonly padding: number
  readonly payload: ValidRecord
  readonly separator = ':  '

  constructor(validRecord: ValidRecord) {
    const { header, ...payload } = validRecord

    this.header = header
    this.payload = payload

    this.validatePayload()

    this.padding = this.maxLabelSize()

    // validateHeader() this.leftMargin.length + this.header.padStart(this.padding).length
  }

  maxLabelSize(): number {
    // take into account the lenght of the header!
    return Math.max(...Object.keys(this.payload).map(x => x.length))
  }

  validatePayload(): void {
    const sizes = Object.entries(this.payload).map(
      x => this.leftMargin.length + x[0].length + this.separator.length + x[1].length
    )

    console.log(sizes)
    const maxSize = Math.max(...sizes)
    // 88 should be a class constant
    if (maxSize > 88) {
      throw new Error(`get rid of ${maxSize - 88} characters`)
    }
  }
}
