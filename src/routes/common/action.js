import {LOGINSUCCESS, LOGINFAIL, MSGCOUNT, MENUS, USER} from '../../utils/actionTypes'
import {authenticateSuccess} from '../../utils/Session';
import {menus} from '../../utils/vRemote'
import {request} from '../../axios/api'

export const INIT_COMMON =  {isLogin:false,count:0,menus:[],token:"",user:{}}

export const getMsgs = () => {
    return (dispatch, getState) => {
        let params = {}
        request("post", "/getMessages", params).then(res=>{
            return dispatch({type:MSGCOUNT, data:99})
        }).catch(err=>{
            return dispatch({type:MSGCOUNT, data:99})
        })
    }
    
}

export const getUser = () => {
    return (dispatch, getState) => {
        let params = {}
        request("post", "/getUser", params).then(res=>{
            return dispatch({type:USER, data:res.data})
        }).catch(err=>{
            return dispatch({type:LOGINFAIL})
        })
    }
}

export const initMenu = () => {
    return (dispatch, getState) => {
        let params = {}
        request("post", "/getMenus", params).then(res => {
            return dispatch({type: MENUS, data:menus})
            //return {type: MENUS, data:res.data} //暂时先不做这个功能
        }).catch(err =>{
            return dispatch({type: MENUS, data:menus})
        })
    }
}

export function ajaxLogin(values,func){
    return (dispatch, getState) => {
        let params = {
            grant_type: "password",
            username:values.username,
            password:values.password
        }
        request("post", "/oauth/token",params).then(res => {
            authenticateSuccess(res.access_token)
            return dispatch({type:LOGINSUCCESS, data:res.access_token})
        }).catch(err =>{
            func({
                username: {
                    value: values.username,
                    errors: [new Error('用户名或密码错误')]
                }
            })
            return dispatch({type:LOGINFAIL})
        })
    }

}

export const ajaxLogout =  () => {
    return {type:LOGINFAIL}
}

export const userInfo = (state=INIT_COMMON, action) => {
    console.log(action)
    switch(action.type){
        case LOGINSUCCESS:
            return Object.assign({}, state, {isLogin:true,token:action.data})
        case LOGINFAIL:
            return Object.assign({}, state, {isLogin:false})
        case MSGCOUNT:
            return Object.assign({}, state, {count:action.data})
        case MENUS:
            return Object.assign({}, state, {menus:action.data})
        case USER:
            return Object.assign({}, state, {user:action.data, isLogin:true})
        default:
            return state
    }
}