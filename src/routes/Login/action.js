import {LOGINBOX, REGISTERBOX, HASLOAD, LOADING} from '../../utils/actionTypes'

export function switchBox(box){
    console.log(box)
    if(box === 'login'){
        return {type:LOGINBOX,data:box}
    }else{
        return {type:REGISTERBOX,data:box}
    }
}

export function hasLoad(load){
    console.log('hasLoad---------------')
    if(load){
        return {type: LOADING}
    }else
        return {type: HASLOAD}
}

const INIT_STORE = {
    showBox:'login',
    loading: false,
    msg:"",
    target:'username'
}

export const login_reducer = (state=INIT_STORE, action) => {
    switch(action.type){
        case LOGINBOX:
            return Object.assign({},state,{showBox:action.data})
        case REGISTERBOX:
            return Object.assign({},state,{showBox:action.data})
        case HASLOAD:
            return Object.assign({},state,{loading:false})
        case LOADING:
            return Object.assign({},state,{loading:true})
        default:
            return state
    }
}