import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import "./style.scss"
import User from "./pages/User";
import PasswordReset from "./pages/PasswordReset"; 
import AccountRecovery from "./pages/AccountRecovery";

const Layout =() =>{
  return(
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element: <Home/>
      },
      {
        path: "/post/:id",
        element: <Single></Single>,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path:"/users/:id",
        element:<User />
      }
    ]
  },
  {
    path: "/register",
    element:<Register />,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path:"/reset",
    element:<AccountRecovery />
  },
  {
    path:"/reset/:id",
    element:<PasswordReset />,
  },
  
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
      
    </div>
  );
}



export default App;
