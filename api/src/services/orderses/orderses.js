import { db } from 'src/lib/db'

export const orderses = () => {
  return db.orders.findMany()
}

export const orders = ({ id }) => {
  return db.orders.findUnique({
    where: { id },
  })
}

export const createOrders = ({ input }) => {
  return db.orders.create({
    data: input,
  })
}

export const updateOrders = ({ id, input }) => {
  return db.orders.update({
    data: input,
    where: { id },
  })
}

export const deleteOrders = ({ id }) => {
  return db.orders.delete({
    where: { id },
  })
}
