const CategorySquare = ({ color, title }) => {
  return (
    <div
      className={`h-6 w-6 bg-${color}-500 transition duration-300 ease-in-out hover:scale-125`}
      title={title}
    ></div>
  )
}

export default CategorySquare
