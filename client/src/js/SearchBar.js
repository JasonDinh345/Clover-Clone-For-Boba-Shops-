import "../css/SearchBar.css"
import {useState, useEffect, useRef} from 'react'
function  SearchBar({drinks, selectedDrink}){
    const [searchDrink, setSearchDrinks] = useState([])
    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setSearchDrinks([]);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
    const handleSearch = (event) =>{
       let drinkList =[]
       if(event.target.value === ""){
        return setSearchDrinks([])
       }
       for(let i = 0; i< drinks.length; i++){
        if(drinks[i].name.toLowerCase().includes(event.target.value.toLowerCase())){
            drinkList.push(drinks[i])
        }
        setSearchDrinks(drinkList)
       }
    }
    const handleOnClick = (event) =>{
        handleSearch(event)
    }
    const handleDrinkSelection = (drink) =>{
        setSearchDrinks([])
        selectedDrink(drink)
    }
    return (
        <>
        <img className="searchIcon"alt="search icon"src="src/img/search.png"></img>
        <div className="searchBarContainer" ref={ref}>
            <input type="text" placeholder="Search" onChange={handleSearch} onClick={handleOnClick}></input>
            <div className="searchDrinkContainer">
            {searchDrink.map((drink) =>(
                <div key={drink._id} className="searchDrink" onClick={()=>handleDrinkSelection(drink)}>
                    <p>{drink.name}</p>
                    <p>${drink.price.toFixed(2)}</p>
                    
                </div>
            ))}
            </div>
        </div>
        
        </>
    )
}
export default SearchBar