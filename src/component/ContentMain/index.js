import React from 'react'
import{Switch, withRouter} from 'react-router-dom'
import Hello from '../hello';
import System from '../../routes/System'
import PrivateRoute from '../PrivateRoute';

class ContentMain extends React.Component {
    render(){
        return (
            <div style={{padding: 16, position: 'relative'}}>
                <Switch>
                    <PrivateRoute exact path="/" component={Hello}/>
                    <PrivateRoute exact path="/home/back" component={System}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(ContentMain)