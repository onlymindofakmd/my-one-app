import axios from 'axios'
import QS from 'qs'
import { isAuthenticated } from '../utils/Session'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 10000;
//,"proxy" : "http://localhost:8080/"

export const request = (method, url, params) => {
    if(method === "get"){
        return get(url,params)
    }else{
        return post(url,params)
    }
}

const get = (url, params) => {
    return new Promise((resolve, reject) =>{
        axios({
            url:url,
            method:"get",
            data:params,
            auth: {
                username: 'client',
                password: 'secret'
            },
            
            // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            responseType: 'json'
        }).then(res =>{
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);
        })
    });
}

const post = (url, params) => {
    return new Promise((resolve, reject) => {
        params = Object.assign({}, params, {access_token:isAuthenticated()})
        axios({
            url:url,
            method:"post",
            data:QS.stringify(params),
            auth: {
                username: 'client',
                password: 'secret'
            },
            
            // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            responseType: 'json'
        }).then(res =>{
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);
        })
    })
}

axios.interceptors.request.use(
    config => {
    //    const token = isAuthenticated();
    //    console.log(" -=-=- =-= -= -= - =- = -= - =- = - =- = -=- =- = -= -= ")
    //    console.log(config)
    //    token && (config.data = QS.stringify(Object.assign({}, config.data, {access_token : token})));  
    //    console.log(config)
    //    console.log(" -=-=- =-= -= -= - =- = -= - =- = - =- = -=- =- = -= -= ")
       return config; 
    },
    error =>{
        return Promise.error(error); 
    }
)

axios.interceptors.response.use( 
    response => {
        console.log(response)
        if(response.status === 200){
            console.log("status : 200")
            if(response.data.success === 0){
                return Promise.resolve(response);
            }else if(response.data.success === 1){
                return Promise.reject(response);
            }else
                return Promise.resolve(response);
        }else{
            //这个地方可以由后台编辑状态码区分不同情况，做不同的逻辑处理
            return Promise.reject(response);
        }
    },
    error => {
        // //请求失败，这个地方可以根据error.response.status统一处理一些界面逻辑，比如status为401未登录,可以进行重定向
        // router.replace({      
        //     path: '/login',      
        //     query: { redirect: router.currentRoute.fullPath } 
        //    });

        return Promise.reject(error.response);  

    }
)