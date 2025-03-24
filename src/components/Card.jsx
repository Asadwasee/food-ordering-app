import React from 'react'
import { GiChickenOven } from "react-icons/gi";
import { LuLeafyGreen } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { toast } from 'react-toastify';


const Card = ({name,image,id,price,type}) => {
  let dispatch =useDispatch()
  return (
    <div className='w-[300px] h-[360px] bg-white p-3 shadow-xl rounded-lg flex flex-col gap-3 hover:border-2 border-green-300  ' >
      <div className='w-[100%] h-[60%] overflow-hidden rounded-lg'>
<img src={image} alt="" className='object-cover' />
      </div>
      <div className='font-semibold text-2xl '>
      {name}
      </div>
      <div className='w-full flex justify-between items-center'>
      <div className='text-lg font-bold text-green-500'>RS {price}</div>
    <div className=" flex justify-center items-center gap-2 text-green-500 text-lg font-semibold"> {type === "veg"?<LuLeafyGreen/>:<GiChickenOven/>}  <span>{type}</span></div>
    </div>

    <button className='w-full p-3 bg-green-400 hover:bg-green-600 text-gray-950 font-semibold rounded-lg'
    onClick={()=>dispatch(addItem({id:id, name:name, price:price, image:image, qty:1}))} 
    >Add to Dish</button>
    </div>
  )
}

export default Card