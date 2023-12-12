import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import moment from 'moment'

const EventModal = ({ open, setOpen, event }) => {
  const handleOpen = () => setOpen(!open)

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="lg"
      className="rounded-xl bg-Blue p-6"
    >
      {event?.flier ? (
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full rounded-xl border-2 border-LightBlue"
        />
      ) : (
        <>
          <DialogHeader className="flex items-center justify-center rounded-xl bg-LightBlue">
            <p className="text-center text-4xl font-semibold text-black">
              {event?.title}
            </p>
          </DialogHeader>
          <DialogBody className="mt-4 flex max-h-[600px] flex-col gap-2 p-0">
            <div className="flex w-full flex-row justify-between rounded-xl bg-LightBlue p-4">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold text-black">Address:</p>
                <p className="text-xl font-medium text-black">
                  {event?.address}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold text-black">Date & Time:</p>
                <p className="text-xl font-medium text-black">
                  {moment(event?.date).format('DD MMM YY hh:mm')}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col rounded-xl bg-LightBlue p-4">
              <p className="text-xl font-semibold text-black">Details:</p>
              <p className="text-xl font-medium text-black">
                {event?.description}
              </p>
            </div>
          </DialogBody>
          <DialogFooter className="mt-4 flex justify-start rounded-xl p-0">
            <button
              className="rounded-lg bg-LightBlue px-3 py-1 text-2xl font-medium text-black"
              onClick={() => handleOpen()}
            >
              Back
            </button>
          </DialogFooter>
        </>
      )}
    </Dialog>
  )
}

export default EventModal
