export const truncate = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + '...'
  } else {
    return text
  }
}

{
  /* <div className="flex flex-row justify-between">
        <button className="rounded-lg bg-LightBlue px-3 py-1 text-xl text-black">
          Cancel
        </button>
        <button className="rounded-lg bg-LightBlue px-3 py-1 text-xl text-black">
          Add to Cart
        </button>
      </div> */
}
