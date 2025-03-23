let baseURL = "http://localhost:3000"

let recipesRoute = "/recipes"

let axiosInstance = null

function setConfig(newConfig){
    if(newConfig.baseURL != undefined) baseURL = newConfig.baseURL
    if(newConfig.recipesRoute != undefined) recipesRoute = newConfig.recipesRoute
    if(newConfig.axiosInstance != undefined) axiosInstance = newConfig.axiosInstance
}

export {
    baseURL, recipesRoute, axiosInstance
}

export default setConfig

