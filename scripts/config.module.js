let configChangedListeners = new Array()

let config = {
    baseURL: "http://localhost:3000",
    recipesRoute: "/recipes",
    axiosInstance: null,
    initialRecipesLoad: false
}

export default new Proxy(config, {
    set(obj, prop, value) {
        if (obj.hasOwnProperty(prop)){
            obj[prop] = value

            // calls all config changed listeners
            for(let i = 0; i < configChangedListeners.length; i++){
                configChangedListeners[i]();
            }

            return true
        }

        return false
    },
    get(obj, prop, receiver){
        return obj[prop]
    }
})

export function addConfigChangedListener(listener){
    configChangedListeners.push(listener)
}

