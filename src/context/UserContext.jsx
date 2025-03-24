import React, { createContext, useState } from 'react'
import { food_items } from '../food';

export const dataContext = createContext()
const UserContext = ({children}) => {
    let [input, setInput] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(food_items);
    let [showCart, setShowCart] = useState(false)
    
    let data ={
input,
setInput,
selectedCategory,
setSelectedCategory,
showCart,
setShowCart
    }
  return (
    <div>
        <dataContext.Provider value={data}>
        {children}
        </dataContext.Provider>
    </div>
  )
}

export default UserContext