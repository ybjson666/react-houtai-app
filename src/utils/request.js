import axios from 'axios';
import { message } from 'antd'

const isDev=process.env.NODE_ENV==='development';

const service=axios.create({
    baseURL:isDev ? 'http://rap2api.taobao.org/app/mock/234057':'',

})

service.interceptors.request.use((config)=>{
    config.data=Object.assign({},config.data,{
        // token:window.localStorage.getItem('token')
        token:'abcdefgjkl'
    })
    return config
})
service.interceptors.response.use((res)=>{
    if(res.data.code===200){
        return res.data.data
    }else{

        //全局处理

        message.error(res.data.errMsg)
    }
})

export default service;