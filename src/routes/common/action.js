import {LOGINSUCCESS, LOGINFAIL, MSGCOUNT, MENUS} from '../../utils/actionTypes'
import {authenticateSuccess} from '../../utils/Session';
import {menus} from '../../utils/vRemote'

export const INIT_COMMON =  {isLogin:false,count:99,menus:[]}

export const getMsgs = (userId) => {
    return {type:MSGCOUNT, data:99}
}

export const initMenu = (userId) => {
    console.log(menus)
    return {type: MENUS, data:menus}
}

export function ajaxLogin(values,func){
    if("admin" === values.username && "admin"===values.password){
        authenticateSuccess(values.username)

        return {type:LOGINSUCCESS}
    }else{
        func({
            username: {
                value: values.username,
                errors: [new Error('用户名不存在')]
            }
        })
        return {type:LOGINFAIL}
    }
}

export const ajaxLogout =  () => {
    return {type:LOGINFAIL}
}

export const userInfo = (state=INIT_COMMON, action) => {
    switch(action.type){
        case LOGINSUCCESS:
            return Object.assign({},state,{isLogin:true})
        case LOGINFAIL:
            return Object.assign({},state,{isLogin:false})
        case MSGCOUNT:
            return Object.assign({},state,{count:action.data})
        case MENUS:
            return Object.assign({},state,{menus:action.data})
        default:
            return state
    }
}