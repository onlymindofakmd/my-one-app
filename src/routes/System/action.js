import api from '../../axios/api'
import {SYSTEMSUCCESS, SYSTEMERROR} from '../../utils/actionTypes'

const INIT_SYSTEM_INFO = {baseInfo:{}, mem:{}, cpus:[], disks:{}, success:0}
const INIT_SYSTEM_ERR = {baseInfo:{}, mem:{}, cpus:[], disks:{}, success:1}

export const initSystemInfo =  (url) => {
    return (dispatch, getState) => {
        api.get(url).then((response)=>{
            console.log(response)
            const data = response.data
            if(data.success===0){
                console.log(data.data)
            }
            dispatch({
                type: SYSTEMSUCCESS, data: data.data,
            });
        }).catch((err)=>{
            console.log(err)
            dispatch({
                type: SYSTEMERROR, data: INIT_SYSTEM_ERR
            });
        })
    }
}

export const system = (state=INIT_SYSTEM_INFO, action) => {
    switch(action.type){
        case SYSTEMSUCCESS:
            return Object.assign({},state,action.data)
        case SYSTEMERROR:
            return Object.assign({},state,action.data)
        default:
            return state
    }
}