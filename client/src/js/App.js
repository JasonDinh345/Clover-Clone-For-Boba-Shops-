import { useState, useEffect, useCallback} from "react";
import axios from 'axios';
import "../css/App.css"

import DrinkContainer from './DrinkContainer';
import AdjustmentContainer from "./AdjustmentContainer";
import Orders from "./Orders";
import SearchBar from "./SearchBar";
import AddItem from "./AddItem";
import PayScreen from "./PayScreen";
function App() {
  function getRandomID(){
    return crypto.randomUUID()
  }
  const [currentSelectedDrink, setSelectedDrink] = useState({
    name: "",
    iceLevel: "100%",
    sugarLevel:"100%",
    toppings: [],
    toppingPrice:0,
    totalPrice: 0,
    drinkPrice: 0,
    drinkID: getRandomID()
  })

  

  const [selectedCategory, setSelectedCategory] = useState("")
  const [drinks, setDrinks] = useState([]);
  const [currentDrinks, setCurrentDrinks] = useState([]);
  const [orderLength, setOrderLength]= useState(0)
  const [editInfo, setEditInfo] = useState({})
  const [payScreenDisplay, setPayScreenDisplay] = useState(false)
  useEffect(() => {
    axios.get('/drinks')
    .then(res =>{
      setDrinks(res.data)
    }).catch(err =>{
      console.error(err)
    })
  }, []);
  const handleDrinkChange = (drink) => {
    setSelectedDrink(prevState => ({
      ...prevState,
      name: drink.name,
      drinkPrice: drink.price
    }));
    
  };
  
  const handleCategoryChange = (name =>{
    let typeDrinks = [];
    setSelectedCategory(name)
   let length =0;
   if(name === "All"){
    setCurrentDrinks(drinks);
    return;
   }
   //get type of drinks and send to addItem
   for(let i =0; i< drinks.length;i++){
    if(drinks[i].type === name ){
    
      typeDrinks[length]=(drinks[i])
      length++;
    }
   }
   
   setCurrentDrinks(typeDrinks)
  })
  function toHome(){
    setCurrentDrinks([])
    setSelectedDrink({
      name: "",
      iceLevel: "100%",
      sugarLevel:"100%",
      toppings: [],
      toppingPrice:0,
      totalPrice: 0,
      drinkPrice: 0,
      drinkID: crypto.randomUUID.toString()
    })
    setEditInfo({})
    setSelectedCategory("")
  }
  const handleAddDrinkToOrder = async (newDrink, quantity) => {
    
    try {
      const response = await axios.get('/order/current');
      const currentOrder = response.data;
      

      if(Object.keys(editInfo).length !== 0){
        
        currentOrder.allDrinks = currentOrder.allDrinks.filter(drink => drink.drinkID !== editInfo.drinkID)
        currentOrder.subtotalPrice = currentOrder.subtotalPrice - editInfo.totalPrice
      }
  
      for(let i = 0; i< quantity; i++){
        newDrink = {...newDrink, drinkID: getRandomID()}
        currentOrder.allDrinks.push(newDrink);
    
        currentOrder.subtotalPrice = currentOrder.subtotalPrice + newDrink.totalPrice
      }
      
        await axios.patch('/order/current', {
          allDrinks: currentOrder.allDrinks,
          subtotalPrice: currentOrder.subtotalPrice,
        });
      
      setOrderLength(orderLength + quantity)
    } catch (error) {
      console.error('There was an error!', error);
    }
    
  }
  const handleEdit = useCallback((drink) =>{
    setPayScreenDisplay(false)
    setSelectedDrink(drink)
    setEditInfo({
      name: drink.name,
      drinkPrice: drink.drinkPrice,
      toppings: drink.toppings,
      toppingPrice: drink.toppingPrice,
      totalPrice: drink.totalPrice,
      iceLevel: drink.iceLevel,
      sugarLevel:drink.sugarLevel,
      drinkID: drink.drinkID
    })
    
    
  },[])
  const handleDelete =  useCallback(async(deleteDrink)=>{
    setPayScreenDisplay(false)
    try {
      const response = await axios.get('/order/current');
      const currentOrder = response.data;
      currentOrder.allDrinks = currentOrder.allDrinks.filter(drink => drink.drinkID !== deleteDrink.drinkID)
      currentOrder.subtotalPrice = currentOrder.subtotalPrice - deleteDrink.totalPrice
    
        await axios.patch('/order/current', {
          allDrinks: currentOrder.allDrinks,
          subtotalPrice: currentOrder.subtotalPrice,
        });
      
      setOrderLength(orderLength - 1)
    } catch (error) {
      console.error('There was an error!', error);
    }
  },[orderLength])
  const handleAdjustemnts = (adjustments) =>{
    console.log(currentSelectedDrink)
    const updatedData = currentSelectedDrink;
    updatedData.iceLevel = adjustments.ice
    updatedData.sugarLevel = adjustments.sugar
    updatedData.toppings = adjustments.toppings
    updatedData.toppingPrice = adjustments.price 
    
    updatedData.totalPrice = currentSelectedDrink.drinkPrice + adjustments.price;
   
    
    setSelectedDrink(updatedData)
    
    handleAddDrinkToOrder(currentSelectedDrink, adjustments.quantity)
    
    toHome()
  }

  
  return (
    <>
    <div id="wholePage">
       {!payScreenDisplay ? (
        <>
         <div className='nav'>
              <div className="rightNav">
              <img alt="home icon" src="src/img/home.png" className="homeButton"onClick={toHome} disabled={selectedCategory === "" ? (true):(false)} style={{ opacity: selectedCategory === "" ? "50%" : "100%" }}></img>
              {selectedCategory === "" ? (
                <></>
              ) : currentSelectedDrink.name === "" ?(
                <p>{selectedCategory}</p>
              ):(
                <p>{currentSelectedDrink.name}</p>
              )}
              </div>
              <div className="leftNav">
              <SearchBar drinks={drinks} selectedDrink={handleDrinkChange}/>
              <AddItem selectedCategory={selectedCategory}  drinksLength={drinks.length}/>
              </div>
              
        </div>
        <div id="main">
          <Orders orderLength={orderLength} handleEdit={handleEdit} handleDelete={handleDelete} setPayScreenDisplay={setPayScreenDisplay}/>
          {currentSelectedDrink.name === ""? (
            <DrinkContainer selectedDrink={handleDrinkChange} data={currentDrinks} handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
          ):(
            <AdjustmentContainer selectedAdjustments={handleAdjustemnts} handleCancel={toHome} editInfo={editInfo}/>
          )}
          
          
        </div>
        </>
       ):(
        <>
        <div className="nav">

        </div>
        <div id="main">
         <Orders orderLength={orderLength} handleEdit={handleEdit} handleDelete={handleDelete} setPayScreenDisplay={setPayScreenDisplay}/>
        <PayScreen orderLength={orderLength}/>
        </div>
        </>
       )}
      </div>
    </>
  );
}

export default App;
