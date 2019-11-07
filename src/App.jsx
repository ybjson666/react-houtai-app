import React, { Component } from 'react'
import { Route,Switch,Redirect } from 'react-router-dom'
import { admainRoutes } from './routes'
import Frame from './components/common/Frame';

export default class App extends Component{
        
    render(){
        return(
            <Frame>
                <Switch>
                    {
                        admainRoutes.map((router,index)=>(
                            <Route path={router.pathname} render={(routerProps)=>(<router.component {...routerProps}/>)} 
                            key={index}
                            exact={router.exact}
                            />
                        ))
                    }
                    <Redirect to={admainRoutes[0].pathname} from='/admin' exact />
                    <Redirect to='/404' />
                </Switch>
            </Frame>
        )
    }
}
