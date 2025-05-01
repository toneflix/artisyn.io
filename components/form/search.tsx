import { SearchIcon } from "lucide-react"

type Props = {
  placeholder?: string
  button?: string
  value?: string
  onChange: (value: string) => void
}
function Search({
  placeholder='Search',
  button='Search',
  value,
  onChange
}: Props) {

  return (
    <form className="flex max-md:flex-col md:items-center md:min-w-md gap-2">
      <label className="flex-1 flex items-center rounded-[6px] bg-white">
        <SearchIcon className='w-10 text-[#262626] ml-3' />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='w-full text-black p-3 outline-none'
          required
        />
      </label>

      <button
        className="bg-[#0F243D] p-3 md:min-w-[174px] rounded-[6px] cursor-pointer
        hover:bg-[#0F243D]/90">
        {button}
      </button>
    </form>
  )
}

export default Search