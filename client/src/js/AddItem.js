import "../css/AddItem.css"
import axios from "axios"
import { useEffect, useState } from "react"

function AddItem(props){
    const [containterDisplay, setContainerDisplay] = useState("none")
    const [selectedColorType, setSelectedColorType] = useState("RBG")
    const [colorBoxHTML, setColorBoxHTML] = useState(<></>)
    const [previewBoxHTML, setPreviewBoxHTML] = useState(<></>)
    const [colorValue1, setColorValue1] = useState(-1)
    const [colorValue2, setColorValue2] = useState(-1)
    const [colorValue3, setColorValue3] = useState(-1)
    const [singleColorValue, setSingleColorValue] = useState("")
    const [newItemName, setNewItemName] = useState("")
    const [newItemPrice, setNewItemPrice] = useState(-1)
  

    function isValidColor(color){
        let s = new Option().style
        s.color = color
        console.log(s.color)
        console.log(color)
        return s.color !== ""
    }
    function setToDefault() {
        window.location.reload()
    }
    useEffect(()=>{
        
        switch(selectedColorType){
            case "Hex":
                setColorBoxHTML(
                    <>
                    <div className="colorInputContainer">
                        <input className="addCategoryInput"type="text" placeholder="Ex. #000000" onChange={(e)=> setSingleColorValue(e.target.value)} ></input>
                    </div>
                    </> 
                )
                break;
            case "HSL":
                
                setColorBoxHTML (
                    <>
                    <div className="colorInputContainer">
                        <p>hsl (</p>
                        <input className="addCategoryInputSmall"type="number" max={360} min={0}  onChange={(e)=> setColorValue1(e.target.value)}></input>
                        ,
                        <input className="addCategoryInputSmall"type="number" max={100} min={0}  onChange={(e)=> setColorValue2(e.target.value)}></input>
                        %,
                        <input className="addCategoryInputSmall"type="number" max={100} min={0} onChange={(e)=> setColorValue3(e.target.value)}></input>
                        %)
                    </div>
                    <span>Ex. hsl(0,100%,50%) </span>
                    </>
                )
                break;
            case "Standard":
                
                setColorBoxHTML(
                    <>
                    <div className="colorInputContainer">
                        <input className="addCategoryInput"type="text"  pattern="[^0-9]*" placeholder="Ex. lightgreen" onChange={(e)=> setSingleColorValue(e.target.value)}></input>
                    </div>
                    </> 
                )
                break;
            default: 
            
            setColorBoxHTML (
                    <>
                    <div className="colorInputContainer">
                        <p>rgb (</p>
                        <input className="addCategoryInputSmall"type="number" max={255} min={0} onChange={(e)=> setColorValue1(e.target.value)}></input>
                        ,
                        <input className="addCategoryInputSmall"type="number" max={255} min={0} onChange={(e)=> setColorValue2(e.target.value)}></input>
                        ,
                        <input className="addCategoryInputSmall"type="number" max={255} min={0} onChange={(e)=> setColorValue3(e.target.value)}></input>
                        )
                    </div>
                    <span>Ex. rgb(255,0,117) </span>
                    </>
                )
                break;
        }
    },[selectedColorType])
    const handleConfirm = async(type) => {
        let isValid = true;
        let color = ""
        if(newItemName.length === 0 || newItemName.length > 18){
            isValid = false;
            setPreviewBoxHTML(<p style={{color: "red"}}>Input a name or a shorter one!</p>)
            return;
        }
        if (type === "drink"){
            if (newItemPrice < 0){
                isValid = false;
                setPreviewBoxHTML(<p style={{color: "red"}}>Input a valid price!</p>)
            return;
            }
        }
        switch(selectedColorType){
            case "Hex":
                if(isValidColor(singleColorValue) && singleColorValue.length !== 0){
                   color = singleColorValue
                }else{
                    isValid = false;
                    setPreviewBoxHTML(<p style={{color: "red"}}>Invalid Color</p>)
                }
                break;
            case "HSL":
                console.log(colorValue1 !== -1)
                if(colorValue1 !== -1 && colorValue2 !== -1 && colorValue3 !== -1 && isValidColor("hsl(" + colorValue1 +"," + colorValue2 + "%, " + colorValue3+"%)")  ){
                        color = "hsl(" + colorValue1 +"," + colorValue2 + "%, " + colorValue3+"%)"
                    
                }else{
                    isValid = false;
                    setPreviewBoxHTML(<p style={{color: "red"}}>Invalid Color</p>)
                }
               
                break;
            case "Standard":
                if(isValidColor(singleColorValue) && singleColorValue.length !== 0){
                    color = singleColorValue
                 }else{
                     isValid = false;
                     setPreviewBoxHTML(<p style={{color: "red"}}>Invalid Color</p>)
                 }
                 break;
               
            default: 
            if(isValidColor("rgb(" + colorValue1 +"," + colorValue2 + ", " + colorValue3+")" && colorValue1 !== -1 && colorValue2 !== -1 && colorValue3 !== -1)){
                color = "rgb(" + colorValue1 +"," + colorValue2 + ", " + colorValue3+")"
            }else{
                isValid = false;
                setPreviewBoxHTML(<p style={{color: "red"}}>Invalid Color</p>)
            }
         
                break;
        
        }
        if(isValid){
            if (type === "category"){
                await axios.post('/category', {
                    name: newItemName,
                    color: color
                  });
            }else{
                await axios.post('/drinks', {
                    name: newItemName,
                    color: color,
                    price: newItemPrice,
                    order: props.drinksLength + 1,
                    type: props.selectedCategory
                  });
            }
            
              
            window.location.reload()
        }
    }
    const handlePreview = (type) =>{
        let isValid = true;
        let color = ""
        if(newItemName.length === 0 || newItemName.length > 18){
            isValid = false;
            setPreviewBoxHTML(<p style={{color: "red"}}>Input a name or a shorter one!</p>)
            return;
        }
        if (type === "drink"){
            if (newItemPrice < 0){
                isValid = false;
                setPreviewBoxHTML(<p style={{color: "red"}}>Input a valid price!</p>)
            return;
            }
        }
        switch(selectedColorType){
            case "Hex":
                if(isValidColor(singleColorValue) && singleColorValue.length !== 0){
                   color = singleColorValue
                }else{
                    isValid = false;
                    setPreviewBoxHTML(<p style={{color: "red"}}>Invalid Color</p>)
                }
                break;
            case "HSL":
                console.log(colorValue1 !== -1)
                if(colorValue1 !== -1 && colorValue2 !== -1 && colorValue3 !== -1 && isValidColor("hsl(" + colorValue1 +"," + colorValue2 + "%, " + colorValue3+"%)")  ){
                        color = "hsl(" + colorValue1 +"," + colorValue2 + "%, " + colorValue3+"%)"
                    
                }else{
                    isValid = false;
                    setPreviewBoxHTML(<p style={{color: "red"}}>Invalid Color</p>)
                }
               
                break;
            case "Standard":
                if(isValidColor(singleColorValue) && singleColorValue.length !== 0){
                    color = singleColorValue
                 }else{
                     isValid = false;
                     setPreviewBoxHTML(<p style={{color: "red"}}>Invalid Color</p>)
                 }
                 break;
               
            default: 
            if(isValidColor("rgb(" + colorValue1 +"," + colorValue2 + ", " + colorValue3+")" && colorValue1 !== -1 && colorValue2 !== -1 && colorValue3 !== -1)){
                color = "rgb(" + colorValue1 +"," + colorValue2 + ", " + colorValue3+")"
            }else{
                isValid = false;
                setPreviewBoxHTML(<p style={{color: "red"}}>Invalid Color</p>)
            }
         
                break;
        
        }
        
        if(isValid){
            if(type === "category"){
                setPreviewBoxHTML(<>
                    <div className="category preview">
                        <div className='categoryColor previewColor' style={{backgroundColor: color}}></div>
                        <h2> {newItemName}</h2>
                    </div>
                </>)
            }else(
                
                setPreviewBoxHTML(
                    <>
                    <div className="sdContainer previewSingleDrink">
                        <h2 className="drinkName">
                            {newItemName}
                        </h2>
                        <p className="drinkPrice">${newItemPrice.toFixed(2)}</p>
                        <div style={{backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0), " + color +")"}} className="drinkColor"></div>
                    </div>
                </>
                )
            )
        }
    }
    const handleAddItem = () =>{
        setContainerDisplay("flex")
    }
    
    return (
        <>
        <button onClick={handleAddItem} className="addItemButton" title="Add New Item">+</button>
        {props.selectedCategory === "" ? (
            <>
                <div className="addItemScreen" style={{display: containterDisplay}} onClick={setToDefault}>
                </div>
                <div className="addItemContainer" style={{display: containterDisplay}}>
                        <h2 className="title">Category Name</h2>
                        <input className="addCategoryNameInput"type="text" onChange={e => setNewItemName(e.target.value)}></input>
                        <h2 className="title"> Color </h2>
                        <select onChange={e=>setSelectedColorType(e.target.value)}defaultValue="RGB">
                            <option value="RGB">RGB</option>
                            <option value="Hex">Hex</option>
                            <option value="HSL">HSL</option>
                            <option value="Standard">Standard</option>
                        </select>
                        
                        {colorBoxHTML}
                        
                        <button className="previewButton"onClick={()=>handlePreview("category")}>Preview</button>
                        {previewBoxHTML}
        
                        <button className="confirmItemButton" onClick={()=>handleConfirm("category")}>Confirm</button>
                        
                    </div>
                </>
        ):(
            <>
             <div className="addItemScreen" style={{display: containterDisplay}} onClick={setToDefault}>
                </div>
                <div className="addItemContainer" style={{display: containterDisplay}}>
                        <p>In {props.selectedCategory}</p>
                        {props.selectedCategory === "All"? (
                            <p style={{color: "red", fontStyle: "italic", textAlign: "center", margin: 0}}>Warning! This will add this item EXCLUSIVELY in the All category</p>
                        ):(<></>)}
                        <div className="nonColorInputContainer">
                            
                                <h2 className="title">Drink Name</h2>
                                <input className="addCategoryNameInput"type="text" onChange={e => setNewItemName(e.target.value)}></input>
                          
                                <h2 className="title">Price</h2>
                                    <div className="priceInputContainer">
                                        <p>$</p>
                                        <input className="priceInput"type="number" onChange={e => setNewItemPrice(Number(e.target.value))}></input>
                                    
                                    </div>
                            
                        </div>
                        <h2 className="title"> Color </h2>
                        <select onChange={e=>setSelectedColorType(e.target.value)}defaultValue="RGB">
                            <option value="RGB">RGB</option>
                            <option value="Hex">Hex</option>
                            <option value="HSL">HSL</option>
                            <option value="Standard">Standard</option>
                        </select>
                        
                        {colorBoxHTML}
                        
                        <button className="previewButton" onClick={()=>handlePreview("drink")}>Preview</button>
                        {previewBoxHTML}
        
                        <button className="confirmItemButton" onClick={()=>handleConfirm("drink")}>Confirm</button>
                        <p style={{color: "red", fontStyle: "italic", textAlign: "center", margin: 0}}>Warning! This will cause the page to reload!</p>
                        <p style={{color: "red", fontStyle: "italic", textAlign: "center", margin: 0}}>Any order will be ERASED!</p>
                        
                    </div>
            </>
        )}
        </>
    )
}
export default AddItem;