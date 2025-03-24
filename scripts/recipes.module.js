/**
 * @module recipes
 * @description Exposes the "recipes" (data on how to create each item) in recipes.json, and provides method/s for filtering said data
 * @author ceofyeast
 */
import config from './config.module.js'

var recipes = null
tryFetch()

// makes recipes a live binding
export {recipes as default}

export async function tryFetch() {
    console.log("Fetching Recipes...")
    try {
        console.log("Base URL:" + config.baseURL)
        const response = await fetch(config.baseURL + config.recipesRoute, {
            method: "POST",
        });
        recipes = await response.json();

        console.log("Recipes: " + recipes)
    } catch (err) {
        console.log(err)
        console.log("Fetch failed @ base URL: " + config.baseURL)
    }
}

