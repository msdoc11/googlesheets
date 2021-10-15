import axios from "axios";

import { domain, develop, build } from '../setting'

const axiosInstance = axios.create({
    timeout: 15000,
    baseURL: build ? `${domain}/api/` : `${develop}/api/`
})

axiosInstance.interceptors.request.use((conf) => {
    return conf
},
    error => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    response => response.data,
    (error) => {
      console.log("error", error?.response?.status)
    }
);

export default axiosInstance;