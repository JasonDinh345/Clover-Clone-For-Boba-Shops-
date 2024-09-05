import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../css/DrinkContainer.css'
import SingleDrink from './SingleDrink';
function DrinkContainer({selectedDrink, data, handleCategoryChange, selectedCategory}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/category')
    .then(res =>{
      setCategories(res.data)
    }).catch(err =>{
      console.error(err)
    })
  }, []);

  const drinks = data;

  const changeSelectedDrink = ((drink)=>{
    selectedDrink(drink);
  })
  function changeToDrinks(name){
    handleCategoryChange(name);
  }

  return (
    <>
      <div id='itemContainer'>
     
        {selectedCategory === "" ? (
        categories.map((category, index) => (
         category.name === "All" ? (
          <div  className="category" key={index} style={{order: categories.length}}onClick={() => changeToDrinks(category.name)}>
          <div className='categoryColor' style={{backgroundColor: category.color}}></div>
             <h2> {category.name}</h2>
        </div>
         ) : category.name === "Seasonal" ?(
          <div  className="category" key={index}  style={{order: categories.length-1}}onClick={() => changeToDrinks(category.name)}>
          <div className='categoryColor' style={{backgroundColor: category.color}}></div>
           <h2> {category.name}</h2>
        </div>
         ) :(
          <div  className="category" key={index} onClick={() => changeToDrinks(category.name)}>
            <div className='categoryColor' style={{backgroundColor: category.color}}></div>
          <h2> {category.name}</h2>
        </div>
         )
        ))
      ) : drinks.length === 0 ? (
        <div className='noDrinksContainer'>
          <h3 className='noDrinks'>No Drinks Found</h3>
          <h4 className='noDrinks'>Add A drink to Continue</h4>
        </div>
      ):(
        drinks.map((drink, index) => (
         <SingleDrink key={index} drink={drink} style={{order: drink.order}}selected={changeSelectedDrink}/>
        ))
      )}
      
     </div>

    </>

  );
}

export default DrinkContainer;
