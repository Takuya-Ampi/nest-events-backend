import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number
  @Column({
    type: "varchar",
    unique: true,
    nullable: false
  })
  @Column({length: 100})
  name: string
  @Column()
  description: string
  @Column()
  when: Date
  @Column()
  address: string
}