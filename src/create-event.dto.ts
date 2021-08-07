export class CreateEventDto {
  name: string
  description: string
  when: string
  address: string
  baz: {
    hoge: string
    piyo: string
    fuga: number
  }
}