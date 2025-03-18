import {calculateIntermediaryDemand} from "../scripts/irptu-calculators.module"
import * as SampleDemand from "./demand-output-data"

test.only('Test proper intermediary demand calculation for simple input', () => {
    let demandOutput = {}
    calculateIntermediaryDemand("burner-inserter", 10, demandOutput)
    expect(demandOutput).toEqual(SampleDemand.simpleDemandOutput)
})

test.only('Test proper intermediary demand calculation for populated input', () => {
    let demandOutput = {}
    calculateIntermediaryDemand("long-handed-inserter", 10, demandOutput)
    expect(demandOutput).toEqual(SampleDemand.populatedDemandOutput)
})