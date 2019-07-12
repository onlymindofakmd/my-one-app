import React from 'react'
import{Switch, withRouter} from 'react-router-dom'
import Hello from '../hello';
import MessageCenter from '../../routes/MessageCenter'
import UserInfo from '../../routes/user/UserInfo'
import PrivateRoute from '../PrivateRoute';

class ContentMain extends React.Component {
    render(){
        return (
            <div style={{padding: 16, position: 'relative'}}>
                <Switch>
                    <PrivateRoute exact path="/" component={Hello}/>
                    <PrivateRoute exact path="/home/back" component={MessageCenter}/>
                    <PrivateRoute exact path="/home/userinfo" component={UserInfo}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(ContentMain)