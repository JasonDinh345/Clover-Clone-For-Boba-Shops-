import React, { useState, memo, useCallback } from "react";
import "../css/Toppings.css";

function Toppings({ toppingsData, amountChange }) {
    const [isSelected, setSelected] = useState(()=>{
        
        if(toppingsData.amount > 0){
            
            return true;
        }
        return false;
    });
    const [sizeForTopping, setSizeForTopping] = useState(()=>{
        if(isSelected){
           return [
                {height: '20%', border:'2px solid #0783f0',boxShadow: '10px 5px 5px darkgray'},
                {height: '80%'},
                {top: "50%"}
            ]
        }
        return [
            {height: '16%'},{height: '100%'},{top: "60%"}
        ]
    });
    


    const handleDecreaseAmount = useCallback((id, amount) => {
        amountChange("decrease", id, amount);
        if(toppingsData.amount === 1){
            setSizeForTopping([
                {height: '16%'},{height: '100%'},{top: "60%"}
            ]);
            setSelected(false);
        }
    }, [amountChange, toppingsData.amount]);

    const handleIncreaseAmount = useCallback((id, amount) => {
        amountChange("increase", id, amount);
    }, [amountChange]);

    const selectTopping = useCallback((id, amount) => {
        if(isSelected){
            handleDecreaseAmount(id, amount);
        } else { 
            handleIncreaseAmount(id, 1);
            setSizeForTopping([
                {height: '20%', border:'2px solid #0783f0',boxShadow: '10px 5px 5px darkgray'},
                {height: '80%'},
                {top: "50%"}
            ]);
        }
        setSelected(!isSelected);
    }, [handleDecreaseAmount, handleIncreaseAmount, isSelected]);

    
   
    return (
        <div style={sizeForTopping[0]} className="toppingContainer">
             <button
                style={sizeForTopping[1]}
                className='toppings'
                onClick={() => selectTopping(toppingsData._id, toppingsData.amount)}
            >
                {toppingsData.name}
            </button>
            <p style={sizeForTopping[2]} className='toppingPrice'>${toppingsData.price.toFixed(2)}</p>
            <div style={{visibility: isSelected ? 'visible':'hidden'}} className="amountContainer">
                <button onClick={() => handleDecreaseAmount(toppingsData._id, 1)} disabled={toppingsData.amount === 0}>-</button>
                <p>{toppingsData.amount}</p>
                <button onClick={() => handleIncreaseAmount(toppingsData._id, 1)}>+</button>
            </div>
        </div>
    );
}

export default memo(Toppings);
