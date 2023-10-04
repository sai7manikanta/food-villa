import {  useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
const Title = () => (
    <a href="/">
      <img
        src="https://i.pinimg.com/474x/e6/17/f1/e617f1bfb9af4d9cf132cd3dec0da072.jpg"
        alt="Food Villa"
        className="logo"
      />
    </a>
  );
  
  const Header = () => {
    const onlineStatus=useOnlineStatus();
    // use useState for user logged in or logged out
    const [isLoggedin, setIsLoggedin] = useState(true);
    const navigate = useNavigate();

    const cartItems=useSelector((store)=>store.cart.items);
    return (
      <div className="header">
        <Title />
        <div className="nav-items">
          <ul>
            <li>
              Online Status:{onlineStatus?"🥲":"😄"}
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
  
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
            <li className="px-4 font-bold text-xl"><Link to="cart">🛒cart - ({cartItems.length} items)</Link></li>
            <li>
              {/* use conditional rendering for login and logout */}
              {isLoggedin ? (
                <button
                  className="logout"
                  onClick={() => setIsLoggedin(false)}
                >
                  Logout
                </button>
              ) : (
                <button className="login" onClick={() => navigate("/login")}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Header;