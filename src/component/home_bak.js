import React, { Component } from 'react';
import {connect} from 'react-redux'
import {tick, getServerTime} from '../redux/action'
import {Button} from 'antd'

class HomeBack extends Component {

    componentDidMount() {
        this.timerID = setInterval(
            this.props.tick,
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const date = this.props.date
        const servers = this.props.servers
        return (
            <div>
                <h1>Home</h1>
                <h2>现在是 {date.toLocaleTimeString()}</h2>
                <h2>服务器时间 {servers}</h2>
                <Button onClick={()=>this.props.serverTime('/webOnlineTreatment/test')}>系统时间</Button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        date : state.home.date,
        servers : state.home.servers
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        tick : () => dispatch(tick()),
        serverTime: (url) => dispatch(getServerTime(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeBack)
