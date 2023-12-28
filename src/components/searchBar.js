

const SearchBar = ({setSearch,search}) => {

    return (
        <div>
          
            <input className=" " 
            type="search" 
            placeholder="job title" 
            onChange={(e)=>{setSearch(e.target.value)}} 
            value={search}
            />
            <button >Search</button>
        </div>
    )
}

export default SearchBar;