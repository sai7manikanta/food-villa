import { useEffect,useState } from "react";
import Shimmer, { MenuShimmer } from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import { useParams } from "react-router-dom";
import{
    IMG_DISH_URL,
   } from "../constants";
const RestaurantMenu=()=>{
  const [resInfo,setResInfo]=useState(null);
  const [showIndex,setShowIndex]=useState(0);

  const {resId}=useParams();

    useEffect(()=>{
        fetchMenu();
    },[]);

    const fetchMenu=async()=>{
       const data=await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId="+resId+"&submitAction=ENTER"
        );
       const json=await data.json();
       console.log(json);
       setResInfo(json.data);
    };

    if (resInfo===null) return <MenuShimmer/>;

    const {name,cuisines,costForTwoMessage}=
    resInfo?.cards[0]?.card?.card?.info;

    const {itemCards}=resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    const categories=resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c)=>c.card?.["card"]?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
   
    



    return !itemCards ?(<MenuShimmer/>):(
      <div className="text-center">
        <h1 className="font-bold my-6 text-2xl">{name}</h1>
        <p className="font-bold text-lg">{cuisines.join(", ")}-{costForTwoMessage}</p>
        {categories.map((category,index)=>(
          <RestaurantCategory  key={category?.card?.card.title} data={category?.card?.card} showItems={index===showIndex?true:false}
          setShowIndex={()=>setShowIndex(index)}/>
        ))}
      </div>
      

      
    
      
  );
};

export default RestaurantMenu;