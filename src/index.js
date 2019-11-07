import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom';

import { mainRoutes} from './routes'
import App from './App.jsx';


ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/admin" render={(routerProps)=>{
                //权限验证,需登录才能访问
                return <App {...routerProps}/>
            }}/>
            {
                mainRoutes.map((router,index)=>(
                    <Route path={router.pathname} component={router.component} key={index}/>
                ))
            }
            <Redirect to="/admin" exact from="/"/>
            <Redirect to="/404" />
        </Switch>
    </Router>,
    document.getElementById('root'));

