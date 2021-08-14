import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, MoreThan, Repository } from "typeorm";
import { Attendee } from "./attendee.entity";
import { CreateEventDto } from "./create-event.dto";
import { Event } from "./event.entity";
import { UpdateEventDto } from "./update-event.dto";

@Controller('events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>
  ) {}

  @Get('practice')
  async practice() {
    return await this.repository.find({
        select: ['id', 'when'],
        where: [
            { 
              id: MoreThan(3),
              when: MoreThan(new Date("2021-02-12T13:00:00"))
            }, 
            { description: Like('%meet%')}
          ],
        take: 2, 
        order: {
          id: 'DESC'
        }
      }
    )
  }
  @Get('practice2')
  async practice2() {
    // return await this.repository.findOne(1, { relations: ['attendees'] })
    // const event = await this.repository.findOne(1, { relations: ['attendees'] })

    const event = new Event()
    event.id = 2

    const attendee = new Attendee()
    attendee.name = 'fefeSecond'
    attendee.event = event

    await this.attendeeRepository.save(attendee)

    return event
    
  }
  @Get()
  async findAll() {
    return await this.repository.find()
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    console.log(typeof id)
    return await this.repository.findOne(id)
  }
  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    })
  }
  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOne(id)

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when
    })
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne(id)
    await this.repository.remove(event)
  }
}