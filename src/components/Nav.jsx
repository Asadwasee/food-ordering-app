import { MdFastfood } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { useContext, useEffect } from "react";
import { dataContext } from "../context/UserContext";
import { food_items } from "../food";
import { useSelector } from "react-redux";

function Nav() {
  let {input, setInput, selectedCategory, setSelectedCategory, showCart, setShowCart} = useContext(dataContext)
  useEffect(()=>{
   let newlist = food_items.filter((item) => item.food_name.toLowerCase().includes(input.toLowerCase()))
   setSelectedCategory(newlist)
  }, [input])
  let items = useSelector(state=>state.cart)
 console.log(items);
 

  return (
    <div className="w-full h-[100px] flex justify-between items-center px-10">
      <div className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl">
        <MdFastfood className="w-[30px] h-[30px] text-green-500" />
      </div>

      <form className="w-[50%] md:w-[70%] h-[50px] bg-white flex items-center rounded-md shadow-xl gap-5 px-5"
      onSubmit={(e) => e.preventDefault()}>
        <IoIosSearch className="w-[20px] h-[20px] text-green-500 " />
        <input
          type="text"
          placeholder="Search"
          className="w-[100%] outline-none text-[16px] md:text-[18px] font-semibold"
          onChange={(e) => setInput(e.target.value)} value={input}
        />
      </form>

      <div className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative"
      onClick={() =>{
        setShowCart(true)
      }}
      >
        <span className="absolute top-0 right-2 text-green-500 font-semibold">{items.length}</span>
        <LuShoppingBag  className="w-[30px] h-[30px] text-green-500" />
      </div>
    </div>
  );
}

export default Nav;
