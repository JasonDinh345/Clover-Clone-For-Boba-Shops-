import "../css/SingleOrder.css"
import {useState} from 'react'
function SingleOrder({drink, handleEdit, handleDelete}){
    const [onHoverState, setOnHoverState] = useState("none");
    return(
        <>
        <div className="drinkContainer" onMouseEnter={() => setOnHoverState('flex')} onMouseLeave={() => setOnHoverState('none')}>
            <h2 className="drinkname" >{drink.name}</h2>
            {drink.iceLevel === "Regular Ice" ?(
                <></>
            ):(
                <p>{drink.iceLevel}</p>
            )}
            {drink.sugarLevel === "100%" ?(
                <></>
            ):(
                <p>Sugar: {drink.sugarLevel}</p>
            )}
    
            {drink.toppings.map((topping, index) =>(
                <p key={index}>{topping.name} {topping.amount}x</p>
            ))}
           
            <p className="orderPrice">${drink.totalPrice.toFixed(2) }</p>
            <div className="drinkContainerHover" style={{display:onHoverState}}>
                <img alt="edit" className="editDrinkIcon"src="src/img/circle.png" onClick={()=>handleEdit(drink)}></img>
                <img alt="delete" className="deleteDrinkIcon"src="src/img/delete.png" onClick={()=>handleDelete(drink)}></img>
            </div>
        </div>
        
        </>
    )
}
export default SingleOrder