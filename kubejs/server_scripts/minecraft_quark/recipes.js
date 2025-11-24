// priority: 1

import FoxTechAddon from "../addon.js"

ServerEvents.recipes(event => {
    var $ = FoxTechAddon(event)

    function cutter(id, inputs, outputs, lubeDuration, water, c) { //Register cutting recipes.
        var FLUIDS = [Math.floor(water/4)+'x #forge:lubricant', Math.floor(3*water/4)+'x #forge:distilled_water', water+'x minecraft:water']
        var NAMES = ['', '_distilled_water', '_water'] 
        for(var i in FLUIDS) {
            $.gtceu.cutter(id+NAMES[i], inputs, [FLUIDS[i]], outputs, [], (1+.5*i)*lubeDuration, 7, c)
        }
    }

    function vanillaWood(material, override) { //Create the recipes for vanilla wood types
        override = override == undefined ? {} : override
        var names = {log:'log', wood: 'wood'}
        for(var i in override) names[i] = override[i]
        
        var log = names.log
        var wood = names.wood
        /*  SHAPED CRAFTING RECIPES
            SAW
            LOG -> 6 PLANKS
            
            SAW LOG -> 6 V. PLANKS */

        /*  LOG LATHING RECIPES
        1)  Log -> Stripped Log + Wood Dust
        2)  Log -> Hollow Log + Wood Dust
        3)  Log -> 2 Post */
        event.remove(`gtceu:lathe/strip_${material}_${log}`)
        //event.recipes.gtceu.lathe(`foxtech:stripped_${material}_${log}`) 
        event.recipes.gtceu.lathe(`foxtech:${material}_${log}_to_stripped_${log}`)
            .itemInputs(`1x minecraft:${material}_${log}`)
            .itemOutputs(`1x minecraft:stripped_${material}_${log}`, `1x gtceu:wood_dust`)
            .duration(8*20)
            .EUt(7)
            .circuit(1) 

        //event.recipes.gtceu.lathe(`foxtech:hollow_${material}_${log}`)
        event.recipes.gtceu.lathe(`foxtech:${material}_${log}_to_hollow_${log}`)
            .itemInputs(`1x minecraft:${material}_${log}`)
            .itemOutputs(`1x quark:hollow_${material}_${log}`, `1x gtceu:wood_dust`)
            .duration(8*20)
            .EUt(7)
            .circuit(2)

        //event.recipes.gtceu.lathe(`foxtech:${material}_post_from_${log}`)
        event.recipes.gtceu.lathe(`foxtech:${material}_${log}_to_post`)
            .itemInputs(`1x minecraft:${material}_${log}`)
            .itemOutputs(`2x quark:${material}_post`)
            .duration(8*20)
            .EUt(7)
            .circuit(3)

        /*  WOOD LATHING RECIPES
        1)  Wood -> Stripped Wood + Wood Dust
        2)  ---------------------------------
        3)  Wood -> 2 Post */
        if(names.wood != '') {
            event.remove(`gtceu:lathe/strip_${material}_${wood}`)
            event.recipes.gtceu.lathe(`foxtech:${material}_${wood}_to_stripped_${wood}`)
                .itemInputs(`1x minecraft:${material}_${wood}`)
                .itemOutputs(`1x minecraft:stripped_${material}_${wood}`, `1x gtceu:wood_dust`)
                .duration(8*20)
                .EUt(7)
                .circuit(1)

            event.recipes.gtceu.lathe(`foxtech:${material}_${wood}_to_post`)
                .itemInputs(`1x minecraft:${material}_${wood}`)
                .itemOutputs(`2x quark:${material}_post`)
                .duration(8*20)
                .EUt(7)
                .circuit(3)

        }
        /*  LOG CUTTING RECIPES
        1)  Log -> 6 Planks + 2 Wood Dust
        2)  Log -> 6 V.Planks + 2 Wood Dust */
        event.remove(`gtceu:cutter/${material}_planks_distilled_water`)
        event.remove(`gtceu:cutter/${material}_planks_water`)
        event.remove(`gtceu:cutter/${material}_planks`)
        cutter(`foxtech:gtceu/cutter/${material}_${log}_to_planks`, 
            [`1x minecraft:${material}_${log}`], 
            [`6x minecraft:${material}_planks`, `2x gtceu:wood_dust`], 
            200, 4,
        1)
        cutter(`foxtech:gtceu/cutter/${material}_${log}_to_vertical_planks`, 
            [`1x minecraft:${material}_${log}`], 
            [`6x quark:vertical_${material}_planks`, `2x gtceu:wood_dust`],
            200, 4,
        2)

        /*  POST LATHING RECIPES
            Post -> Stripped Post + Wood Dust */
        event.recipes.gtceu.lathe(`foxtech:${material}_post`) //Quark stripped post from post
            .itemInputs(`1x quark:${material}_post`)
            .itemOutputs(`1x quark:stripped_${material}_post`, `1x gtceu:wood_dust`)
            .duration(8*20)
            .EUt(7)
    
        /*  S.LOG LATHING RECIPES
        1)  Stripped Log -> 4 Long Wood Rod + Wood Dust 
        2)  -------------------------------------------
        3)  Stripped Log -> 2 Stripped Post */
        event.remove(`gtceu:lathe/lathe_stripped_${material}_${log}`)
        event.recipes.gtceu.lathe(`foxtech:${material}_stripped_${log}_to_long_wood_rod`)
            .itemInputs(`1x minecraft:stripped_${material}_${log}`)
            .itemOutputs(`4x gtceu:long_wood_rod`, `1x gtceu:wood_dust`)
            .duration(8*20)
            .EUt(7)
            .circuit(1)

        event.recipes.gtceu.lathe(`foxtech:${material}_stripped_${log}_to_stripped_post`) 
            .itemInputs(`1x minecraft:stripped_${material}_${log}`)
            .itemOutputs(`2x quark:stripped_${material}_post`)
            .duration(8*20)
            .EUt(7)
            .circuit(3)

        /*  S.WOOD LATHING RECIPES
        1)  Stripped Wood -> 4 Long Wood Rod + Wood Dust
        2)  --------------------------------------------
        3)  Stripped Wood -> 2 Stripped Post */
        if(names.wood != ``) {
            event.remove(`gtceu:lathe/lathe_stripped_${material}_${wood}`) 
            event.recipes.gtceu.lathe(`foxtech:${material}_stripped_${wood}_to_long_wood_rod`)
                .itemInputs(`1x minecraft:stripped_${material}_${wood}`)
                .itemOutputs(`4x gtceu:long_wood_rod`, `1x gtceu:wood_dust`)
                .duration(8*20)
                .EUt(7)
                .circuit(1)

            event.recipes.gtceu.lathe(`foxtech:${material}_stripped_${wood}_to_stripped_post`)
                .itemInputs(`1x minecraft:stripped_${material}_${wood}`)
                .itemOutputs(`2x quark:stripped_${material}_post`)
                .duration(8*20)
                .EUt(7)
                .circuit(3)
        }

        /*  PLANKS CUTTING RECIPES
            1) Planks -> 2 Slabs
            2) Planks -> 2 V.Slabs */
        event.remove(`gtceu:cutter/${material}_slab_distilled_water`)
        event.remove(`gtceu:cutter/${material}_slab_water`)
        event.remove(`gtceu:cutter/${material}_slab`)
        cutter(`foxtech:gtceu/cutter/${material}_planks_to_slab`,
            [`1x minecraft:${material}_planks`],
            [`2x minecraft:${material}_slab`],
            10*20, 4,
        1)
        cutter(`foxtech:gtceu/cutter/${material}_planks_to_vertical_slab`,
            [`1x minecraft:${material}_planks`],
            [`2x quark:${material}_vertical_slab`],
            10*20, 4,
        2)

        /*  GT ASSEMBLER RECIPES 
        3)  2 Wooden Rods + 2 Slabs -> Stool
        4)  4 Planks -> Crafting Table
        4)  4 Wooden Rods + 2 Slabs -> Bar Stool
            4 Fence + 3 Slabs -> Table
            6 Planks + 3 Books -> Bookshelf
        7)  6 Wooden Rods + Planks -> Ladder
        7)  7 Slabs -> Composter [TODO]
        8)  8 Planks -> Chest
        24) 7 Planks -> Barrel [TODO] */
        var prefixQ = material == `oak` ? `minecraft:` : `quark:${material}_`
        var prefixC = material == `oak` ? `minecraft:` : `mctb:${material}_`
        var prefixF = material == `oak` ? `minecraft:` : `foxtech:${material}_`
        event.recipes.gtceu.assembler(`foxtech:${material}_stool`)
            .itemInputs(`2x #forge:rods/wooden`, `2x minecraft:${material}_slab`)
            .itemOutputs(`1x betternether:${material}_taburet`)
            .duration(4*20)
            .EUt(5)
            .circuit(2)
        event.recipes.gtceu.assembler(`foxtech:${material}_chair`)
            .itemInputs(`3x #forge:rods/wooden`, `2x minecraft:${material}_slab`)
            .itemOutputs(`1x betternether:${material}_chair`)
            .duration(4*20)
            .EUt(5)
            .circuit(3)
        event.recipes.gtceu.assembler(`foxtech:${material}_crafting_table`)
            .itemInputs(`4x minecraft:${material}_planks`)
            .itemOutputs(`1x ${prefixC}crafting_table`)
            .duration(4*20)
            .EUt(6)
            .circuit(4)
        event.recipes.gtceu.assembler(`foxtech:${material}_bar_stool`)
            .itemInputs(`4x #forge:rods/wooden`, `2x minecraft:${material}_slab`)
            .itemOutputs(`1x betternether:${material}_bar_stool`)
            .duration(4*20)
            .EUt(5)
            .circuit(4)
        event.recipes.gtceu.assembler(`foxtech:${material}_table`)
            .itemInputs(`4x minecraft:${material}_fence`, `3x minecraft:${material}_slab`)
            .itemOutputs(`1x twigs:${material}_table`)
            .duration(4*20)
            .EUt(5)
        event.recipes.gtceu.assembler(`foxtech:${material}_bookshelf`)
            .itemInputs(`6x minecraft:${material}_planks`, `3x minecraft:book`)
            .itemOutputs(`1x ${prefixQ}bookshelf`)
            .duration(5*20)
            .EUt(4)
        event.recipes.gtceu.assembler(`foxtech:${material}_ladder`)
            .itemInputs(`6x #forge:rods/wooden`, `1x minecraft:${material}_planks`)
            .itemOutputs(`4x ${prefixQ}ladder`)
            .duration(20*2)
            .EUt(4)
            .circuit(7)
        event.recipes.gtceu.assembler(`foxtech:${material}_composter`)
            .itemInputs(`7x minecraft:${material}_slab`)
            .itemOutputs(`1x ${prefixF}composter`)
            .duration(20*5)
            .EUt(30)
            .circuit(7)
        event.recipes.gtceu.assembler(`foxtech:${material}_chest`)
            .itemInputs(`8x minecraft:${material}_planks`)
            .itemOutputs(`quark:${material}_chest`)
            .duration(20*5)
            .EUt(4)
            .circuit(8)
        event.recipes.gtceu.assembler(`foxtech:${material}_barrel`)
            .itemInputs(`7x minecraft:${material}_planks`)
            .itemOutputs(`1x ${prefixF}barrel`)
            .duration(20*5)
            .EUt(4)
            .circuit(24)

        /*  MI ASSEMBLER RECIPES
            8 Planks + Chest [NC] -> 2 Chests 
            6 Planks + 2 Slabs -> 2 Barrels [TO DO]*/
        $.modern_industrialization.assembler(`foxtech:modern_industrialization/assembler/${material}_chest`,
            [`8x minecraft:${material}_planks`, `0% quark:${material}_chest`], [], 
            [`2x quark:${material}_chest`], [], 
            10*20, 8)
        $.modern_industrialization.assembler(`foxtech:modern_industrialization/assembler/${material}_barrel`,
            [`6x minecraft:${material}_planks`, `2x ${material}_slab`], [],
            [`2x ${prefixF}barrel`], [],
            10*20, 8
        )

        /*  MI CUTTING MACHINE RECIPES
            Post + $Lube -> Stripped Post */
        $.modern_industrialization.cutting_machine(`foxtech:modern_industrialization/cutting_machine/${material}_post`,
            `1x quark:${material}_post`,
            `1x quark:stripped_${material}_post`,
            5*20, 2) //Stripping Posts with MI

        /*  IE SAWMILL RECIPES
            Post -> Stripped Post + Sawdust -> Planks + Sawdust
            Bookshelf -> 4 Planks + Sawdust + 3 Books [TODO] */
        $.immersiveengineering.sawmill(`foxtech:immersiveengineering/sawmill/${material}_post`,
            `quark:${material}_post`, 16000,
            `minecraft:${material}_planks`, [`#forge:dusts/wood`],
            `quark:stripped_${material}_post`, [`#forge:dusts/wood`]) //Stripping Posts with IE.

        /*  FD CUTTING BOARD RECIPES
            Post -> Bark + Stripped Post */
        $.farmersdelight.stripping(`foxtech:farmersdelight/cutting/${material}_post`,
            `quark:${material}_post`,
            `quark:stripped_${material}_post`)

        /*  CREATE SAWING RECIPES
            Post -> Stripped Post */
        $.create.cutting(`foxtech:create/sawing/${material}_post`,
            `quark:${material}_post`,
            25,
            `quark:stripped_${material}_post`)

        /*  SHAPED CRAFTING RECIPES 
            S S          PSP
            S S          P P
            SSS          PSP 
         COMPOSTER      BARREL     */
         event.shaped(
            Item.of(`${prefixF}composter`, 1),
            ['S S', 'S S', 'SSS'],
            {S: `minecraft:${material}_slab`}
         ).id(`foxtech:${material}_composter`)
         event.shaped(
            Item.of(`${prefixF}barrel`, 1),
            ['PSP', 'P P', 'PSP'],
            {P: `minecraft:${material}_planks`, S: `minecraft:${material}_slab`}
         ).id(`foxtech:${material}_barrel`)
    }

    vanillaWood('oak')
    vanillaWood('spruce')
    vanillaWood('birch')
    vanillaWood('jungle')
    vanillaWood('acacia')
    vanillaWood('dark_oak')
    vanillaWood('mangrove')
    vanillaWood('cherry')
    $.modern_industrialization.packer('foxtech:modern_industrialization/packer/cherry_log', ['4x minecraft:cherry_log'], [], ['3x minecraft:cherry_wood'], [], 5*20, 2)

    event.remove('botania:mana_infusion/cherry_log_to_oak_log')
    function quarkWood(material, override) {
        override = override == undefined ? {} : override
        var names = {log:'log', wood: 'wood'}
        for(var i in override) names[i] = override[i]
 
        var log = names.log
        var wood = names.wood


        /*  SHAPED CRAFTING RECIPES
            SAW
            LOG -> 6 PLANKS
            
            SAW LOG -> 6 V. PLANKS */

        /*  LOG CUTTING RECIPES
        1)  Log -> 6 Planks + 2 Wood Dust
        2)  Log -> 6 V.Planks + 2 Wood Dust */
        cutter(`foxtech:gtceu/cutter/${material}_${log}_to_planks`,
            [`1x quark:${material}_${log}`],
            [`6x quark:${material}_planks`, `2x gtceu:wood_dust`],
            200, 4,
        1)
        cutter(`foxtech:gtceu/cutter/${material}_${log}_to_vertical_planks`,
            [`1x quark:${material}_${log}`],
            [`6x quark:vertical_${material}_planks`, `2x gtceu:wood_dust`],
            200, 4,
        2)

        /*  LOG LATHING RECIPES
        1)  Log -> Stripped Log + Wood Dust
        2)  Log -> Hollow Log + Wood Dust
        3)  Log -> 2 Post */
        event.recipes.gtceu.lathe(`foxtech:${material}_${log}_to_stripped_${log}`) 
            .itemInputs(`1x quark:${material}_${log}`)
            .itemOutputs(`1x quark:stripped_${material}_${log}`, `1x gtceu:wood_dust`)
            .duration(8*20)
            .EUt(7)
            .circuit(1) 

        event.recipes.gtceu.lathe(`foxtech:${material}_${log}_to_hollow_${log}`)
            .itemInputs(`1x quark:${material}_${log}`)
            .itemOutputs(`1x quark:hollow_${material}_${log}`, `1x gtceu:wood_dust`)
            .duration(8*20)
            .EUt(7)
            .circuit(2)

        event.recipes.gtceu.lathe(`foxtech:${material}_${log}_to_post`)
            .itemInputs(`1x quark:${material}_${log}`)
            .itemOutputs(`2x quark:${material}_post`)
            .duration(8*20)
            .EUt(7)
            .circuit(3)
            
        /* LOG PACKING RECIPES
            4 Log -> 3 Wood */
        $.modern_industrialization.packer(`foxtech:modern_industrialization/packer/${material}_${log}`,
            [`4x quark:${material}_${log}`], [],
            [`3x quark:${material}_${wood}`], [],
            5*20, 2)

        /*  STONECUTTING RECIPES
            Log -> Hollow Log */
        event.stonecutting(`quark:${material}_${log}`, `quark:hollow_${material}_${log}`).id(`foxtech:${material}_${log}`)

        /*  CREATE SAWING RECIPES 
            Log -> Stripped Log */
        //  DONE VIA CREATE COMPAT
        
        /*  FD CUTTING BOARD RECIPES
            Log -> Bark + Stripped Log */
        $.farmersdelight.stripping(`foxtech:farmersdelight/cutting/${material}_${log}`,
            `quark:${material}_${log}`,
            `quark:stripped_${material}_${log}`)
        
        /*  FORESTY CARPENTER RECIPES
            9x Log + Crate -> Crated Log */
        
        /*  FORESTRY FABRICATOR RECIPES
            Sand, Log - Refractory Wax - Log -> 2 Fireproof Log */
        $.forestry.fabricator(`foxtech:forestry/fabricator/fireproof_${material}_${log}`, "building",
            ["   ", "RLR", "   "], {"R": "forestry:refractory_wax", "L": `quark:${material}_${log}`},
            `2x foxtech:fireproof_${material}_${log}`)
        
        /*  IE SAWMILL RECIPES
            Log -> Stripped Log + Sawdust -> 6 Planks + Sawdust */
        $.immersiveengineering.sawmill(`foxtech:immersiveengineering/sawmill/${material}_${log}`,
            `quark:${material}_${log}`, 16000,
            `6x quark:${material}_planks`, [`#forge:dusts/wood`],
            `quark:stripped_${material}_${log}`, [`#forge:dusts/wood`]) //Stripping Posts with IE.

        /*  MEK PRECISION SAWMILL RECIPES
            #Log -> 6 Planks + 25% Sawdust */
        $.mekanism.sawmill(`foxtech:mekanism/sawing/${material}_${log}`,
            `#quark:${material}_${log}s`,
            `6x quark:${material}_planks`, `25% mekanism:sawdust`)
        
        /*  THERMAL SAWMILL
            #Log -> 6 Planks + Sawdust + 25% Chance Sawdust*/
        //  DONE VIA THERMAL COMPAT
        
        /*  ARBOREAL EXTRACTOR
            3 Leaves + 2 Logs -> 15mB Resin */
    }
    $.botania.alchemy('foxtech:botania/mana_infusion/cherry_log_to_ancient_log', 'minecraft:cherry_log', 'quark:ancient_log', 40, 'botania:log_cycle')
    quarkWood('ancient')
    $.botania.alchemy('foxtech:botania/mana_infusion/ancient_log_to_azalea_log', 'quark:ancient_log', 'quark:azalea_log', 40, 'botania:log_cycle')
    quarkWood('azalea')
    $.botania.alchemy('foxtech:botania/mana_infusion/azalea_log_to_blossom_log', 'quark:azalea_log', 'quark:blossom_log', 40, 'botania:log_cycle')
    quarkWood('blossom')
})