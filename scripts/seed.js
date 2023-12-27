import { events } from 'api/db/mock_data/event'
import { items } from 'api/db/mock_data/item'
import { orders } from 'api/db/mock_data/orders'
import { posts } from 'api/db/mock_data/post'
import { requirements } from 'api/db/mock_data/requirements'
import { users } from 'api/db/mock_data/user'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const generateData = async (data, table) => {
      for (let instance of data) {
        await db[table].create({
          data: instance,
        })
      }
      console.log('TABLE:\n', table)
      console.log('DATA:\n', data, '\n')
    }
    await generateData(users, 'user')
    await generateData(items, 'item')
    await generateData(events, 'event')
    await generateData(requirements, 'requirement')
    await generateData(posts, 'post')
    await generateData(orders, 'orders')
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
