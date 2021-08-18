import { Repository } from "typeorm"
import { Event } from "./event.entity"
import { EventsController } from "./events.controller"
import { EventsService } from "./events.service"

describe('eventsController', () => {
  let eventsService: EventsService
  let eventsController: EventsController
  let eventsRepository: Repository<Event>
  // 1回だけ実行
  beforeAll(() => console.log('test start'))
  beforeEach(() => {
    eventsService = new EventsService(eventsRepository)
    eventsController = new EventsController(eventsService)
  })

  // it('should return events list', async () => {
  //   const n = null
  //   expect(n).toBeNull()
  // })
  // it('test1', async () => {
  //   const n = null
  //   expect(n).toBeNull()
  // })
  // it('test2', async () => {
  //   const result = 2 + 2
  //   expect(result).toBe(4)
  // })
})

