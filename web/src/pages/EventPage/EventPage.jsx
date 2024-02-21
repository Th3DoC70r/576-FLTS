import { useEffect, useState } from 'react'

import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import 'react-big-calendar/lib/sass/styles.scss'

import { useQuery } from '@redwoodjs/web'

import EventModal from 'src/components/EventModal/EventModal'

const EVENT_QUERY = gql`
  query EventsQuery {
    events {
      address
      date
      description
      flier
      id
      image
      title
      type
    }
  }
`

const EventPage = () => {
  const eventInfo = useQuery(EVENT_QUERY)
  const [events, setEvents] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({})

  useEffect(() => {}, [selectedEvent])

  const customToolbar = ({ label, onNavigate }) => {
    return (
      <div className="flex w-full flex-row items-center p-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-2">
            <div className="min-h-[25px] min-w-[25px] rounded-lg bg-Green"></div>
            <p className="text-xl font-semibold text-black">
              Official Function
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <div className="min-h-[25px] min-w-[25px] rounded-lg bg-LightBlue"></div>
            <p className="text-xl font-semibold text-black">Special Event</p>
          </div>
        </div>
        <div className="absolute left-[41.5%] top-[5.25%] flex flex-row gap-4">
          <button onClick={() => onNavigate('PREV')}>
            <FaAngleLeft />
          </button>
          <p className="text-2xl font-semibold text-black">{label}</p>
          <button onClick={() => onNavigate('NEXT')}>
            <FaAngleRight />
          </button>
        </div>
      </div>
    )
  }

  const customEvents = (event) => {
    let backgroundColor

    if (event.type === 'morale') {
      backgroundColor = '#A3C7D2'
    } else {
      backgroundColor = '#00843D'
    }
    return {
      style: {
        backgroundColor,
      },
    }
  }

  useEffect(() => {
    let eventArr = []
    eventInfo?.data?.events.map((event) => {
      eventArr.push({
        id: event.id,
        title: event.title,
        start: moment(event.date),
        end: moment(event.date).add(2, 'hours'),
        type: event.type,
        address: event.address,
        date: event.date,
        image: event.image,
        description: event.description,
        flier: event.flier,
      })
    })
    setEvents(eventArr)
  }, [eventInfo])

  const localizer = momentLocalizer(moment)

  return (
    <div className="rounded-lg border border-LightBlue p-2">
      <EventModal open={open} setOpen={setOpen} event={selectedEvent} />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 750 }}
        views={{ month: true }}
        onSelectEvent={async (event) => {
          await setSelectedEvent(event)
          setOpen(!open)
        }}
        eventPropGetter={customEvents}
        components={{
          toolbar: customToolbar,
        }}
      />
    </div>
  )
}

export default EventPage
