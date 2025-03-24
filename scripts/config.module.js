import {tryFetch} from "./recipes.module.js"

// // Revisit and test
// let configChangedListeners = new Array()
// configChangedListeners.push(tryFetch)

let config = {
    baseURL: "http://localhost:3000",
    recipesRoute: "/recipes",
    axiosInstance: null,
}

export default new Proxy(config, {
    set(obj, prop, value) {
        //if (obj.hasOwnProperty(prop)) {
        obj[prop] = value
        // for(let listener in configChangedListeners) listener();
        tryFetch()
        return true
        //}
    },
    get(obj, prop, receiver){
        return obj[prop]
    }
})

