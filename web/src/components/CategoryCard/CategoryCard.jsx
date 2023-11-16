const CategoryCard = () => {
  return (
    <div className="flex items-center justify-between self-stretch rounded-r-lg border-l-[5px] border-white border-l-[#B9322F] bg-[#001489] p-4 text-white">
      <div className="flex flex-col gap-2 self-stretch p-2">
        <h1 className="text-2xl font-semibold">Category</h1>
        <p>
          Long or short category description that shouldn't warp the card at
          all...
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 self-stretch p-2">
        <p>Number of posts in category</p>
      </div>
    </div>
  )
}

export default CategoryCard
