import { useEffect, useRef, useState } from 'react'

import ReactDatePicker from 'react-datepicker'
import { IoCalendar } from 'react-icons/io5'

import {
  FieldError,
  FileField,
  Form,
  Label,
  RadioField,
  Submit,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { QUERY } from '../EventsCell/EventsCell'

const CREATE_EVENT = gql`
  mutation CreateEventMutation($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      description
      date
      flier
      image
      address
      type
    }
  }
`

const AdminCopyEvent = ({ open, setOpen, event }) => {
  const [showUpload, setShowUpload] = useState('hidden')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [updateEvent] = useMutation(CREATE_EVENT, {
    refetchQueries: [{ query: QUERY }],
  })

  const titleRef = useRef(null)
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const { title, description, flier, address } = data
    await updateEvent({
      variables: {
        id: event.id,
        input: {
          title: title,
          description: description,
          flier: flier === 'true' ? true : false,
          address: address,
          image: 'not implemented yet',
          type: 'Needs approved',
          date: selectedDate,
        },
      },
    })
    setOpen(!open)
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-3xl font-semibold text-white">
        Add an Event
      </p>
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
        id="editEventForm"
      >
        <TextField
          name="title"
          ref={titleRef}
          className="w-1/4 rounded-lg bg-LightBlue p-2 text-xl text-Green underline outline-none placeholder:text-Green focus:outline-none"
          errorClassName="w-1/4 rounded-lg border-2 border-Red text-xl underline bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
          placeholder="Event title . . ."
          defaultValue={event.title}
          validation={{
            required: {
              value: true,
              message: 'A title for this event is required',
            },
          }}
        />
        <FieldError name="title" className="rw-field-error" />

        <ReactDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showIcon
          icon={<IoCalendar size={30} color="#00843D" />}
          className="w-1/4 items-center rounded-lg bg-LightBlue text-xl text-Green underline focus:outline-none"
          closeOnScroll
          minDate={new Date()}
          showPopperArrow={false}
          form="editEventForm"
          toggleCalendarOnIconClick
          showTimeInput
          dateFormat="dd MMM hh:mm aa"
          required
        />

        <TextAreaField
          name="description"
          className="w-full rounded-lg bg-LightBlue p-2 text-xl text-Green outline-none placeholder:text-Green focus:outline-none"
          errorClassName="w-full rounded-lg border-2 border-Red text-xl bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
          placeholder="Event description . . ."
          defaultValue={event.description}
          validation={{
            required: {
              value: true,
              message: 'A description for the event is required',
            },
          }}
        />
        <FieldError name="description" className="rw-field-error" />

        <TextField
          name="address"
          className="w-1/4 rounded-lg bg-LightBlue p-2 text-xl text-Green underline outline-none placeholder:text-Green focus:outline-none"
          errorClassName="w-1/4 rounded-lg border-2 border-Red text-xl bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
          placeholder="Event address . . ."
          defaultValue={event.address}
          validation={{
            required: {
              value: true,
              message: 'The address for this event is required',
            },
          }}
        />
        <FieldError name="address" className="rw-field-error" />

        <p className="text-2xl font-medium text-white">
          Is there a flier for this event?
        </p>
        <div className="flex flex-row gap-6">
          <div className="flex flex-row gap-2">
            <RadioField
              name="flier"
              value={true}
              id="flier"
              onChange={() => setShowUpload('')}
            />
            <Label name="flier" className="text-xl font-medium text-white">
              Yes
            </Label>
          </div>
          <div className="flex flex-row gap-2">
            <RadioField
              name="flier"
              defaultChecked
              value={false}
              id="noFlier"
              onChange={() => setShowUpload('hidden')}
            />
            <Label name="noFlier" className="text-xl font-medium text-white">
              No
            </Label>
          </div>
        </div>
        <FileField
          name="image"
          className={`w-1/4 rounded-lg border-2 border-LightBlue bg-Blue p-2 text-xl text-LightBlue ease-in-out file:rounded-lg file:border-2 file:border-LightBlue file:bg-Blue file:text-xl file:font-medium file:text-LightBlue focus:outline-none ${showUpload}`}
          errorClassName={`w-1/4 rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none file:rounded-lg file:border-Red file:bg-Blue file:text-xl file:font-medium file:text-Red placeholder:text-Red focus:outline-none ease-in-out ${showUpload}`}
        />

        <div className="flex flex-row justify-between">
          <button
            className="rounded-lg border border-LightBlue px-3 py-1 text-2xl font-medium text-LightBlue"
            onClick={() => setOpen(!open)}
          >
            Cancel
          </button>
          <Submit className="rounded-lg border border-LightBlue px-3 py-1 text-2xl font-medium text-LightBlue focus:outline-LightBlue">
            Create Event
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AdminCopyEvent
