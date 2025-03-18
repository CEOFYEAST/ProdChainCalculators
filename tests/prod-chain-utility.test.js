import {createProductionChain, getUserDemand, recalculateTimeUnit} from "../scripts/prod-chain-utility.module"
import * as SampleChains from "./prod-chain-data"
import {deepCopy} from "../scripts/helpers.module.js"
import { create } from "domain"

// Get User Demand Tests

    // VALID TESTS

test('Test user demand parse on simple production chain', () => {
    expect(getUserDemand(SampleChains.simpleProdChain["prodChain"])).toEqual(simpleParsedUserDemand)
})

test('Test user demand parse on populated production chain', () => {
    expect(getUserDemand(SampleChains.populatedProdChain["prodChain"])).toEqual(populatedParsedUserDemand)
})

// Recalculate Time Unit Tests

    // INVALID TESTS

test('Test invalid prod. chain input for recalculation throws exception', () => {
    expect(() => {
        recalculateTimeUnit({}, "minute")
    }).toThrow()
})

test('Test invalid time unit input for recalculation throws exeption', () => {
    expect(() => {
        recalculateTimeUnit(SampleChains.simpleProdChain, "bruh")
    }).toThrow()
})

    // VALID TESTS

test('Test valid simple prod. chain conversion to seconds', () => {
    let toTest = deepCopy(SampleChains.simpleProdChain)
    expect(recalculateTimeUnit(toTest, "minute", "second"))
        .toEqual(SampleChains.simpleProdChain_Seconds)
})

test('Test valid simple prod. chain conversion to hours', () => {
    let toTest = deepCopy(SampleChains.simpleProdChain)
    expect(recalculateTimeUnit(toTest, "minute", "hour"))
        .toEqual(SampleChains.simpleProdChain_Hours)
})

// Prod Chain Creation Tests

    // INVALID TESTS

test('Test invalid time unit input for creation throws exception', () => {
    expect(() => {
        createProductionChain("bruh")
    }).toThrow()
})

    // VALID TESTS

test('Test production chain creation', () => {
    expect(createProductionChain()).toEqual(SampleChains.emptyProdChain)
})

test('Test production chain creation w/ time unit', () => {
    expect(createProductionChain("second")).toEqual(SampleChains.emptyProdChain_Second)
})

// TEST DATA

let simpleParsedUserDemand = {
    "burner-inserter": 10
}

let populatedParsedUserDemand = {
    "long-handed-inserter": 20,
    "inserter": 10
}