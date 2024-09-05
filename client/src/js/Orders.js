import "../css/Order.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleOrder from "./SingleOrder";

function Orders({ orderLength, handleEdit, handleDelete, setPayScreenDisplay }) {
  const [currentOrder, setCurrentOrder] = useState({ allDrinks: [], subtotalPrice: 0, totalPrice:0 });

  useEffect(() => {
    const initializeOrder = async () => {
      try {
        await axios.patch('/order/current', {
          allDrinks: [],
          subtotalPrice: 0,
        });
      } catch (err) {
        console.error("Error initializing order:", err);
      }
    };

    initializeOrder();
  }, []);

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
  const handlePay = ()=>{
    setPayScreenDisplay(true)
  }
  return (
    <div id="fullOrderContainer">
      <div className="orderContainer">
      {currentOrder.allDrinks && currentOrder.allDrinks.length > 0 ? (
        currentOrder.allDrinks.map((drink, index) => (
          <SingleOrder key={index} drink={drink} handleEdit={handleEdit}  handleDelete={handleDelete}/>
        ))
      ) : (
        <p style={{textAlign:"center"}}>Select a Drink to Start Your Order</p>
      )}
      </div>
      <div className="bottomOrderContainer">
        <div className="priceContainer">
          <p>Subtotal: ${currentOrder.subtotalPrice.toFixed(2)}</p>
          <p>Tax: ${(currentOrder.subtotalPrice * .08).toFixed(2)}</p>
          <h2>Total: ${currentOrder.totalPrice.toFixed(2)}</h2>
        </div>
        {currentOrder.subtotalPrice === 0 ? (
          <button disabled={true}>Pay</button>
        ):(
          <button onClick={handlePay}>Pay</button>
        )}
      </div>
    </div>
  );
}

export default Orders;
