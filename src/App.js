import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";
import About from  "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Profile from "./components/ProfileClass";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";



const AppLayout = () => {
  return (
    <Provider store={appStore}>
    <React.Fragment>
      <Header/>
      <Outlet/>
      <Footer/>
    
      
    </React.Fragment>
    </Provider>
  );
};
const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Body/>,
        
      },
      {
        path: "about",
        element: <About />,
        children: [{ // nested routing
          path: "profile",
          element: <Profile/>,
        }]
      },
      {
        path:"contact",
        element:<Contact/>,
      },
      {
        path:"restaurants/:resId",
        element:<RestaurantMenu/>,
      },
      {
        path:"/cart",
        element:<Cart/>,
      }
     
    ],
    errorElement:<Error/>
  },
  {
    path: "login",
    element: <Login />,
  },
 
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);