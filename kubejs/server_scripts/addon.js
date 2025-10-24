function FoxTechAddon(event) {
    var resultObject = {};

    /* Hardcoded tags so we aren't iterating each time */
    resultObject.OXYGEN = ["ad_astra:oxygen", "gtceu:oxygen", "modern_industrialization:oxygen", "mekanism:oxygen"]
    resultObject.LUBRICANT = ["pneumaticcraft:lubricant", "modern_industrialization:lubricant", "gtceu:lubricant"]
    /* Tag-and-replace functions */
    resultObject.toTags = (tags, item) => tags.forEach(tag => event.add(tag, item))
    resultObject.toTag = (tag, items) => items.forEach(item => event.add(tag, item))
    resultObject.tagItems = (tags, items) => tags.forEach(tag => items.forEach(item => event.add(tag, item)))
    resultObject.replace = (i, o) => event.replaceInput({input: i}, i, '#' + o) //Because I know I'm going to forget the # like a dipshit
    resultObject.replaceAll = (is, o) => is.forEach((i) => resultObject.replace(i,o)) //TODO: MAKE REPLACEMENT SKIP CERTAIN RECIPES

    /* RECYCLING RECIPES */
    resultObject.toDust = (material, amount) => {
        var DICT = {}
        var M = material in DICT ? DICT[material] : material
        if(amount % 90 == 0) { //Dust
            return [["gtceu:" + M + "_dust", amount / 90]]
        } else if(amount % 22.5 == 0) { //Small dusts
            if(amount / 22.5 > 64) {
                return (amount / 22.5) % 4 == 0 ?
                    [["gtceu:" + M + "_dust", Math.floor(amount / 22.5 / 4)]] :
                    [["gtceu:" + M + "_dust", Math.floor(amount / 22.5 / 4)], ["gtceu:small_" + M + "_dust",  (amount / 22.5) % 4]]
            } else {
                return [["gtceu:small_" + M + "_dust", amount / 22.5]]
            }
        } else { //Tiny dusts
            amount =  amount - amount % 10 //Fit to small dust size
            if(amount / 10 > 64) {
                return (amount / 10) % 9 == 0 ?
                    [["gtceu:" + M + "_dust", Math.floor(amount / 10 / 9)]] :
                    [["gtceu:" + M + "_dust", Math.floor(amount / 10 / 9)], ["gtceu:tiny_" + M + "_dust",  (amount / 10) % 9]]
            } else {
                return [["gtceu:tiny_" + M + "_dust", amount / 10]]
            }
        }
    }
    resultObject.toFluid = (material, amount) => { //TiC amount not GT!!!
        var DICT = {"wood": "wood_gas"}
        var M = material in DICT ? DICT[material] : material
        return ["gtceu:" + M, amount]
    }
    resultObject.toIngot = (material, amount) => { //Nuggets gfdi. NUGGETS!!!
        var DICT = {"wood": "ash"}
        var NO_NUGS = {}
        var M = material in DICT ? DICT[material] : material

        if(amount % 90 == 0 || material in NO_NUGS) {
            amount = amount - amount % 90
            if(amount / 90 > 64) {
                return (amount / 90) % 9 == 0 ?
                    [["gtceu:" + M + "_block", amount / 90 / 9]] :
                    [["gtceu:" + M + "_block", amount / 90 / 9], ["gtceu:" + M + "_ingot", (amount / 90) % 9]]
            } else {
                return [["gtceu:" + M + "_ingot", amount / 90]]
            }
        } else {
            amount = amount - amount % 10
            if(amount / 10 > 64) {
                return (amount / 10) % 9 == 0 ?
                    [["gtceu:" + M + "_ingot", Math.floor(amount / 10 / 9)]] :
                    [["gtceu:" + M + "_ingot", Math.floor(amount / 10 / 9)], ["gtceu:" + M + "_nugget",  (amount / 10) % 9]]
            } else {
                return [["gtceu:" + M + "_nugget", amount / 10]]
            }
        }
    }
    resultObject.recycle = (itemId, products) => {
        var DICT = {
            "andesite_alloy": {dust: [1.9, 2], fluid: [3, 30], ingot: [1.9, 30, 38], temp: 0},
            "brass": {dust: [3.15, 2], fluid: [3.15, 30], ingot: [3.15, 30, 63], temp: 0},
            "wood": {dust: [5, 2], fluid: [1, 1], ingot: [0.6, 30, 12], temp: 0},
            "stone": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "granite": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "diorite": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "andesite": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "limestone": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "jasper": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "shale": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "myalite": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "permafrost": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "calcite": {dust: [7.5, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "deepslate": {dust: [7.5, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "clay": {dust: [0.75, 2], fluid: [1, 1], ingot: [1, 1, 1]},
            "ash": {dust: [5, 2], fluid: [5, 30], ingot: [0.6, 30, 12], temp: 0},
            "brick": {dust: [0.75, 2], fluid: [1, 1], ingot: [1, 1, 1]},
            "quartz_sand": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "soul_quartz_sand": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "dirt": {dust: [4.9, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "mud": {dust: [1, 1], fluid: [3, 30], ingot: [1, 1, 1], temp: 0},
            "prismarine": {dust: [7.5, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0},
            "dark_prismarine": {dust: [7.5, 2], fluid: [1, 1], ingot: [1, 1, 1], temp: 0}
        }
        var DURATION = 0
        var ENERGY = 1
        var OXYGEN = 2

        var GTmacerator = {time: 0, EUt: 0, outputs: []}
        var MImacerator = {time: 0, EUt: 0, outputs: []}
        var extractor = {time:0, EUt: 0, outputs: []}
        var foundry = {time:0, temp: 0, output: 'gtceu:air', byproducts: []}
        var arcFurnace = {time: 0, EUt: 0, oxygen: 0, outputs: []}

        for(var i = 0; i < products.length; i++) {
            var element = products[i]
            var material =  element.split(' ')[1]
            var amount = +element.split(' ')[0].replace('x', '')

            GTmacerator.time += Math.floor(amount/90)*DICT[material].dust[DURATION] + Math.floor((amount%90)/10)*Math.floor(DICT[material].dust[DURATION]/9)
            //MImacerator.time += 0
            extractor.time += Math.floor(amount/90)*DICT[material].fluid[DURATION] + Math.floor((amount%90)/10)*Math.floor(DICT[material].fluid[DURATION]/9)
            //foundry.time += 0
            arcFurnace.time += Math.floor(amount/90)*DICT[material].ingot[DURATION] + Math.floor((amount%90)/10)*Math.floor(DICT[material].ingot[DURATION]/9)

            GTmacerator.EUt = Math.max(GTmacerator.EUt, DICT[material].dust[ENERGY])
            //MImacerator.EUt = 
            extractor.EUt = Math.max(extractor.EUt, DICT[material].fluid[ENERGY])
            foundry.temp = Math.max(foundry.temp, DICT[material].temp)
            arcFurnace.EUt = Math.max(arcFurnace.EUt, DICT[material].ingot[ENERGY])

            arcFurnace.oxygen += Math.floor(amount/90)*DICT[material].ingot[OXYGEN] + Math.floor((amount%90)/10)*Math.floor(DICT[material].ingot[OXYGEN]/9)
        
            resultObject.toDust(material, amount).forEach(x => GTmacerator.outputs.push(x[1] + 'x ' + x[0]))
            // MImacerator
            var f = resultObject.toFluid(material, amount); extractor.outputs.push(Fluid.of(f[0], Math.floor(f[1]*8/5)))
            //Foundry
            resultObject.toIngot(material, amount).forEach(x => arcFurnace.outputs.push(x[1] + 'x ' + x[0]))
        }

        event.recipes.gtceu.macerator('foxtech:' + itemId.replace(':', '_').replace('#','').toLowerCase())
            .itemInputs(itemId)
            .itemOutputs(GTmacerator.outputs)
            .duration(GTmacerator.time * 20)
            .EUt(GTmacerator.EUt)
        // MImacerator
        event.recipes.gtceu.extractor('foxtech:' + itemId.replace(':', '_').replace('#','').toLowerCase())
            .itemInputs(itemId)
            .outputFluids(extractor.outputs)
            .duration(extractor.time * 20)
            .EUt(extractor.EUt)
        //Foundry
        for(var i in resultObject.OXYGEN)
        event.recipes.gtceu.arc_furnace('foxtech:' + itemId.replace(':', '_').replace('#','').toLowerCase() + '_' + resultObject.OXYGEN[i].split(':')[0])
            .itemInputs(itemId)
            .inputFluids(Fluid.of(resultObject.OXYGEN[i], arcFurnace.oxygen))
            .itemOutputs(arcFurnace.outputs)
            .duration(arcFurnace.time * 20)
            .EUt(arcFurnace.EUt)

    }


    /* BOTANIA */
    resultObject.botania = {}
    resultObject.botania.alchemy = (id, input, output, mana, group) => {
        var amount, right
        if(output.search(/[0-9]/) == 0) {
            amount = +output.split(' ')[0].replace('x', '')
            right = output.split(' ')[1]
        } else {
            amount = 1
            right = output
        }
        var json = {
            type: "botania:mana_infusion",
            catalyst: {type: "block", block: "alchemy_catalyst"},
            input: {item: input},
            mana: mana,
            output: {count: amount, item: right}
        }
        if(group != undefined) {
            json.group = group
        }
        event.custom(json).id(id)
    }

    /* GREGTECH COMMUNITY EDITION UNOFFICIAL */
    resultObject.gtceu = {}
    resultObject.gtceu.recipe = (type, category) => { //Fluid-tag compatible recipe constructor constructor
        category = category == undefined ? type : category
        return (id, itemIn, fluidIn, itemOut, fluidOut, duration, EUt, circuit) => {
            var json = {type: type, duration: duration, inputs: {
                    //Input items, input fluids, circuit
                }, outputs: {
                    //Output items, output fluids
                }, tickInputs: {
                    eu: [{content: EUt, chance: 10000.0, maxChance: 10000.0, tierChanceBoost: 0.0}]
                }, tickOutputs: {}, inputChanceLogics: {}, outputChanceLogics: {}, tickInputChanceLogics: {}, tickOutputChanceLogics: {},
                category: category
            }
            for(var i in itemIn) {
                if(i == 0) json.inputs.item = []
                
                var amount = +itemIn[i].split(' ')[0].replace('x', '')
                var right = itemIn[i].split(' ')[1]
                if(right[0] == '#') { //Tag
                    right = right.slice(1)
                    json.inputs.item.push({
                        content: {
                            type: 'gtceu:sized', count: amount, ingredient: {tag: right}
                        }, chance: 10000.0, maxChance: 10000.0, tierChanceBoost: 0.0
                    })
                } else {
                    json.inputs.item.push({
                        content: {
                            type: 'gtceu:sized', count: amount, ingredient: {item: right}
                        }, chance: 10000.0, maxChance: 10000.0, tierChanceBoost: 0.0
                    })
                }
            }
            for(var i in fluidIn) {
                if(i == 0) json.inputs.fluid = []
                
                var amount = +fluidIn[i].split(' ')[0].replace('x', '')
                var right = fluidIn[i].split(' ')[1]
                if(right[0] == '#') { //Tag
                    right = right.slice(1)
                    json.inputs.fluid.push({
                        content: {amount: amount, value: [{tag: right}]},
                        chance: 10000.0,
                        maxChance: 10000.0,
                        tierChanceBoost: 0.0
                    })
                } else {
                    json.inputs.fluid.push({
                        content: {amount: amount, value: [{fluid: right}]},
                        chance: 10000.0,
                        maxChance: 10000.0,
                        tierChanceBoost: 0.0
                    })
                }
            }
            for(var i in itemOut) {
                if(i == 0) json.outputs.item = []
                
                var amount = +itemOut[i].split(' ')[0].replace('x', '')
                var right = itemOut[i].split(' ')[1]
                if(right[0] == '#') { //Tag
                    right = right.slice(1)
                    json.outputs.item.push({
                        content: {
                            type: 'gtceu:sized', count: amount, ingredient: {tag: right}
                        }, chance: 10000.0, maxChance: 10000.0, tierChanceBoost: 0.0
                    })
                } else {
                    json.outputs.item.push({
                        content: {
                            type: 'gtceu:sized', count: amount, ingredient: {item: right}
                        }, chance: 10000.0, maxChance: 10000.0, tierChanceBoost: 0.0
                    })
                }
            }
            for(var i in fluidOut) {
                if(i == 0) json.outputs.fluid = []
                
                var amount = +fluidOut[i].split(' ')[0].replace('x', '')
                var right = fluidOut[i].split(' ')[1]
                if(right[0] == '#') { //Tag
                    right = right.slice(1)
                    json.outputs.fluid.push({
                        content: {amount: amount, value: [{tag: right}]},
                        chance: 10000.0,
                        maxChance: 10000.0,
                        tierChanceBoost: 0.0
                    })
                } else {
                    json.outputs.fluids.push({
                        content: {amount: amount, value: [{fluid: right}]},
                        chance: 10000.0,
                        maxChance: 10000.0,
                        tierChanceBoost: 0.0
                    })
                }
            }
            if (circuit != undefined) {
                json.inputs.item.push(
                    {content: {type: 'gtceu:circuit', configuration: circuit}, chance: 0.0, maxChance: 10000.0, tierChanceBoost: 0.0}
                )
            }
            event.custom(json)//.id(id)
        }
    }
    resultObject.gtceu.cutter = resultObject.gtceu.recipe('gtceu:cutter')

    /* MODERN INDUSTRIALIZATION */
    resultObject.modern_industrialization = {}
    resultObject.modern_industrialization.recipe = (type) => {
        return (id, itemIn, fluidIn, itemOut, fluidOut, duration, EUt, NC) => {
            console.log(itemIn)
            var json = {type: type, duration: duration, eu: EUt}
            for(var i in itemIn) {
                if(i == 0) json.item_inputs = []
                
                var amount = +itemIn[i].split(' ')[0].replace('x', '')
                var right = itemIn[i].split(' ')[1]
                if(right[0] == '#') { //Tag
                    right = right.slice(1)
                    json.item_inputs.push({amount: amount, tag: right})
                } else {
                    json.item_inputs.push({amount: amount, item: right})
                }
            }
            for(var i in fluidIn) {
                if(i == 0) json.fluid_inputs = []

                var amount = +fluidIn[i].split(' ')[0].replace('x', '')
                var right = fluidIn[i].split(' ')[1]
                json.fluid_inputs.push({amount: amount, fluid: right})
            }
            for(var i in itemOut) {
                if(i == 0) json.item_outputs = []

                var amount = +itemOut[i].split(' ')[0].replace('x', '')
                var right = itemOut[i].split(' ')[1]
                if(right[0] == '#') { //Tag
                    right = right.slice(1)
                    json.item_outputs.push({amount: amount, tag: right})
                } else {
                    json.item_outputs.push({amount: amount, item: right})
                }
            }
            for(var i in fluidOut) {
                if(i == 0) json.fluid_outputs = []

                var amount = +fluidOut[i].split(' ')[0].replace('x', '')
                var right = fluidOut[i].split(' ')[1]
                json.fluid_outputs.push({amount: amount, fluid: right})
            }

            if(NC != undefined) {
                if(json.item_inputs == undefined) json.item_inputs = []
                for(var i in NC) {
                    var amount = +NC[i].split(' ')[0].replace('x', '')
                    var right = NC[i].split(' ')[1]

                    if(right[0] == '#') { //Tag
                        right = right.slice(1)
                        json.item_inputs.push({amount: amount, tag: right, probability: 0})
                    } else {
                        json.item_inputs.push({amount: amount, item: right, probability: 0})
                    }
                }
            }
            event.custom(json).id(id)
        }
    }

    resultObject.modern_industrialization.assembler = resultObject.modern_industrialization.recipe("modern_industrialization:assembler")
    resultObject.modern_industrialization.packer = resultObject.modern_industrialization.recipe("modern_industrialization:packer")

    resultObject.modern_industrialization.cutting_machine = (id, input, output, duration) => resultObject.LUBRICANT.forEach(
        lube => resultObject.modern_industrialization.recipe('modern_industrialization:cutting_machine')(id+'__'+lube.split(':')[0], [input], ['1x ' + lube], [output], [], duration, 2)
    ) //Seet up different so we don't have to do lube shenanigans when calling it.
    
    /* NOTE: ALL MI fluid amounts may be handled differently, not just cutting machines! Check later */
    return resultObject
}

ServerEvents.recipes(event => {
    var $ = FoxTechAddon(event)
    $.recycle('create:flywheel', ['720x brass', '15x andesite_alloy'])
    $.recycle('create:cogwheel', ['270x wood', '15x andesite_alloy'])
})