import React from 'react'
import {Layout} from 'antd'
import HeaderBar from '../../component/HeaderBar';
import SiderNav from '../../component/SiderNav';
import ContentMain from '../../component/ContentMain';

const {Sider, Header, Content, Footer} = Layout

class Index extends React.Component {
    state = {
        collapsed: false
    }

    toggle = () => {
        // console.log(this)  状态提升后，到底是谁调用的它
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render(){
        return (
            <div id='page'>
                <Layout>
                    <Sider collapsible trigger={null} collapsed={this.state.collapsed} >
                        <SiderNav collapsed={this.state.collapsed}></SiderNav>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: '0 16px'}}>
                            <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}></HeaderBar>
                        </Header>
                        <Content>
                            <ContentMain/>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>React-Admin ©2019 Created by internet</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Index