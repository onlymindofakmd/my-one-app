import {login_reducer} from '../routes/Login/action'
import {userInfo} from '../routes/common/action'
import {system} from '../routes/System/action'
import {combineReducers} from 'redux'
const INIT_STORE = {
    date:new Date(),
    servers:''
}

const test = (state=INIT_STORE, action) => {
    console.log("test")
    console.log(state)
    switch(action.type){
        case 'timer':
            return Object.assign({},state,{home:Object.assign({},state.home,{date:new Date()})})
        case 'server_time':
            return Object.assign({},state,{home:Object.assign({},state.home,{servers:action.data})})
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    home: test,
    common:userInfo,
    login: login_reducer ,
    system
})
