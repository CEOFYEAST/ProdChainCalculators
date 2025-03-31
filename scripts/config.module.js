let configChangedListeners = new Array()

let config = {
    baseURL: "http://localhost:3000",
    recipesRoute: "/recipes",
    axiosInstance: null,
    initialRecipesLoad: false,
    debugMode: true
}

if(config.debugMode) console.log("Config Module Running")

function handleConfigChanged(){
   // calls all config changed listeners
    if(config.debugMode) console.log("Calling all configChanged event listeners...")
    for(let i = 0; i < configChangedListeners.length; i++){
        configChangedListeners[i]();
    }
}

export default new Proxy(config, {
    set(obj, prop, value) {
        if (obj.hasOwnProperty(prop)){
            obj[prop] = value
            handleConfigChanged()
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

