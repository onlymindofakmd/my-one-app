import React from 'react'
import CustomMenu from "../CustomMenu/index";
import {connect} from 'react-redux'
import { initMenu } from '../../routes/common/action';

class SiderNav extends React.Component {
    componentWillMount(){
        this.props.initMenu()
    }

    render(){
        return (
            <div style={{height: '100vh',overflowY:'scroll'}}>
                <div style={styles.logo}></div>
                <CustomMenu menus={this.props.menus}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        menus : state.common.menus
    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        initMenu : (token) => dispatch(initMenu(token))
    })
}

const styles = {
    logo: {
      height: '32px',
      background: 'rgba(255, 255, 255, .2)',
      margin: '16px'
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SiderNav)