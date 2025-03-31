/**
 * @module recipes
 * @description Exposes the "recipes" (data on how to create each item) in recipes.json, and provides method/s for filtering said data
 * @author ceofyeast
 */
import config from './config.module.js'
import { addConfigChangedListener } from './config.module.js'

if(config.debugMode) console.log("Recipes Module Running")

let recipesLoadedListeners = new Array()

addConfigChangedListener(loadRecipes)

var recipes = null
if(config.initialRecipesLoad) {
    if(config.debugMode) console.log("Performing initial recipes load")
    await loadRecipes();
}

async function loadRecipes(){
    if(config.debugMode) console.log("Loading Recipes...")
    if(config.axiosInstance == null || config.axiosInstance == undefined) await tryGenericFetchRecipes();
    else await tryAxiosFetchRecipes();
}

async function tryAxiosFetchRecipes(){
    if(config.debugMode) console.log("Fetching Recipes Using Axios Fetch @ Base URL: " + config.baseURL)
    config.axiosInstance.post(config.recipesRoute)
    .then((response) => {
        recipes = response.data;
        if(config.debugMode) console.log("Axios Recipes fetch succeeded");
        handleRecipesLoaded()
    })
    .catch((err) => {
        if(config.debugMode) console.log("Axios Recipes fetch failed @ axios instance: " + config.axiosInstance);
    })
}

async function tryGenericFetchRecipes() {
    if(config.debugMode) console.log("Fetching Recipes Using Generic Fetch @ Base URL: " + config.baseURL)
    try {
        const response = await fetch(config.baseURL + config.recipesRoute, {
            method: "POST",
        });
        recipes = await response.json();
        if(config.debugMode) console.log("Generic Recipes fetch succeeded")
        handleRecipesLoaded()
    } catch (err) {
        if(config.debugMode) console.log("Generic Recipes fetch failed @ base URL: " + config.baseURL)
    }
}

function handleRecipesLoaded(){
    // calls all recipes loaded listeners
    if(config.debugMode) console.log("Calling all recipesLoaded event listeners...")
    for(let i = 0; i < recipesLoadedListeners.length; i++){
        recipesLoadedListeners[i]();
    }
}

export function addRecipesLoadedListener(listener){
    recipesLoadedListeners.push(listener)
}

// makes recipes a live binding
export {recipes as default}


