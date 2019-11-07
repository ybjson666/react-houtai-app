import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout,Menu,Icon } from 'antd'

import logo from './images/logo.png'
import './frame.less'
import { admainRoutes } from '../../../routes'  
const { Item }=Menu
const { Header,Content,Sider }=Layout

const menus=admainRoutes.filter(item=>item.isNav===true)

@withRouter
 class Frame extends Component {

    routerSkip=({key})=>{
        this.props.history.push(key);
    }

    render() {
    
        let path=this.props.location.pathname.split('/');
            path.length=3;

        return (
            <Layout style={{minHeight:"100%",padding:"0"}}>
                <Header className="header">
                    <div className="logo"><img src={logo} alt=""/></div>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            style={{ height: '100%', borderRight: 0 }}
                            selectedKeys={[path.join('/')]}
                            onClick={this.routerSkip}
                            >
                            {

                            //     menus.map((menu)=>(
                            //         <Item key={menu.pathname}>
                            //             <Link to={menu.pathname}>
                            //                 <Icon type={menu.icon}/>
                            //                 <span>{menu.title}</span>
                            //             </Link>
                            //         </Item>
                            //         ))
                            //
                            //传统方式
                            }

                            {
                                menus.map((menu)=>(
                                    <Item key={menu.pathname}>
                                        <Icon type={menu.icon}/>
                                        <span>{menu.title}</span>
                                    </Item>
                                ))
                            }

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px' }}>
                        <Content
                        style={{ background: '#fff'}}
                        >
                        {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Frame)
