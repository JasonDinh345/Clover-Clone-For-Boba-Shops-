import { useEffect, useState } from "react";
import axios from 'axios'

import "../css/PayScreen.css"

function PayScreen({orderLength}){
    const [currentOrder, setCurrentOrder] = useState({ allDrinks: [], subtotalPrice: 0, totalPrice:0 });
    useEffect(() => {
        const fetchCurrentOrder = async () => {
          try {
            const res = await axios.get('/order/current');
            setCurrentOrder(res.data);
          } catch (err) {
            console.error("Error fetching current order:", err);
          }
        };
    
        fetchCurrentOrder();
      }, [orderLength]);
      function nextBill(total){
        const bills = [1,2,5,10,20,50,100]
        let addToBill = 0;
        
        while(currentOrder.totalPrice >  addToBill){
            
            for(let i = 0; i< bills.length; i++){
                
                if(currentOrder.totalPrice < bills[i] + addToBill){
                    if(bills[i] + addToBill === Math.ceil(currentOrder.totalPrice)  + (10-Math.ceil(currentOrder.totalPrice)%10)){
                        if(bills[i] % 100 === 0){
                            return bills[i] + addToBill + 5;
                        }
                        return bills[i+ 1] + addToBill
                    }
                    return bills[i] + addToBill
                }
            }
            addToBill += 100;
        }
        return addToBill
        
      }
      
    return(
        <>
        
        <div className="payScreen">
            
                <h2>Card</h2>
                <button className="cardButton">${currentOrder.totalPrice.toFixed(2)}</button>
                <h2>Cash</h2>
                <div className="cashButtons">
                    <button>${currentOrder.totalPrice.toFixed(2)}</button>
                    <button>${Math.ceil(currentOrder.totalPrice)}</button>
                    <button>${Math.ceil(currentOrder.totalPrice)  + (10-Math.ceil(currentOrder.totalPrice)%10)}</button>
                    <button>${nextBill(currentOrder.totalPrice)}</button>
                </div>
            </div>
        </>
    )
}
export default PayScreen;