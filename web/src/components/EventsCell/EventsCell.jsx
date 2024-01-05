import { useState } from 'react'

import { Tab, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import moment from 'moment'
import { BiSolidCopy } from 'react-icons/bi'
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { MdEdit, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query EventsQuery {
    events {
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

const DELETE_EVENT = gql`
  mutation DeleteEventMutation($id: Int!) {
    deleteEvent(id: $id) {
      id
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  events,
  open,
  setOpen,
  openEdit,
  setOpenEdit,
  setEvent,
  openCopy,
  setOpenCopy,
}) => {
  const [activeTab, setActiveTab] = useState('currentEvents')
  // const [search, setSearch] = useState('')
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: QUERY }],
  })

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        value={activeTab}
        className="min-w-screen mx-1 mt-4 flex w-full flex-grow flex-col self-stretch"
      >
        <TabsHeader
          className={`flex w-full gap-2 self-stretch rounded-none border-b border-LightBlue bg-transparent p-0`}
          indicatorProps={{
            className: 'bg-transparent shadow-none rounded-lg rounded-b-none',
          }}
        >
          <Tab
            value="currentEvents"
            onClick={() => setActiveTab('currentEvents')}
            className={`h-1/8 w-fit rounded-lg rounded-b-none border border-b-0 border-LightBlue transition hover:text-Green hover:underline ${
              activeTab === 'currentEvents'
                ? 'bg-LightBlue text-black transition'
                : 'bg-transparent text-LightBlue hover:text-Green'
            }`}
          >
            <div className="flex flex-row items-center gap-2 p-1">
              <span className="inline-block">Current Events</span>
            </div>
          </Tab>
          <Tab
            value="pastEvents"
            onClick={() => setActiveTab('pastEvents')}
            className={`h-1/8 w-fit rounded-lg rounded-b-none border border-b-0 border-LightBlue transition hover:text-Green hover:underline ${
              activeTab === 'pastEvents'
                ? 'bg-LightBlue text-black transition'
                : 'bg-transparent text-LightBlue hover:text-Green'
            }`}
          >
            <div className="flex flex-row items-center gap-2 p-1">
              <span className="inline-block">Past Events</span>
            </div>
          </Tab>
          <Tab
            value="approvalEvents"
            onClick={() => setActiveTab('approvalEvents')}
            className={`h-1/8 w-fit rounded-lg rounded-b-none border border-b-0 border-LightBlue transition hover:text-Green hover:underline ${
              activeTab === 'approvalEvents'
                ? 'bg-LightBlue text-black transition'
                : 'bg-transparent text-LightBlue hover:text-Green'
            }`}
          >
            <div className="flex flex-row items-center gap-2 p-1">
              <span className="inline-block">Approve Events</span>
            </div>
          </Tab>
        </TabsHeader>
        <div className="mt-4 flex flex-row items-center justify-between rounded-lg bg-LightBlue p-2">
          <div className="flex flex-row items-center gap-4">
            <button
              className="rounded-lg border-2 border-Blue p-2"
              onClick={() => setOpen(!open)}
            >
              <FaPlus size={26} color="#001489" />
            </button>
            <div className="flex flex-row items-center rounded-lg border-2 border-Green px-3">
              <div className="flex flex-col">
                <button className="m-0 p-0">
                  <MdKeyboardArrowUp size={20} color="#00843D" />
                </button>
                <button className="m-0 p-0">
                  <MdKeyboardArrowDown size={20} color="#00843D" />
                </button>
              </div>
              <p className="text-xl font-medium text-Green">Date</p>
            </div>
          </div>
        </div>
        <TabsBody className="mt-4 flex flex-col gap-4">
          {activeTab === 'currentEvents' ? (
            events.filter((event) => event.date > moment(Date.now()).format())
              .length ? (
              events
                .filter((event) => event.date > moment(Date.now()).format())
                .map((event, index) => {
                  return (
                    <div
                      className="flex flex-col gap-2 rounded-lg bg-LightBlue p-4"
                      key={index}
                    >
                      <div className="flex flex-row justify-between">
                        <p className="text-3xl font-semibold text-black">
                          {event.title}
                        </p>
                        <div className="flex flex-row gap-2">
                          <button
                            onClick={() => {
                              setEvent(event)
                              setOpenCopy(!openCopy)
                            }}
                          >
                            <BiSolidCopy size={24} color="#00843D" />
                          </button>
                          <button
                            onClick={() => {
                              setEvent(event)
                              setOpenEdit(!openEdit)
                            }}
                          >
                            <MdEdit size={24} color="#FFCD00" />
                          </button>
                          <button
                            onClick={() =>
                              deleteEvent({ variables: { id: event.id } })
                            }
                          >
                            <FaRegTrashAlt size={24} color="#B9322F" />
                          </button>
                        </div>
                      </div>
                      <p className="text-2xl font-medium text-black">
                        {moment(event.date).format('DD MMM YY hh:mm')}
                      </p>
                      <div className="flex flex-row items-center gap-2">
                        {event.flier ? (
                          <div className="flex h-[25px] w-[25px] items-center justify-center rounded-lg bg-Green">
                            <FaCheck color="black" size={20} />
                          </div>
                        ) : (
                          <div className="h-[25px] w-[25px] rounded-lg border-2 border-Green"></div>
                        )}

                        <p className="text-2xl font-medium text-black">
                          Flier?
                        </p>
                      </div>
                      <p className="text-2xl font-medium text-black">
                        {event.description}
                      </p>
                    </div>
                  )
                })
            ) : (
              <p className="text-3xl font-semibold text-white">
                There are no future events planned!
              </p>
            )
          ) : events.filter((event) => event.date < moment(Date.now()).format())
              .length ? (
            events
              .filter((event) => event.date < moment(Date.now()).format())
              .map((event, index) => {
                return (
                  <div
                    className="flex flex-col gap-2 rounded-lg bg-LightBlue p-4"
                    key={index}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-3xl font-semibold text-black">
                        {event.title}
                      </p>
                      <div className="flex flex-row gap-2">
                        <button
                          onClick={() => {
                            setEvent(event)
                            setOpenCopy(!openCopy)
                          }}
                        >
                          <BiSolidCopy size={24} color="#00843D" />
                        </button>
                        <button
                          onClick={() => {
                            setEvent(event)
                            setOpenEdit(!openEdit)
                          }}
                        >
                          <MdEdit size={24} color="#FFCD00" />
                        </button>
                        <button
                          onClick={() =>
                            deleteEvent({ variables: { id: event.id } })
                          }
                        >
                          <FaRegTrashAlt size={24} color="#B9322F" />
                        </button>
                      </div>
                    </div>
                    <p className="text-2xl font-medium text-black">
                      {moment(event.date).format('DD MMM YY hh:mm')}
                    </p>
                    <div className="flex flex-row items-center gap-2">
                      {event.flier ? (
                        <div className="flex h-[25px] w-[25px] items-center justify-center rounded-lg bg-Green">
                          <FaCheck color="black" size={20} />
                        </div>
                      ) : (
                        <div className="h-[25px] w-[25px] rounded-lg border-2 border-Green"></div>
                      )}

                      <p className="text-2xl font-medium text-black">Flier?</p>
                    </div>
                    <p className="text-2xl font-medium text-black">
                      {event.description}
                    </p>
                  </div>
                )
              })
          ) : (
            <p className="text-3xl font-semibold text-white">
              There are no past events!
            </p>
          )}
        </TabsBody>
      </Tabs>
    </div>
  )
}
