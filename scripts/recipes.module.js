/**
 * @module recipes
 * @description Exposes the "recipes" (data on how to create each item) in recipes.json, and provides method/s for filtering said data
 * @author ceofyeast
 */
import config from './config.module.js'
import { addConfigChangedListener } from './config.module.js'

addConfigChangedListener(tryFetch)

var recipes = null
await tryFetch()

async function tryFetch() {
    console.log("Fetching Recipes...")
    try {
        console.log("Base URL:" + config.baseURL)
        const response = await fetch(config.baseURL + config.recipesRoute, {
            method: "POST",
        });
        recipes = await response.json();

        console.log("Recipes fetch succeeded")
    } catch (err) {
        console.log("Recipes fetch failed @ base URL: " + config.baseURL)
    }
}

// makes recipes a live binding
export {recipes as default}


