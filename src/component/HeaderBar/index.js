import React from 'react'
import { Icon, Badge, Dropdown, Menu, Modal } from 'antd'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../utils/Session'
import {getMsgs, ajaxLogout} from '../../routes/common/action'

class HeaderBar extends React.Component {
  state = {
    icon: 'arrows-alt',
    visible: false,
    avatar: require('./img/04.jpg')
  }

  componentDidMount () {
    screenfull.onchange(() => {
      this.setState({
        icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
      })
    })
  }

  componentWillUnmount () {
    screenfull.off('change')
  }

  toggle = () => {
    this.props.onToggle()
  }
  screenfullToggle = () => {
    if (screenfull.enabled) {
      screenfull.toggle()
    }
  }
//   logout = () => {
//     this.props.appStore.toggleLogin(false)
//     this.props.history.push(this.props.location.pathname)
//   }

  render () {
    const {icon, visible, avatar} = this.state
    const {collapsed, location, count} = this.props
    const notLogin = (
      <div>
        <Link to={{pathname: '/login', state: {from: location}}} style={{color: 'rgba(0, 0, 0, 0.65)'}}>登录</Link>&nbsp;
        <img src={require('../../assets/img/defaultUser.jpg')} alt=""/>
      </div>
    )
    const menu = (
      <Menu className='menu'>
        <Menu.ItemGroup title='用户中心' className='menu-group'>
          <Menu.Item>你好 - {isAuthenticated()}</Menu.Item>
          <Menu.Item>个人信息</Menu.Item>
          <Menu.Item><span onClick={this.logout}>退出登录</span></Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title='设置中心' className='menu-group'>
          <Menu.Item>个人设置</Menu.Item>
          <Menu.Item>系统设置</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    )
    const login = (
      <Dropdown overlay={menu}>
        <img onClick={() => this.setState({visible: true})} src={avatar} alt=""/>
      </Dropdown>
    )
    return (
      <div id='headerbar'>
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          className='trigger'
          onClick={this.toggle}/>
        <div style={{lineHeight: '64px', float: 'right'}}>
          <ul className='header-ul'>
            <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
            <li onClick={() => this.setState({count: 0})}>
              <Badge count={this.props.isLogin ? count : 0} overflowCount={99} style={{marginRight: -17}}>
                <Icon type="notification"/>
              </Badge>
            </li>
            <li>
              {this.props.isLogin ? login : notLogin}
            </li>
          </ul>
        </div>
        <Modal
          footer={null} closable={false}
          visible={visible}
          wrapClassName="vertical-center-modal"
          onCancel={() => this.setState({visible: false})}>
          <img src={avatar} alt="" width='100%'/>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    console.log(state)
    return ({
    count: state.common.count,
    isLogin: state.common.isLogin
})}

const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(ajaxLogout()),
    getCount: (userId) => dispatch(getMsgs(userId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderBar))