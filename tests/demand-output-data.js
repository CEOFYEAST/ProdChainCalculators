export let simpleDemandOutput = {
    "iron-gear-wheel": {
        IRPTU: 10,
        dependencyItems: {
            "burner-inserter": 10
        }
    },
    "iron-plate": {
        IRPTU: 30,
        dependencyItems: {
            "burner-inserter": 10,
            "iron-gear-wheel": 20
        }
    },
    "iron-ore": {
        IRPTU: 30,
        dependencyItems: {
            "iron-plate": 30
        }
    }
}

export let populatedDemandOutput = {
    "inserter": {
        IRPTU: 10,
        dependencyItems: {
            "long-handed-inserter": 10
        }
    },
    "iron-gear-wheel": {
        IRPTU: 20,
        dependencyItems: {
            "long-handed-inserter": 10,
            "inserter": 10
        }
    },
    "electronic-circuit": {
        IRPTU: 10,
        dependencyItems: {
            "inserter": 10,
        }
    },
    "copper-cable": {
        IRPTU: 30,
        dependencyItems: {
            "electronic-circuit": 30
        }
    },
    "copper-plate": {
        IRPTU: 15,
        dependencyItems: {
            "copper-cable": 15
        }
    },
    "iron-plate": {
        IRPTU: 70,
        dependencyItems: {
           "electronic-circuit": 10,
            "iron-gear-wheel": 40,
            "inserter": 10,
            "long-handed-inserter": 10,
        }
    },
    "iron-ore": {
        IRPTU: 70,
        dependencyItems: {
            "iron-plate": 70
        }
    },
    "copper-ore": {
        IRPTU: 15,
        dependencyItems: {
            "copper-plate": 15
        }
    },
}