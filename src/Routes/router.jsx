import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Error404 from "../Pages/Error404";
import Loading from "../Pages/Loading";
import ForgotPassword from "../Pages/ForgotPassword";
import Challenges from "../Pages/Challenges";
import MyActivities from "../Pages/MyActivities";
import AddChallenges from "../Pages/AddChallenges";
import PrivateRoute from "./PrivateRoute";
import EcoTips from "../Pages/EcoTips";
import Events from "../Pages/Events";
import EventDetails from "../Components/EventDetails";
import ViewChallenge from "../Pages/ViewChallenge";
import EditChallenge from "../Pages/EditChallenge";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageUsers from "../Pages/Dasboard/ManageUsers";
import DashboardHome from "../Pages/Dasboard/DashboardHome";
import ManageChallenges from "../Pages/Dasboard/ManageChallenges";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <Error404/>,
    hydrateFallbackElement: <Loading/>,
    children:[
        {
            index: true,
            element: <Home/>,
        },
        {
            path: '/tips',
            element: <EcoTips/>,
        },
        {
            path: '/events',
            element: <Events/>,
        },
        {
            path: '/events/:id',
            element: <PrivateRoute><EventDetails/></PrivateRoute>,
        },
        {
            path: '/register',
            element: <Register/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '*',
            element: <Error404/>,
        },
        {
            path: '/forgot-password',
            element: <ForgotPassword/>,
        },
        {
            path: '/challenges',
            element: <Challenges/>,
        },
        {
            path: '/challenges/join/:id',
            element: <PrivateRoute><AddChallenges/></PrivateRoute>,
        },
        {
            path: '/challenges/:id',
            element: <PrivateRoute><ViewChallenge/></PrivateRoute>,
        },
        {
            path: '/my-challenges',
            element: <PrivateRoute><MyActivities/></PrivateRoute>,
        },
        {
            path: '/my-challenges/:id',
            element: <PrivateRoute><EditChallenge/></PrivateRoute>,
        },

    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: "overview", element: <DashboardHome /> },
      
      
      { path: "manage-users", element: <ManageUsers /> },
      
     
      { path: "manage-challenges", element: <ManageChallenges /> },
      
     
      { path: "my-activities", element: <MyActivities /> },
    ]
  }
]);

export default router;