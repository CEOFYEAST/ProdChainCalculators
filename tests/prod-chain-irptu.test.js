import {addIRPTU, subtractIRPTU} from "../scripts/prod-chain-irptu.module"
import * as SampleChains from "./prod-chain-data"
import {deepCopy} from "../scripts/helpers.module.js"

// INVALID TESTS

    // ID TESTS

test('Test invalid addition ID throws exception', () => {
    expect(() => {
        addIRPTU("invalid-id", 10, SampleChains.emptyProdChain)
    }).toThrow()
})

test('Test invalid subtraction ID throws exception', () => {
    expect(() => {
        subtractIRPTU("invalid-id", 10, SampleChains.emptyProdChain)
    }).toThrow()
})

    // PROD. CHAIN OBJECT TESTS

test('Test empty prod. chain input throws exception', () => {
    expect(() => {
        addIRPTU("burner-inserter", 5, {})
    }).toThrow()
})

test('Test empty prod. chain data input throws exception', () => {
    expect(() => {
        addIRPTU("burner-inserter", 5, SampleChains.invalidProdChain_NoProdChain)
    }).toThrow()

    expect(() => {
        subtractIRPTU("burner-inserter", 5, SampleChains.invalidProdChain_NoProdChain)
    }).toThrow()
})

test('Test empty prod. chain time unit input throws exception', () => {
    expect(() => {
        addIRPTU("burner-inserter", 5, SampleChains.invalidProdChain_NoTimeUnit)
    }).toThrow()

    expect(() => {
        subtractIRPTU("burner-inserter", 5, SampleChains.invalidProdChain_NoProdChain)
    }).toThrow()
})

    // SUBMISSION AMOUNT TESTS

test('Test invalid addition amount throws exception', () => {
    expect(() => {
        addIRPTU("burner-inserter", 0, SampleChains.emptyProdChain)
    }).toThrow()

    expect(() => {
        addIRPTU("burner-inserter", -1, SampleChains.emptyProdChain)
    }).toThrow()
})

test('Test invalid subtraction amount throws exception', () => {
    expect(() => {
        subtractIRPTU("burner-inserter", 0, SampleChains.emptyProdChain)
    }).toThrow()

    expect(() => {
        subtractIRPTU("burner-inserter", -1, SampleChains.emptyProdChain)
    }).toThrow()

    expect(() => {
        subtractIRPTU("burner-inserter", 5, SampleChains.emptyProdChain)
    }).toThrow()

    expect(() => {
        subtractIRPTU("burner-inserter", 15, SampleChains.simpleProdChain)
    }).toThrow()
})

// VALID TESTS

    // IRPTU ADDITION - EMPTY INITIAL CHAIN TESTS

test('Test full prod. chain output after IRPTU addition, and empty initial chain', () => {
    expect(addIRPTU("burner-inserter", 10, deepCopy(SampleChains.emptyProdChain))).toEqual(SampleChains.simpleProdChain)
})

test('Test user demand output after IRPTU addition, and empty initial chain', () => {
    expect(addIRPTU("burner-inserter", 10, deepCopy(SampleChains.emptyProdChain))).toMatchObject(SampleChains.simpleUserDemand)
})

test('Test interm. demand output after IRPTU addition, and empty initial chain', () => {
    expect(addIRPTU("burner-inserter", 10, deepCopy(SampleChains.emptyProdChain))).toMatchObject(SampleChains.simpleIntermDemand)
})

    // IRPTU ADDITION - POPULATED INITIAL CHAIN TESTS

test('Test full prod. chain output after IRPTU addition, and populated initial chain', () => {
    let popChain = addIRPTU("inserter", 10, deepCopy(SampleChains.emptyProdChain))
    expect(addIRPTU("long-handed-inserter", 20, popChain)).toEqual(SampleChains.populatedProdChain)
})

test('Test user demand output after IRPTU addition, and populated initial chain', () => {
    let popChain = addIRPTU("inserter", 10, deepCopy(SampleChains.emptyProdChain))
    expect(addIRPTU("long-handed-inserter", 20, popChain)).toMatchObject(SampleChains.popUserDemand)
})

test('Test interm. demand output after IRPTU addition, and populated initial chain', () => {
    let popChain = addIRPTU("inserter", 10, deepCopy(SampleChains.emptyProdChain))
    expect(addIRPTU("long-handed-inserter", 20, popChain)).toMatchObject(SampleChains.popIntermDemand)
})

    // IRPTU SUBTRACTION

test('Test empty prod. chain output after full IRPTU subtraction', () => {
    let popChain = addIRPTU("burner-inserter", 10, deepCopy(SampleChains.emptyProdChain))
    expect(subtractIRPTU("burner-inserter", 10, popChain)).toEqual(SampleChains.emptyProdChain)
})

test('Test partial prod. chain output after partial IRPTU subtraction', () => {
    let popChain = addIRPTU("burner-inserter", 10, deepCopy(SampleChains.emptyProdChain))
    expect(subtractIRPTU("burner-inserter", 5, popChain)).toEqual(SampleChains.partialProdChain)
})


