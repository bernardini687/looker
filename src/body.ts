import { ValidRecord } from './is_valid_record.ts'

export class Body {
  payload: ValidRecord
  header: string
  padding: number
  leftMargin = '# '
  separator = ':  '

  constructor(validRecord: ValidRecord) {
    const { header, ...payload } = validRecord

    this.payload = payload
    this.header = header
    this.padding = this.maxLabelSize()
  }

  maxLabelSize(): number {
    return Math.max(...Object.keys(this.payload).map(x => x.length))
  }

  // validPayload() {
  //   this.payload
  // }
}
