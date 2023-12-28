import './searchBar.css'

const SearchBar = ({ setSearch, search }) => {

  return (
    <div className='search'>
      <label htmlFor="search">
        Search by name:
      </label>
      <input className=" search-input"
        type="search"
        placeholder="product name"
        onChange={(e) => { setSearch(e.target.value) }}
        value={search}
        name="search"
      />

    </div>
  )
}

export default SearchBar;