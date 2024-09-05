import {useState, useEffect, useMemo, useCallback} from 'react'
import axios from 'axios'
import "../css/AdjustmentContainer.css"
import Toppings from "./Toppings"
function AdjustmentContainer({selectedAdjustments, handleCancel, editInfo}){
    
    const iceLevels = useMemo(()=>{
        return ["No Ice", "Less Ice", "Regular Ice", "Extra Ice"]
    },[])
    const sugarLevels =useMemo(()=>{
        return [ "0%", "25%", "50%", "75%", "100%","125%"]
    },[]) 
    const [toppings, setToppings] = useState(()=> {
        return []
    })
    
    const [selectedIceLevel, setSelectedIceLevel] = useState(()=>{
        if(Object.keys(editInfo).length !== 0){
            
            return editInfo.iceLevel
        }
        return "Regular Ice"
    })
    const [selectedSugarLevel, setSelectedSugarLevel] = useState(()=>{
        if(Object.keys(editInfo).length !== 0){
            
            return editInfo.sugarLevel
        }
        return "100%"
    })
    const [selectedToppings, setSelectedToppings] = useState(()=>{
        if(Object.keys(editInfo).length !== 0){
            
            return {allToppings: editInfo.toppings, totalPrice: editInfo.toppingPrice}
        }
        return {allToppings: [],
            totalPrice: 0}
        
    });
    console.log(selectedToppings)
    const [quantity, setQuantity] = useState(1);
    const [tabCSS, setTabCSS] = useState(["white", "#bebebe","#bebebe"])
    
    const [containerDisplaySettings, setContainerDisplaySettings] = useState(["visible", "none","none"])
    useEffect(() => {
        axios.get('/toppings')
        .then(res =>{
            let updatedData = res.data.map(toppings =>{
                if(selectedToppings.allToppings.length === 0){
                    toppings.amount = 0;
                }else{
                    let index = selectedToppings.allToppings.findIndex(topping => topping.name === toppings.name)
                    if(index >= 0){
                        
                        toppings.amount = selectedToppings.allToppings[index].amount
                    }else{
                        toppings.amount = 0
                    }
                }
                return toppings;
            })
            setToppings(updatedData);
        }).catch(err =>{
          console.error(err)
        })
      }, [selectedToppings.allToppings]);
      
    const handleAmountChange = useCallback((typeOfChange,  id, amountOf)=>{ 
        const index = toppings.findIndex(topping => topping._id === id)
        if(typeOfChange === "increase"){
            const updatedData = toppings;
            updatedData[index] = {
                ...updatedData[index],
                amount: updatedData[index].amount + amountOf
            };
            
            const toppingName = updatedData[index].name;
            const toppingPrice = updatedData[index].price;
    
            // Check if the topping is already selected
            const toppingIndex = selectedToppings.allToppings.findIndex(topping => topping.name === toppingName);
            let updatedToppingData;
            let updatedPrice = selectedToppings.totalPrice + toppingPrice;
    
            if (toppingIndex === -1) {
                updatedToppingData = [...selectedToppings.allToppings, { name: toppingName, amount: amountOf }];
            } else {
                updatedToppingData = [...selectedToppings.allToppings];
                updatedToppingData[toppingIndex] = {
                    name: toppingName,
                    amount: updatedToppingData[toppingIndex].amount + amountOf // Corrected this line
                };
            }
            setSelectedToppings({
                allToppings: updatedToppingData,
                totalPrice: updatedPrice 
            });
            
            setToppings(updatedData);
        }else{
            //decrease
            const updatedData = [...toppings];
            updatedData[index] = {
                ...updatedData[index],
                 amount: updatedData[index].amount - amountOf
            };
            const toppingName = updatedData[index].name;
            const toppingPrice = updatedData[index].price;

            const toppingIndex = selectedToppings.allToppings.findIndex(topping => topping.name === toppingName);
            let updatedToppingData;
            let updatedPrice = selectedToppings.totalPrice - ((amountOf) * toppingPrice);
            console.log(updatedPrice)
            
            if ( updatedData[index].amount === 0) {
                    
                updatedToppingData = selectedToppings.allToppings.filter(t => t.name !== toppingName);
            } else {
                updatedToppingData = [...selectedToppings.allToppings];
                updatedToppingData[toppingIndex] = {
                    name: toppingName,
                    amount: updatedData[index].amount
                };
            }
            setSelectedToppings({
                allToppings: updatedToppingData,
                totalPrice: updatedPrice
            });
            setToppings(updatedData)
    
    }},[selectedToppings, toppings])
    const changeIceLevel = useCallback((item)=>{
        if(item !== selectedIceLevel){
            setSelectedIceLevel(item)
        }
    },[selectedIceLevel])
    const changeSugarLevel = useCallback((item)=>{
        if(item !== selectedSugarLevel){
            setSelectedSugarLevel(item)
        }
    },[selectedSugarLevel])
    function changeSelectedTab(tab){
        switch(tab){
            case "sugar":
                setContainerDisplaySettings(["none","flex","none"])
                setTabCSS(["#bebebe","white","#bebebe"])
            
                break;
            case "toppings":
                setContainerDisplaySettings(["none","none","flex"])
                setTabCSS(["#bebebe","#bebebe","white"])
                break;
            default:
                
                setContainerDisplaySettings(["flex","none","none"])
                setTabCSS(["white","#bebebe","#bebebe"])
                break;
        }
    }
    const selectedComponent = useCallback((type, amount)=>{
        if(type === "ice" && amount === selectedIceLevel){
            return {
                border:'4px solid #0783f0',
                boxShadow: '10px 5px 5px #bebebe'
            }
        }else if(type === "sugar" && amount === selectedSugarLevel){
            return {
                border:'4px solid #0783f0',
                boxShadow: '10px 5px 5px #bebebe'
            }
        }else{
            return{
                border:'2px solid black',
            }
        }
    },[selectedIceLevel,selectedSugarLevel])
    
    
    
    const handleConfirmDrink = useCallback(()=>{
        
        selectedAdjustments({
            ice:selectedIceLevel,
            sugar:selectedSugarLevel,
            toppings: selectedToppings.allToppings,     
            price: selectedToppings.totalPrice,
            quantity: quantity
        })

        
    },[selectedIceLevel,selectedToppings,selectedSugarLevel,selectedAdjustments, quantity]) 
    
    return (
        <>
            <div className="container">
                <div className="tabContainer">
                    <div style={{backgroundColor: tabCSS[0]}}className="tab" onClick={()=>{
                            changeSelectedTab("ice")
                        }}>
                        <h2>Ice</h2>
                    </div>
                    <div style={{backgroundColor: tabCSS[1]}}className="tab"onClick={()=>{
                            changeSelectedTab("sugar")
                        }}>
                        <h2>Sugar</h2>
                    </div>
                    <div style={{backgroundColor: tabCSS[2]}}className="tab" onClick={()=>{
                            changeSelectedTab("toppings")
                        }}>
                        <h2>Toppings</h2>
                    </div>
                </div>
                <div style={{display:containerDisplaySettings[0]}} className="tabComponents">
                    {iceLevels.map((item, index) =>(
                        <button key={index} style={selectedComponent("ice", item)} onClick={()=>changeIceLevel(item)}className="item">{item}</button>
                        ))}
                </div>
                <div style={{display:containerDisplaySettings[1]}} className="tabComponents">
                    {sugarLevels.map((item, index) =>(
                        <button key={index} style={selectedComponent("sugar", item)} onClick={()=>changeSugarLevel(item)}className="item">{item}</button>
                        ))}
                </div>
                <div style={{display:containerDisplaySettings[2]}}className="tabComponents">
                    {toppings.map((topping) =>(
                         <Toppings key={topping._id} selectedAmount={selectedToppings.allToppings} toppingsData={topping} amountChange={handleAmountChange}/>
                     ))}
                </div>
                <div className='bottomBar'>
                    <div className='amountDrinkContainer'>
                        <button disabled={quantity === 1 ? (true):(false)}onClick={()=>{setQuantity(quantity - 1)}}>-</button>
                        <h2>{quantity}</h2>
                        <button onClick={()=>{setQuantity(quantity + 1)}}>+</button>
                    </div>
                    <div className='actionButtons'>
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleConfirmDrink}>Add Drink</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdjustmentContainer;