import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from './teacher.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => Teacher, (teacher) => teacher.subjects
  )
  // @JoinTable({ name: some_other_name })
  @JoinTable()
  teachers: Teacher[];
}