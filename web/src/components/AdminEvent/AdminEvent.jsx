import { useState } from 'react'

import AdminAddEvent from '../AdminAddEvent/AdminAddEvent'
import AdminCopyEvent from '../AdminCopyEvent/AdminCopyEvent'
import AdminEditEvent from '../AdminEditEvent/AdminEditEvent'
import EventsCell from '../EventsCell/EventsCell'

const AdminEvent = () => {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCopy, setOpenCopy] = useState(false)
  const [event, setEvent] = useState({})

  return (
    <div className="rounded-xl bg-Blue p-4">
      {open ? (
        <AdminAddEvent open={open} setOpen={setOpen} />
      ) : openEdit ? (
        <AdminEditEvent open={openEdit} setOpen={setOpenEdit} event={event} />
      ) : openCopy ? (
        <AdminCopyEvent open={openCopy} setOpen={setOpenCopy} event={event} />
      ) : (
        <EventsCell
          open={open}
          setOpen={setOpen}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          openCopy={openCopy}
          setOpenCopy={setOpenCopy}
          setEvent={setEvent}
        />
      )}
    </div>
  )
}

export default AdminEvent
