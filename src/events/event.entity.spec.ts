import { Event } from "./event.entity"

test('event entity', ()=> {
  const event = new Event({
    name: 'testmaan',
    description: 'testttestttest'
  })

  expect(event).toEqual({
    name: 'testmaan',
    description: 'testttestttest'
  })
})