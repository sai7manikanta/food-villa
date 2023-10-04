import RestaurantCard,{withPromotedlabel} from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";



const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant,setFilteredRestaurant]=useState([]);
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(()=>{
    fetchData();
  },[]);
  const fetchData=async()=>{
    const data=await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING");
    const json=await data.json();
    console.log(json);
    setRestaurants(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };
  const onlineStatus=useOnlineStatus();
  if(onlineStatus===false)return<h1>looks like you are offline</h1>



  return restaurants?.length === 0?<Shimmer/>:(
    <>
    
        <div className="search-container">
          <input type="text" className="search-input" value={searchText} onChange={(e)=>{setSearchText(e.target.value);}}/>
          <button className="search-btn" onClick={()=>{
            console.log(searchText);
            const filteredRestaurant=restaurants.filter((res)=>
            res.info.name.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredRestaurant(filteredRestaurant);
          }}> Search</button>
        </div>
     
      
      <div className="restaurant-list">
        {(filteredRestaurant===null?setRestaurants:filteredRestaurant).map((restaurant) => {
          return (
            <Link key={restaurant?.info.id} to={"/restaurants/"+restaurant?.info.id}>
              <RestaurantCard  resData={...restaurant?.info} /></Link>
          );
        })}
      </div>
    </>
  );
};

export default Body;