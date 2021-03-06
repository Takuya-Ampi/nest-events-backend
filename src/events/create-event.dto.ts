import { IsDateString, IsString, Length } from 'class-validator'

export class CreateEventDto {
  @IsString()
  @Length(5, 255, { message: 'hogehoge' })
  name: string
  @IsString()
  description: string
  @IsDateString()
  when: string
  @IsString()
  @Length(5, 20)
  address: string
}