import {getUserDemand, recalculateTimeUnit} from "../scripts/prod-chain-utility.module"
import * as SampleChains from "./prod-chain-data"
import {deepCopy} from "../scripts/helpers.module.js"

// GetUserDemand Tests

    // VALID TESTS

test('Test user demand parse on simple production chain', () => {
    expect(getUserDemand(SampleChains.simpleProdChain["prodChain"])).toEqual(simpleParsedUserDemand)
})

test('Test user demand parse on populated production chain', () => {
    expect(getUserDemand(SampleChains.populatedProdChain["prodChain"])).toEqual(populatedParsedUserDemand)
})

// RecalculateTimeUnit Tests

    // INVALID TESTS

test('Test invalid prod. chain input throws exception', () => {
    expect(() => {
        recalculateTimeUnit({}, "minute")
    }).toThrow()
})

test('Test invalid time unit input throws exeption', () => {
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

// TEST DATA

let simpleParsedUserDemand = {
    "burner-inserter": 10
}

let populatedParsedUserDemand = {
    "long-handed-inserter": 20,
    "inserter": 10
}