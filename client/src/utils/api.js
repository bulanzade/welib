import axios from "axios"
import {Message} from "element-ui"

const _axios = axios.create(
    {
        baseURL: 'http://localhost:9000/api',
        withCredentials: true
    }
)

_axios.interceptors.request.use(config =>
    {
        return config
    }
    ,error =>
    {
        return Promise.reject(error)
    }
)

_axios.interceptors.response.use(res =>
    {
        return res
    }
    , error =>
    {
        if (error.response.status == 504 || error.response.status == 404)
        {
            Message.error({message: '服务器被吃了⊙﹏⊙∥'});
        }
        else if (error.response.status == 403)
        {
            Message.error({message: '权限不足,请联系管理员!'});
        }
        else if (error.response.status == 401)
        {
            Message.error({message: error.response.data.msg});
        }
        else
        {
            if (error.response.data.msg)
            {
                Message.error({message: error.response.data.msg});
            }
            else
            {
                Message.error({message: '未知错误!'});
            }
        }
        return error
    }
)

export { _axios }