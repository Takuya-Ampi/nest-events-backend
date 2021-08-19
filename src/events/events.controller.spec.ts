import { User } from "./../auth/user.entity"
import { Repository } from "typeorm"
import { Event } from "./event.entity"
import { EventsController } from "./events.controller"
import { EventsService } from "./events.service"
import { ListEvents } from "./input/list.events"
import { NotFoundException } from "@nestjs/common"

describe('eventsController', () => {
  let eventsService: EventsService
  let eventsController: EventsController
  let eventsRepository: Repository<Event>
  // 1回だけ実行
  beforeAll(() => console.log('test start'))

  // itの数だけ実行
  beforeEach(() => {
    console.log('aaa count')
    eventsService = new EventsService(eventsRepository)
    eventsController = new EventsController(eventsService)
  })

  it('should return events list', async () => {
    const result = {
      first: 1,
      last: 1,
      limit: 10,
      data: []
    }

    // eventServiceに直接代入してmock化する
    // eventsService.getEventsWithAttendeeCountFilteredPaginated
    //   = jest.fn().mockImplementation((): any => result)

    // spyOn使ってmocka化する

    const spy = jest
      .spyOn(eventsService, 'getEventsWithAttendeeCountFilteredPaginated')
      .mockImplementation((): any => result)


    expect(await eventsController.findAll(new ListEvents))
      .toEqual(result)

    expect(spy).toBeCalledTimes(1)
  })

  it('should not delete an event, when it\'s not found', async () => {
    const deleteSpy = jest.spyOn(eventsService, 'deleteEvent')
    const findSpy = jest.spyOn(eventsService, 'findOne')
    .mockImplementation((): any => undefined)

    try {
      await eventsController.remove(1, new User())
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }

    expect(deleteSpy).toBeCalledTimes(0)
    expect(findSpy).toBeCalledTimes(1)
  })
  // it('test1', async () => {
  //   const n = null
  //   expect(n).toBeNull()
  // })
  // it('test2', async () => {
  //   const result = 2 + 2
  //   expect(result).toBe(4)
  // })
})

