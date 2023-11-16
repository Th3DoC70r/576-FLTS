import CategorySquare from '../CategorySquare'

const PostCard = ({ title, description, category, created, userImage }) => {
  return (
    <div className="flex items-center justify-between gap-2 self-stretch rounded-lg bg-[#001489] p-4 text-white">
      <div className="flex items-center gap-2 self-stretch p-2">
        <div className="flex items-center gap-2">
          <img className="w-24 rounded-full" src={userImage} />
        </div>
        <div className="flex flex-col gap-2 p-2">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex flex-row gap-2">
            {category.map((square) => (
              <CategorySquare color="red" title={square} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p># Comments</p>
        <p className="text-xs">{created}</p>
      </div>
    </div>
  )
}

export default PostCard
