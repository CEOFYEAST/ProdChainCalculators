/**
 * @module recipes
 * @description Exposes the "recipes" (data on how to create each item) in recipes.json, and provides method/s for filtering said data
 * @author ceofyeast
 */
import config from './config.module.js'
import { addConfigChangedListener } from './config.module.js'

addConfigChangedListener(loadRecipes)

var recipes = null
if(config.devMode) await loadRecipes();

async function loadRecipes(){
    console.log("Loading Recipes...")
    if(config.axiosInstance == null || config.axiosInstance == undefined) await tryGenericFetchRecipes();
    else await tryAxiosFetchRecipes();
}

async function tryAxiosFetchRecipes(){
    console.log("Fetching Recipes Using Axios Fetch...")
    config.axiosInstance.post(config.recipesRoute)
    .then((response) => {
        console.log("Axios Recipes fetch succeeded");
        recipes = response.data;
    })
    .catch((err) => {
        console.log("Axios Recipes fetch failed @ axios instance: " + config.axiosInstance);
    })
}

async function tryGenericFetchRecipes() {
    console.log("Fetching Recipes Using Generic Fetch...")
    try {
        const response = await fetch(config.baseURL + config.recipesRoute, {
            method: "POST",
        });
        recipes = await response.json();
        console.log("Generic Recipes fetch succeeded")
    } catch (err) {
        console.log("Generic Recipes fetch failed @ base URL: " + config.baseURL)
    }
}

// makes recipes a live binding
export {recipes as default}


