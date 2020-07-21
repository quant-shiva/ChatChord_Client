import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:4000',
    headers: { 'Content-Type': 'application/json' }
});

http.interceptors.response.use(res=>{
    return res;
},err=>{
    if(err.response.status === 401){
        
    }
})

export default http;