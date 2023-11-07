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
    await generateData(orders, 'order')
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
