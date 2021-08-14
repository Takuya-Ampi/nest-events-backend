import { Controller, Get, Post } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Controller('school')
export class TrainingController {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  @Get('/practice')
  public async getOne() {
    return this.subjectRepository.findOne(1, { relations: ['teachers'] })
  }

  @Post('/create')
  public async savingRelation() {
    

    // const subject = await this.subjectRepository.findOne(3);

    const teacher1 = new Teacher()
    teacher1.name = 'GEN'
    await this.teacherRepository.save(teacher1)

    const teacher2 = new Teacher()
    teacher2.name = 'Jon'
    await this.teacherRepository.save(teacher2)

    const subject = new Subject()
    subject.name = 'Math'
    subject.teachers = [teacher1, teacher2]
    await this.subjectRepository.save(subject)
  

    // const teacher2 = new Teacher();
    // teacher2.name = 'Harry Doe';

    // subject.teachers = [teacher1, teacher2];
    // await this.teacherRepository.save([teacher1, teacher2]);

    // How to use One to One
    // const user = new User();
    // const profile = new Profile();

    // user.profile = profile;
    // user.profile = null;
    // Save the user here


    // const teacher1 = await this.teacherRepository.findOne(5);
    // const teacher2 = await this.teacherRepository.findOne(6);

    // return await this.subjectRepository
    //   .createQueryBuilder()
    //   .relation(Subject, 'teachers')
    //   .of(subject)
    //   .add([teacher1, teacher2]);
  }

  @Post('/remove')
  public async removingRelation() {
    const subject = await this.subjectRepository.findOne(
      4,
      { relations: ['teachers'] }
    )

    subject.teachers = subject.teachers.filter(
      teacher => teacher.id !== 6
    )

    await this.subjectRepository.save(subject)
    
    // await this.subjectRepository.createQueryBuilder('s')
    //   .update()
    //   .set({ name: "Confidential" })
    //   .execute();
  }
}