/**
 * @module recipes
 * @description Exposes the "recipes" (data on how to create each item) in recipes.json, and provides method/s for filtering said data
 * @author ceofyeast
 */
import {baseURL, recipesRoute} from './config.module.js'

let recipes = null
recipes = await tryFetch();

export default recipes;

export async function tryFetch() {
    console.log("Fetching Recipes...")
    try {
        console.log("Base URL:" + baseURL)
        const response = await fetch(baseURL + recipesRoute, {
            method: "POST",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return null;
    }
}

