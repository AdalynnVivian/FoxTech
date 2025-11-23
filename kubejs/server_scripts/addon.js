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
    /* Ingredient parsing */
    function parseIngredient(ingredient) {
        var sections = ingredient.split(' ')
        var result = {amount: 1, chance: 1, chanceIncrement: 0}

        for(var i in sections) {
            var section = sections[i]
            if(section[section.length - 1] == '%') {  //Percentage
                section = section.slice(0, -1)
                if(section.search(/\+/) != -1) { //We have an increment
                    [result.chance, result.chanceIncrement] = section.split('+').map(x => +x / 100)
                } else { //No increment
                    result.chance = +section / 100
                }
            } else if(section.search(/[0-9]/) == 0) { //Amount
                result.amount = +section.replace('x', '')
            } else { //Material
                if(section[0] == '#') { //Tag
                    result.tag = section.slice(1)
                    result.isTag = true
                    result.obj = {tag: result.tag}
                    result.fluid = {tag: result.tag}
                } else { //Ingredient
                    result.ingredient = section
                    result.isTag = false
                    result.obj = {item: result.ingredient}
                    result.fluid = {fluid: result.ingredient}
                }
            }
        }
        return result
    }
    function addCount(count, obj) {
        if(count != 1) obj.count = count
        return obj
    }
    function glue(objA, objB) {
        var objR = {}
        for(var a in objA) {
            objR[a] = objA[a]
        }
        for(var b in objB) {
            objR[b] = objB[b]
        }
        return objR
    }

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
        var parsedInput = parseIngredient(input)
        var parsedOutput = parseIngredient(output)

        var json = {
            type: "botania:mana_infusion",
            catalyst: {type: "block", block: "botania:alchemy_catalyst"},
            input: addCount(parsedInput.amount, parsedInput.obj),
            mana: mana,
            output: addCount(parsedOutput.amount, parsedOutput.obj)
        }
        if(group != undefined) {
            json.group = group
        }
        event.custom(json).id(id)
    }

    /* CREATE */
    resultObject.create = {}
    resultObject.create.cutting = (id, input, processingTime, output) => {
        var parsedIn = parseIngredient(input)
        var parsedOut = parseIngredient(output)
        var f = (amount, obj) => {if(amount != 1) obj.count = amount; return obj;}

        var json = {type: "create:cutting",
            processingTime: processingTime}
        json.ingredients = [addCount(parsedIn.amount, parsedIn.obj)]
        json.results = [addCount(parsedOut.amount, parsedOut.obj)]
        event.custom(json).id(id)
    }

    /* FARMER'S DELIGHT */
    resultObject.farmersdelight = {}
    resultObject.farmersdelight.stripping = (id, input, output) => { //Only items for now
        var json  = {type: "farmersdelight:cutting", sound:"minecraft:item.axe.strip",
            tool:{type: "farmersdelight:tool_action",  action:"axe_strip"}}
        var parsedIn = parseIngredient(input)
        var parsedOut = parseIngredient(output)
        var f = (amount, obj) => {if(amount != 1) obj.count = amount; return obj;}
        json.ingredients = [addCount(parsedIn.amount, parsedIn.obj)]
        json.result = [
            addCount(parsedOut.amount, parsedOut.obj),
            {item: "farmersdelight:tree_bark"}
        ]
        event.custom(json).id(id)
    }

    /* FORESTRY */
    resultObject.forestry = {}
    resultObject.forestry.fabricator = (id, category, pattern, key, result) => {
        var json = {
            type: "forestry:fabricator",
            molten: {
                Amount: 500,
                FluidName: "forestry:glass"
            },
            plan: [],
            recipe: {
                type: "minecraft:crafting_shaped",
                category: category,
                pattern: pattern
            },
            show_notification: true
        }
        var parsedKey = {}
        for(var k in key) {
            var parsedK = parseIngredient(key[k])
            parsedKey[k] = parsedK.obj
        }
        json.recipe.key = parsedKey
        var parsedResult = parseIngredient(result)
        json.result = addCount(parsedResult.amount, parsedResult.obj)
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
                var obj = parseIngredient(itemIn[i])
                if(obj.isTag) { //Tag
                    json.inputs.item.push({
                        content: {
                            type: 'gtceu:sized', count: obj.amount, ingredient: {tag: obj.tag}
                        }, chance: obj.chance*10000,  maxChance: 10000.0, tierChanceBoost: obj.chanceIncrement*10000
                    })
                } else {
                    json.inputs.item.push({
                        content: {
                            type: 'gtceu:sized', count: obj.amount, ingredient: {item: obj.ingredient}
                        }, chance: obj.chance*10000, maxChance: 10000.0, tierChanceBoost: obj.chanceIncrement*10000
                    })
                }
            }
            for(var i in fluidIn) {
                if(i == 0) json.inputs.fluid = []
                var obj = parseIngredient(fluidIn[i])
                if(obj.isTag) { //Tag
                    json.inputs.fluid.push({
                        content: {amount: obj.amount, value: [{tag: obj.tag}]},
                        chance: obj.chance*10000, maxChance: 10000.0, tierChanceBoost: obj.chanceIncrement*10000

                    })
                } else {
                    json.inputs.fluid.push({
                        content: {amount: obj.amount, value: [{fluid: obj.ingredient}]},
                        chance: obj.chance*10000, maxChance: 10000.0, tierChanceBoost: obj.chanceIncrement*10000
                    })
                }
            }
            for(var i in itemOut) {
                if(i == 0) json.outputs.item = []
                var obj = parseIngredient(itemOut[i])
                if(obj.isTag) { //Tag
                    json.outputs.item.push({
                        content: {
                            type: 'gtceu:sized', count: obj.amount, ingredient: {tag: obj.tag}
                        }, chance: obj.chance*10000, maxChance: 10000.0, tierChanceBoost: obj.chanceIncrement*10000
                    })
                } else {
                    json.outputs.item.push({
                        content: {
                            type: 'gtceu:sized', count: obj.amount, ingredient: {item: obj.ingredient}
                        }, chance: obj.chance*10000,  maxChance: 10000.0, tierChanceBoost: obj.chanceIncrement*10000
                    })
                }
            }
            for(var i in fluidOut) {
                if(i == 0) json.outputs.fluid = []
                var obj = parseIngredient(fluidOut[i])
                if(obj.isTag) { //Tag
                    json.outputs.fluid.push({
                        content: {amount: obj.amount, value: [{tag: obj.tag}]},
                        chance: obj.chance*10000,  maxChance: 10000.0, tierChanceBoost: obj.chanceIncrement*10000
                    })
                } else {
                    json.outputs.fluids.push({
                        content: {amount: obj.amount, value: [{fluid: obj.ingredient}]},
                        chance: obj.chance*10000, maxChance: 10000.0, tierChanceBoost: obj.chanceIncrement*10000
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

    /* IMMERSIVE ENGINEERING */
    resultObject.immersiveengineering = {}
    resultObject.immersiveengineering.sawmill = (id, input, energy, out, outSecs, strip, stripSecs) => {
        var json = {type: "immersiveengineering:sawmill", energy: energy}
        var parsedInput = parseIngredient(input)
        var parsedOut = parseIngredient(out)
        json.input = addCount(parsedInput.amount, parsedInput.obj)
        json.result = addCount(parsedOut.amount, parsedOut.obj)

        if(outSecs != undefined) for(var i in outSecs) {
            if(json.secondaries == undefined) json.secondaries = []
            var outSec = parseIngredient(outSecs[i])
            json.secondaries.push({
                output: addCount(outSec.amount, outSec.obj),
                stripping: false
            })
        }

        if(strip != undefined) {
            var parsedStrip = parseIngredient(strip)
            json.stripped = addCount(parsedStrip.amount, parsedStrip.obj)
        }

        if(stripSecs != undefined) for(var i in stripSecs) {
            if(json.secondaries == undefined) json.secondaries = []
            var stripSec = parseIngredient(stripSecs[i])
            json.secondaries.push({
                output: addCount(stripSec.amount, stripSec.obj),
                stripping: true
            })
        }

        event.custom(json).id(id)
    }

    /* MEKANISM */
    resultObject.mekanism = {}
    resultObject.mekanism.sawmill = (id, input, output, secondary) => {
        var json = {
            type: "mekanism:sawing"
        }
        var parsedIn = parseIngredient(input)
        var parsedOut = parseIngredient(output)
        var parsedSec = secondary == undefined ? undefined : parseIngredient(secondary)
        son.input = {ingredient: addCount(parsedIn.amount, parsedIn.obj)}
        json.mainOutput = addCount(parsedOut.amount, parsedOut.obj)

        if(parsedSec != undefined) {
            json.secondaryChance = parsedSec.chance
            json.secondaryOutput = addCount(parsedSec.amount, parsedSec.obj)
        }
        event.custom(json).id(id)
    } 

    /* MODERN INDUSTRIALIZATION */
    resultObject.modern_industrialization = {}
    resultObject.modern_industrialization.recipe = (type) => {
        return (id, itemIn, fluidIn, itemOut, fluidOut, duration, EUt) => {
            var json = {type: type, duration: duration, eu: EUt}
            for(var i in itemIn) {
                if(i == 0) json.item_inputs = []
                var obj = parseIngredient(itemIn[i])
                if(obj.isTag) { //Tag
                    json.item_inputs.push({amount: obj.amount, tag: obj.tag, probability: obj.chance})
                } else {
                    json.item_inputs.push({amount: obj.amount, item: obj.ingredient, probability: obj.chance})
                }
            }
            for(var i in fluidIn) {
                if(i == 0) json.fluid_inputs = []
                var obj = parseIngredient(fluidIn[i])
                json.fluid_inputs.push({amount: obj.amount, fluid: obj.ingredient, probability: obj.chance})
            }
            for(var i in itemOut) {
                if(i == 0) json.item_outputs = []
                var obj = parseIngredient(itemOut[i])
                if(obj.isTag) { //Tag
                    json.item_outputs.push({amount: obj.amount, tag: obj.tag, probability: obj.chance})
                } else {
                    json.item_outputs.push({amount: obj.amount, item: obj.ingredient, probability: obj.chance})
                }
            }
            for(var i in fluidOut) {
                if(i == 0) json.fluid_outputs = []
                var obj = parseIngredient(fluidOut[i])
                json.fluid_outputs.push({amount: obj.amount, fluid: obj.ingredient, probability: obj.chance})
            }
            event.custom(json).id(id)
        }
    }
    resultObject.modern_industrialization.assembler = resultObject.modern_industrialization.recipe("modern_industrialization:assembler")
    resultObject.modern_industrialization.packer = resultObject.modern_industrialization.recipe("modern_industrialization:packer")
    resultObject.modern_industrialization.cutting_machine = (id, input, output, duration) => resultObject.LUBRICANT.forEach(
        lube => resultObject.modern_industrialization.recipe('modern_industrialization:cutting_machine')(id+'__'+lube.split(':')[0], [input], ['1x ' + lube], [output], [], duration, 2)
    ) //Set up different so we don't have to do lube shenanigans when calling it.
    return resultObject
}

ServerEvents.recipes(event => {
    var $ = FoxTechAddon(event)
    $.recycle('create:flywheel', ['720x brass', '15x andesite_alloy'])
    $.recycle('create:cogwheel', ['270x wood', '15x andesite_alloy'])
})