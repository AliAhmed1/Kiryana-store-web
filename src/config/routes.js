import React, { Suspense, lazy } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import "../App.scss";


const Home = lazy(() => import('../screens/Home'));
const RegisterStore = lazy(() => import('../screens/RegisterStore'));
const Login = lazy(() => import('../screens/Login'));
const Stores = lazy(() => import('../screens/Stores'));
const StoreDetails = lazy(() => import('../screens/StoreDetails'));
const AddMenuItems = lazy(() => import('../screens/AddMenuItems'));
const OrderRequests = lazy(() => import('../screens/OrderRequests'));
const MyOrders = lazy(() => import('../screens/MyOrders'));
const MyItems = lazy(() => import('../screens/MyItems'));
const Dashboard = lazy(() => import('../screens/Dashboard/Dashboard'));
const CompareItems = lazy(() => import('../screens/CompareItems'));
// const Spinner = lazy(() => import('../components/spinner'));


// import Home from '../screens/Home';
// import RegisterStore from '../screens/RegisterStore';
// import Login from '../screens/Login';
// import Stores from '../screens/Stores';
// import StoreDetails from '../screens/StoreDetails';
// import AddMenuItems from '../screens/AddMenuItems';
// import OrderRequests from '../screens/OrderRequests';
// import MyOrders from '../screens/MyOrders';
// import MyItems from '../screens/MyItems';
// import Dashboard from '../screens/Dashboard/Dashboard'
// import CompareItems from '../screens/CompareItems'



const customHistory = createBrowserHistory();

// Routes For Navigation
const MyRoutes = () => (
    <Router history={customHistory}>
        <Suspense fallback={<div className="spinner spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span></div>}>
            <div>
                <Route exact path='/' component={Home}></Route>
                <Route path='/register-store' component={RegisterStore}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/stores' component={Stores}></Route>
                <Route path='/store-details' component={StoreDetails}></Route>
                <Route path='/add-menu-items' component={AddMenuItems}></Route>
                <Route path='/order-requests' component={OrderRequests}></Route>
                <Route path='/my-orders' component={MyOrders}></Route>
                <Route path='/my-items' component={MyItems}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Route path='/compare-items' component={CompareItems}></Route>
            </div>
        </Suspense>
    </Router>
)

export default MyRoutes