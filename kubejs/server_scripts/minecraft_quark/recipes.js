// priority: 1

import FoxTechAddon from "../addon.js"

ServerEvents.recipes(event => {
    var $ = FoxTechAddon(event)

    function cutter(id, inputs, outputs, lubeDuration, c) { //Register cutting recipes.
        var FLUIDS = ['1x #forge:lubricant', '3x #forge:distilled_water', '4x minecraft:water']
        var NAMES = ['', '_distilled_water', '_water'] 
        for(var i in FLUIDS) {
            $.gtceu.cutter(id+NAMES[i], inputs, [FLUIDS[i]], outputs, [], (1+.5*i)*lubeDuration, 7, c)
        }
    }

    function vanillaWood(material, override) { //Create the recipes for vanilla wood types
        override = override == undefined ? {} : override
        var names = {log:'log', wood: 'wood' }
        for(var i in override) ids[i] = override[i]
        /*  LOG LATHING RECIPES
        1)  Log -> Stripped Log + Wood Dust
        2)  Log -> Hollow Log + Wood Dust
        3)  Log -> 2 Post */
        event.remove('gtceu:lathe/strip_' + material + '_' + names.log)
        event.recipes.gtceu.lathe('foxtech:stripped_' + material + '_' + names.log) 
            .itemInputs('1x minecraft:' + material + '_' + names.log)
            .itemOutputs('1x minecraft:stripped_' + material + '_' + names.log, '1x gtceu:wood_dust')
            .duration(8*20)
            .EUt(7)
            .circuit(1) 

        event.recipes.gtceu.lathe('foxtech:hollow_' + material + '_' + names.log)
            .itemInputs('1x minecraft:' + material + '_' + names.log)
            .itemOutputs('1x quark:hollow_' + material + '_' + names.log, '1x gtceu:wood_dust')
            .duration(8*20)
            .EUt(7)
            .circuit(2)

        event.recipes.gtceu.lathe('foxtech:' + material + '_post_from_'+ names.log)
            .itemInputs('1x minecraft:' + material + '_' + names.log)
            .itemOutputs('2x quark:' + material + '_post')
            .duration(8*20)
            .EUt(7)
            .circuit(3)

        /*  WOOD LATHING RECIPES
        1)  Wood -> Stripped Wood + Wood Dust
        2)  ---------------------------------
        3)  Wood -> 2 Posts */
        if(names.wood != '') {
            event.remove('gtceu:lathe/strip_' + material + '_' + names.wood)
            event.recipes.gtceu.lathe('foxtech:stripped_' + material + '_' + names.wood)
                .itemInputs('1x minecraft:' + material + '_' + names.wood)
                .itemOutputs('1x minecraft:stripped_' + material + '_' + names.wood, '1x gtceu:wood_dust')
                .duration(8*20)
                .EUt(7)
                .circuit(1)

            event.recipes.gtceu.lathe('foxtech:' + material + '_post_from_' + '_' + names.wood)
                .itemInputs('1x minecraft:' + material + '_' + names.wood)
                .itemOutputs('2x minecraft:stripped_' + material + '_post')
                .duration(8*20)
                .EUt(7)
                .circuit(3)

        }
        /*  LOG CUTTING RECIPES
        1)  Log -> 6 Planks + 2 Wood Dust
        2)  Log -> 6 V.Planks + 2 Wood Dust */
        event.remove('gtceu:cutter/' + material + '_planks_distilled_water')
        event.remove('gtceu:cutter/' + material + '_planks_water')
        event.remove('gtceu:cutter/' + material + '_planks')
        cutter('foxtech:' + material + '_planks', ['1x minecraft:'+ material + '_' + names.log], ['6x minecraft:' + material + '_planks', '2x gtceu:wood_dust'], 200, 1)
        cutter('foxtech:vertical_' + material + '_planks', ['1x minecraft:'+ material + '_' + names.log], ['6x quark:vertical_' + material + '_planks', '2x gtceu:wood_dust'], 200, 2)

        /*  POST LATHING RECIPES
        1)  Post -> Stripped Post + Wood Dust */
        event.recipes.gtceu.lathe('foxtech:stripped_' + material + '_post_from_post') //Quark stripped post from post
            .itemInputs('1x quark:' + material + '_post')
            .itemOutputs('1x quark:stripped_' + material + '_post', '1x gtceu:wood_dust')
            .duration(8*20)
            .EUt(7)
    
        /*  S.LOG LATHING RECIPES
        1)  Stripped Log -> 4 Long Wood Rod + Wood Dust */
        event.remove('gtceu:lathe/lathe_stripped_' + material + '_' + names.log)
        event.recipes.gtceu.lathe('foxtech:long_wood_rod_from_' + material + '_s' + names.log)
            .itemInputs('1x minecraft:stripped_' + material + '_' + names.log)
            .itemOutputs('4x gtceu:long_wood_rod', '1x gtceu:wood_dust')
            .duration(8*20)
            .EUt(7)
            .circuit(1)

        event.recipes.gtceu.lathe('foxtech:stripped_' + material + '_post_from_s' + names.log) 
            .itemInputs('1x minecraft:stripped_' + material + '_' + names.log)
            .itemOutputs('2x quark:stripped_' + material + '_post')
            .duration(8*20)
            .EUt(7)
            .circuit(3)

        /*  S.WOOD LATHING RECIPES
        1)  Stripped Wood -> 4 Long Wood Rod + Wood Dust */
        if(names.wood != '') {
            event.remove('gtceu:lathe/lathe_stripped_' + material + '_' + names.wood) 
            event.recipes.gtceu.lathe('foxtech:long_wood_rod_from_' + material + '_s' + names.wood)
                .itemInputs('1x minecraft:stripped_' + material + '_' + names.wood)
                .itemOutputs('4x gtceu:long_wood_rod', '1x gtceu:wood_dust')
                .duration(8*20)
                .EUt(7)
                .circuit(1)

            event.recipes.gtceu.lathe('foxtech:stripped_' + material + '_post_from_s' + names.wood)
                .itemInputs('1x minecraft:stripped_' + material + '_' + names.wood)
                .itemOutputs('2x quark:stripped_' + material + '_post')
                .duration(8*20)
                .EUt(7)
                .circuit(3)

        }
        /*  PLANKS CUTTING RECIPES
            1) Planks -> 2 Slabs
            2) Planks -> 2 V.Slabs */
        event.remove('gtceu:cutter/' + material + '_slab_distilled_water')
        event.remove('gtceu:cutter/' + material + '_slab_water')
        event.remove('gtceu:cutter/' + material + '_slab')
        cutter('foxtech:' + material + '_slab', ['1x minecraft:' + material + '_planks'], ['2x minecraft:' + material + '_slab'], 10*20, 1)
        cutter('foxtech:' + material + '_vertical_slab', ['1x minecraft:' + material + '_planks'], ['2x quark:' + material + '_vertical_slab'], 10*20, 2)

        /*  GT ASSEMBLER Recipes
        4)  4 Planks -> Crafting Table
            6 Planks + 3 Books -> Bookshelf
        7)  6 Wooden Rods + Plank -> Ladder
        7)  7 Slabs -> Composter [Awaiting ]
        8)  8 Planks -> Chest */
        var prefixQ = material == 'oak' ? 'minecraft:' : 'quark:' + material + '_'
        var prefixC = material == 'oak' ? 'minecraft:' : 'mctb:' + material + '_'
        var prefixF = material == 'oak' ? 'minecraft:' : 'foxtech:' + material + '_'
        event.recipes.gtceu.assembler('foxtech:' + material + '_chest')
            .itemInputs('8x minecraft:' + material + '_planks')
            .itemOutputs('quark:' +  material + '_chest')
            .duration(20*5)
            .EUt(4)
            .circuit(8)
        event.recipes.gtceu.assembler('foxtech:' + material +  '_ladder_q')
            .itemInputs('6x #forge:rods/wooden', '1x minecraft:' + material + '_planks')
            .itemOutputs('4x ' + prefixQ + 'ladder')
            .duration(20*2)
            .EUt(4)
            .circuit(7)
        event.recipes.gtceu.assembler('foxtech:' + material + '_crafting_table')
            .itemInputs('4x minecraft:' + material + '_planks')
            .itemOutputs('1x ' + prefixC + 'crafting_table')
            .duration(4*20)
            .EUt(6)
            .circuit(4)
        event.recipes.gtceu.assembler('foxtech:' + material + '_bookshelf')
            .itemInputs('6x minecraft:' + material + '_planks', '3x minecraft:book')
            .itemOutputs('1x ' + prefixQ + 'bookshelf')
            .duration(5*20)
            .EUt(4)
        /* TODO: BOOKSHELF */
        event.recipes.gtceu.assembler('betternether:' + material + '_chair')
            .itemInputs('2x minecraft:' + material + '_slab', '3x #forge:rods/wooden')
            .itemOutputs('1x betternether:' + material + '_chair')
            .duration(4*20)
            .EUt(5)
            .circuit(2)
        /* TODO: STOOL */
        /* TODO: BAR STOOL */
        /* TODO: TABLE */

        //MI Chest
        //Stripping Posts with MI
        //Stripping Posts with IE.
    }

    vanillaWood('oak')
    vanillaWood('spruce')
    vanillaWood('birch')
    vanillaWood('jungle')
    vanillaWood('acacia')
    vanillaWood('dark_oak')
    vanillaWood('mangrove')
    vanillaWood('cherry')

    event.remove('botania:mana_infusion/cherry_log_to_oak_log')
    function quarkWood(material) {

    }
    $.botania.alchemy('foxtech:cherry_log_to_ancient_log', 'minecraft:cherry_log', 'quark:ancient_log', 40, "botania:log_cycle")
    $.botania.alchemy('foxtech:ancient_log_to_azalea_log', 'quark:ancient_log', 'quark:azalea_log', 40, "botania:log_cycle")
    $.botania.alchemy('foxtech:azalea_log_to_blossom_log', 'quark:azalea_log', 'quark:blossom_log', 40, "botania:log_cycle")
})