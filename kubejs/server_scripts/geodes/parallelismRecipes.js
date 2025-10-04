
/* TODO: REWRITE TO INVOLVE TAGS ONCE TINKER'S IS COMPLETE */
ServerEvents.recipes(event => {
    function crystal(material, temp, time, result) {
        event.custom({ //Small Bud Melting
            type: "tconstruct:melting",
            ingredient: {
                tag: "forge:buds/" + material + "/small"
            },
            time: time,
            result: {
                fluid: result,
                amount: 100
            },
            temperature: temp
        })
        event.custom({ //Medium Bud Melting
            type: "tconstruct:melting",
            ingredient: {
                tag: "forge:buds/" + material + "/medium"
            },
            time: time*2,
            result: {
                fluid: result,
                amount: 200
            },
            temperature: temp
        })
        event.custom({ //Large Bud Melting
            type: "tconstruct:melting",
            ingredient: {
                "tag": "forge:buds/" + material + "/large"
            },
            time: time*3,
            result: {
                fluid: result,
                amount: 300
            },
            temperature: temp
        })
        event.custom({ //Cluster Melting
            type: "tconstruct:melting",
            ingredient: {
                tag: "forge:clusters/" + material
            },
            time: time*4,
            result: {
                fluid: result,
                amount: 400
            },
            temperature: temp
        })
        event.custom({ //Crystal Block Melting (4 gems... not 9.)
            type: "tconstruct:melting",
            ingredient: {
                tag: "forge:crystal_blocks/" + material
            },
            time: time*2,
            result: {
                fluid: result,
                amount: 400
            },
            temperature: temp
        })
        // Cutter - Lubricant
        // Cutter - Distilled Water
        // Cutter - Water
        // Forge Hammer
        // Macerator Recycling
    }
    crystal("emerald", 934, 64, "tconstruct:molten_emerald")
    crystal("quartz", 637, 55, "tconstruct:molten_quartz")
    crystal("diamond", 1450, 79, "tconstruct:molten_diamond")
})