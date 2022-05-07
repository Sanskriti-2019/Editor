const { default: axios } = require("axios")

const baseUrl = 'https://api.jdoodle.com/v1/execute'



axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("app_access_token");
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }


    config.headers['Content-Type']='application/json';
    return config;
},
    (error) => {
        Promise.reject(error);
    }
);


axios.interceptors.response.use((response) => {
    return response;
},

);



export const callSql = async (apiBody) => {
    const newUrl = `${baseUrl}`
    const res = await axios.post(newUrl, apiBody);
    return res;
}
