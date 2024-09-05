
import "../css/SingleDrink.css"
import axios from "axios";
import  {useRef, useState } from 'react';
function SingleDrink({drink, selected}){
    const [deleteScreenDisplay, setDeleteScreenDisplay] = useState("none")
    
    const timerRef = useRef(null);
    const handleCancel = () =>{
        setDeleteScreenDisplay("none")
    }
    const handleDelete = async() =>{
        await axios.delete("/drinks/" + drink._id)
        window.location.reload()
    }
    const change = (()=>{
        selected(drink)
    })
    const handleMouseDown = () => {
        timerRef.current = setTimeout(() => {
            setDeleteScreenDisplay("flex")
        }, 1000);
      };

      const handleMouseLeave = () => {
        clearTimeout(timerRef.current);
      };
    return (
        <>
            <div className="sdContainer"   
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseLeave}
            onClick={() => change()}
             >
                
                <h2 className="drinkName">
                    {drink.name}
                </h2>
                <p className="drinkPrice">${drink.price.toFixed(2)}</p>
                <div style={{backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0), " + drink.color +")"}} className="drinkColor"></div>
            </div>
            <div className="deleteScreenBG" style={{display: deleteScreenDisplay}}></div>
            <div className="deleteScreen" style={{display: deleteScreenDisplay}}>
                <h2 style={{textAlign: "center"}}>Are you sure you want to delete <span style={{color: drink.color}}>{drink.name}</span> ?</h2>
                <div className='deleteButtonBox'>
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
            </div>

            
        </>
    )
}

export default SingleDrink