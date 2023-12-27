export const truncate = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + '...'
  } else {
    return text
  }
}

export const types = ['Clothing', 'Drinkware', 'Coin', 'Swag', 'Sticker']

export const categories = [
  'Job',
  'Training',
  'General',
  'Question',
  'Missiles',
  'Leadership',
  'Air Force',
  'TDY',
  'Event',
  'Key Spouse',
]
