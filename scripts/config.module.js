let config = {
    baseURL: "http://localhost:3000",
    recipesRoute: "/recipes",
    axiosInstance: null,
}

export default new Proxy(config, {

})

export {
    baseURL, recipesRoute, axiosInstance
}

