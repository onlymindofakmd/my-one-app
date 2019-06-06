import api from '../axios/api'
export function tick(data){
    return (dispatch, getState) => {
        dispatch({ type: 'timer', data:data })
    }
}

export function getServerTime(url){
    return (dispatch, getState) => {
        api.get(url).then((response)=>{
            console.log(response)
            const data = response.data
            if(data.success===0){
                console.log(data.data)
            }
            dispatch({
                type: 'server_time', data: data.data,
            });
        }).catch((err)=>{
            dispatch({
                type: 'server_time', data: "服务出错！",
            });
        })
    }
    
}