import { useContext, useState } from "react";
import { Categories } from "../Category";
import Nav from "../components/Nav";
import Card from "../components/Card";
import { food_items } from "../food";
import { dataContext } from "../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import CardTwo from "../components/CardTwo";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


function Home() {
  let { selectedCategory, setSelectedCategory, input , showCart, setShowCart} =
    useContext(dataContext);

  function filter(category) {
    if (category === "All") {
      setSelectedCategory(food_items);
    } else {
      let newList = food_items.filter((item) => {
        return (
          item.food_category.trim().toLowerCase() ===
          category.trim().toLowerCase()
        );
      });
      setSelectedCategory(newList);
    }
  }
  let items = useSelector(state=>state.cart)

  let subtotal = items.reduce((total,item)=> total+item.qty*item.price,0)
  let deliveryFee = 50
  let taxes = subtotal*0.5/100;
  let total = Math.floor(subtotal+deliveryFee+taxes)
  

  return (
    <div className="min-h-screen bg-slate-200">
      <Nav />
      {!input ? (
        /* Categories Section */
        <div className="w-full flex flex-wrap md:flex-nowrap justify-center items-center gap-5 p-5">
          {Categories.map((item, index) => (
            <div
              className="w-[150px] h-[120px] bg-white rounded-md shadow-xl flex flex-col justify-center items-center text-[20px] font-semibold hover:bg-green-200 cursor-pointer transition-all duration-200 "
              key={index}
              onClick={() => filter(item.name)}
            >
              {item.icon}
              {item.name}
            </div>
          ))}
        </div>
      ) : /* End of Categories Section */
      null}

     { /* Food Items Section */ }
      <div className="w-full flex flex-wrap justify-center items-center gap-6 p-5">
      {selectedCategory.length>1?selectedCategory.map((item) => (
          <Card
            key={item.id}
            name={item.food_name}
            image={item.food_image}
            price={item.price}
            id={item.id}
            type={item.food_type}
          />
        )):<div className="text-2xl text-green-500 font-semibold">No Items Found</div>}
        
      </div>
     { /* End of Food Items Section */ }
      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 transition-all duration-500 flex flex-col items-center overflow-auto ${showCart ? "translate-x-0" : "translate-x-full"} `}>
        <header className="w-[100%] flex justify-between items-center p-5">
          <span className="text-green-400 font-semibold text-[20px]">Order items</span>
          <RxCross2 className="text-[28px] text-green-400 font-semibold  hover:text-gray-600 cursor-pointer"
          onClick={() => setShowCart(false)}
          />
        </header>
        
        {items.length>0?<>
        <div className="w-full mt-8 flex flex-col gap-5  ">
          {items.map((item) => (
            <CardTwo key={item.id} name={item.name} image={item.image} price={item.price} id={item.id} qty={item.qty} />
          ))}
        </div>
        
      <div className="w-full border-t-2 border-b-2 border-gray-400 mt-6 flex flex-col gap-2 p-5">
     <div className="w-full flex justify-between items-center">
      <span className="text-[16px] text-gray-600 font-semibold">SubTotal</span>
      <span className="text-[16px] text-green-500 font-semibold">RS {subtotal}/-</span>
     </div>

     <div className="w-full flex justify-between items-center">
      <span className="text-[16px] text-gray-600 font-semibold">Delivery Fee</span>
      <span className="text-[16px] text-green-500 font-semibold">RS {deliveryFee}/-</span>
     </div>

     <div className="w-full flex justify-between items-center">
      <span className="text-[16px] text-gray-600 font-semibold">Taxes</span>
      <span className="text-[16px] text-green-500 font-bold">RS {taxes}/-</span>
     </div>

      </div>
      <div className="w-full flex justify-between items-center p-6">
      <span className="text-xl text-gray-800 font-semibold">Total</span>
      <span className="text-xl text-green-500 font-semibold">RS {total}/-</span>
     </div>
     <button className='w-[80%] p-3 bg-green-500 hover:bg-green-400 text-gray-950 font-semibold rounded-lg'
     onClick={()=>{
      toast.success("Order Place Successfully")
     }}
     >Place Order</button>
     </>:<div className="text-center text-2xl text-green-500 font-semibold pt-5">Cart is Empty</div>}
        
      </div>
    </div>
  );
}

export default Home;
