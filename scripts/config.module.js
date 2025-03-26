// // Revisit and test
let configChangedListeners = new Array()

let config = {
    baseURL: "http://localhost:3000",
    recipesRoute: "/recipes",
    axiosInstance: null,
}

export default new Proxy(config, {
    set(obj, prop, value) {
        if (obj.hasOwnProperty(prop)){
            console.log("Config has value: " + prop)
            obj[prop] = value
            for(let i = 0; i < configChangedListeners.length; i++){
                console.log("(2) Config changed listener type " + typeof(configChangedListeners[i]))
                configChangedListeners[i]();
            }
            return true
        }
        console.log("Config does not have value: " + prop)
        return false
    },
    get(obj, prop, receiver){
        return obj[prop]
    }
})

export function addConfigChangedListener(listener){
    console.log("(1) Config changed listener type " + typeof(listener))
    configChangedListeners.push(listener)
}

