import { Switch, Route } from 'react-router-dom';
import stateScreen from '../pages/stateScreen';
import cooksProfile from '../pages/Cook3';
//import cooksProfile from '../pages/CooksProfile2';
import Cooks from '../pages/Cooks';
import Login from '../pages/Login';
import Sign_Up from '../pages/Sign-up';
import Home from '../pages/Home';
import Invoice from '../pages/Invoice';
import Orders from '../pages/Orders';
import Menu from "../pages/Menu";



const routes = [
    { 
        path: '/community',
        page: stateScreen,
        exact: true
    },
    {
        path: '/cooks/:state',
        page: Cooks,
        exact: true
    },
    {
        path: '/cook/:id',
        page: cooksProfile,
        exact: true
    },
    {
        path: '/login',
        page: Login,
        exact: true
    },
    {
        path: '/signup',
        page: Sign_Up,
        exact: true
    },
    {
        path: '/',
        page: Home,
        exact: true
    },
    {
        path: '/invoice',
        page: Invoice,
        exact: true
    },
    {
        path: '/orders',
        page: Orders,
        exact: true
    },
    {
        path: '/menu',
        page: Menu,
        exact: true
    }
]



const Router = ()=>{
    return (
        <Switch>
            {routes.map(route=>{
                return (
                    <Route path={route.path} exact={route.exact} component={route.page} key={route.path}/>
                )
            })}
        </Switch>
    )
}

export default Router;