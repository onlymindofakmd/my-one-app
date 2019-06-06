import React from 'react'
import {Layout} from 'antd'
import LeftMenu from '../leftmenu'
import Top from '../top'
import MainContent from '../content'
import {connect} from 'react-redux'
import { BrowserRouter as Router ,Route, withRouter } from 'react-router-dom';

const {Header, Sider, Content, Footer} = Layout
class Home extends React.Component {
    render(){
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider>
                    <LeftMenu></LeftMenu>
                </Sider>
                <Layout>
                    <Header>
                        <Top></Top>
                    </Header>
                    <Content>
                        <MainContent></MainContent>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Admin ©2018 Created by Mindofakmd</Footer>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = (state)=>{
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))