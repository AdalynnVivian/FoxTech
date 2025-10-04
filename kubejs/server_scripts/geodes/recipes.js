
/* TODO: REWRITE TO INVOLVE TAGS ONCE TINKER'S IS COMPLETE */
ServerEvents.recipes(event => {
    var replace = (i, o) => event.replaceInput({input: i}, i, '#' + o) //Because I know I'm going to forget the # like a dipshit
    var replaceAll = (is, o) => is.forEach((i) => replace(i,o)) //TODO: MAKE REPLACEMENT SKIP CERTAIN RECIPES

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
    }
    crystal("emerald", 934, 64, "tconstruct:molten_emerald")
    crystal("quartz", 637, 55, "tconstruct:molten_quartz")
    crystal("diamond", 1450, 79, "tconstruct:molten_diamond")

    replace("geodes:gypsum_shard", "forge:gems/gypsum")
    replace("geodes:pyrite_chunk", "forge:raw_materials/pyrite")
    replace("geodes:pyrite", "forge:storage_blocks/gypsum")
})