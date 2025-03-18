/**
 * @module recipes
 * @description Exposes the "recipes" (data on how to create each item) in recipes.json, and provides method/s for filtering said data
 * @author ceofyeast
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let src = path.dirname(
    fileURLToPath(path.dirname(import.meta.url))
)
let recipesPath = path.join(src, "/data/recipes.json")

const recipes = getJSON(recipesPath);
const validIDs = Object.keys(recipes);

function getJSON(jsonLoc) {
    return JSON.parse(fs.readFileSync(jsonLoc, 'utf8'));
}

export { recipes, validIDs };