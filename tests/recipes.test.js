import { recipes, validIDs } from "../scripts/recipes.module"

test('recipes is object', () => {
    expect(typeof recipes).toBe('object')
})

test('valid IDs is list', () => {
    expect(typeof validIDs).toBe('object')
})

test('recipes contains ID', () => {
    expect(Object.keys(recipes)).toContain("inserter")
})

test('valid IDs contains ID', () => {
    expect(validIDs).toContain("inserter")
})