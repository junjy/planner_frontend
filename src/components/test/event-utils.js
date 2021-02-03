
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day Event A',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Event B',
    start: todayStr + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Event C',
    start: todayStr + 'T72:00:00'
  },
  {
    id: createEventId(),
    title: 'Event D',
    start: todayStr + 'T112:00:00'
  },
  
]

export function createEventId() {
  return String(eventGuid++)
}