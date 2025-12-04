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
            SAW LOG -> 6 PLANKS
            
            SAW LOG -> 6 V. PLANKS */
        event.shaped(
            Item.of(`quark:vertical_${material}_planks`, 6),
            ['sL'],
            {s: {tag: "forge:tools/saws"}, L: {tag: `minecraft:${material}_${log}s`}}
        ).id(`foxtech:vertical_${material}_planks`)

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
        event.recipes.gtceu.lathe(`foxtech:stripped_${material}_${log}_to_long_wood_rod`)
            .itemInputs(`1x minecraft:stripped_${material}_${log}`)
            .itemOutputs(`4x gtceu:long_wood_rod`, `1x gtceu:wood_dust`)
            .duration(8*20)
            .EUt(7)
            .circuit(1)

        event.recipes.gtceu.lathe(`foxtech:stripped_${material}_${log}_to_stripped_post`) 
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
            event.recipes.gtceu.lathe(`foxtech:stripped_${material}_${wood}_to_long_wood_rod`)
                .itemInputs(`1x minecraft:stripped_${material}_${wood}`)
                .itemOutputs(`4x gtceu:long_wood_rod`, `1x gtceu:wood_dust`)
                .duration(8*20)
                .EUt(7)
                .circuit(1)

            event.recipes.gtceu.lathe(`foxtech:stripped_${material}_${wood}_to_stripped_post`)
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

        /*  V.SLAB SHAPED
            SAW
            PLANK -> 2 V.SLABS */
        event.shaped(
            Item.of(`quark:${material}_vertical_slab`),
            ['s', 'P'],
            {s: {tag: "forge:tools/saws"}, P: {item: `minecraft:${material}_planks`}}
        ).id(`foxtech:saw_${material}_planks_to_vertical_slab`)

        /*  GT ASSEMBLER RECIPES 
        2)  2 Wooden Rods + 2 Slabs -> Taburet
        3)  3 Wooden Rods + 2 Slabs -> Chair
        4)  4 Planks -> Crafting Table
        4)  4 Wooden Rods + 2 Slabs -> Bar Stool
            4 Fence + 3 Slabs -> Table
            6 Planks + 3 Books -> Bookshelf
        7)  6 Wooden Rods + Planks -> Ladder
        7)  7 Slabs -> Composter
        8)  8 Planks -> Chest
        24) 7 Planks -> Barrel */
        var prefixQ = material == `oak` ? `minecraft:` : `quark:${material}_`
        var prefixC = material == `oak` ? `minecraft:` : `mctb:${material}_`
        var prefixF = material == `oak` ? `minecraft:` : `foxtech:${material}_`
        event.recipes.gtceu.assembler(`foxtech:${material}_taburet`)
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
            6 Planks + 2 Slabs -> 2 Barrels*/
        $.modern_industrialization.assembler(`foxtech:modern_industrialization/assembler/${material}_chest`,
            [`8x minecraft:${material}_planks`, `0% quark:${material}_chest`], [], 
            [`2x quark:${material}_chest`], [], 
            10*20, 8)
        $.modern_industrialization.assembler(`foxtech:modern_industrialization/assembler/${material}_barrel`,
            [`6x minecraft:${material}_planks`, `2x minecraft:${material}_slab`], [],
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
            Bookshelf -> 4 Planks + Sawdust + 3 Books [TODO]*/
        $.immersiveengineering.sawmill(`foxtech:immersiveengineering/sawmill/${material}_post`,
            `quark:${material}_post`, 1600,
            `minecraft:${material}_planks`, [`#forge:dusts/wood`],
            `quark:stripped_${material}_post`, [`#forge:dusts/wood`])
        if(material != `oak`) $.immersiveengineering.sawmill(`foxtech:immersiveengineering/sawmill/${material}_bookshelf`,
            `quark:${material}_bookshelf`, 1600,
            `4x minecraft:${material}_planks`, [`#forge:dusts/wood`, `3x minecraft:book`])

        /*  MEK SAWMILL RECIPES
            Bookshelf -> 6 Planks + 3 Books */
        if(material == 'oak') event.remove('mekanism:sawing/bookshelf')  
        $.mekanism.sawmill(`foxtech:mekanism/sawing/${material}_bookshelf`,
            `quark:${material}_bookshelf`,
            `6x quark:${material}_planks`, `3x minecraft:book`)          

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


        //  LOGS
        /*  SHAPED CRAFTING RECIPES
            SAW LOG -> 6 V. PLANKS */
        event.shaped(
            Item.of(`quark:vertical_${material}_planks`, 6),
            ['sL'],
            {s: {tag: "forge:tools/saws"}, L: {tag: `quark:${material}_${log}s`}}
        ).id(`foxtech:vertical_${material}_planks`)

        /*  CUTTING RECIPES
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

        /*  LATHING RECIPES
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

        /* MI CUTTING MACHINE RECIPES
            #Log -> 6 Wood */
        $.modern_industrialization.cutting_machine(`foxtech:modern_industrialization/cutting_machine/${material}_${log}`,
            `1x #quark:${material}_${log}s`,
            `6x quark:${material}_planks`,
            5*20, 2)

        /* PACKING RECIPES
            4 Log -> 3 Wood */
        if(wood != '')
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
        $.forestry.carpenter(`foxtech:forestry/carpenter/${material}_${log}`, "misc",
            ["LLL", "LLL", "LLL"], {"L": `quark:${material}_${log}`},
            `foxtech:crated_${material}_${log}`, 5)

        /*  FORESTRY FABRICATOR RECIPES
            Sand, Log - Refractory Wax - Log -> 2 Fireproof Log */
        $.forestry.fabricator(`foxtech:forestry/fabricator/fireproof_${material}_${log}`, "building",
            ["   ", "LRL", "   "], {"R": "forestry:refractory_wax", "L": `quark:${material}_${log}`},
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



        //  WOOD
        if(names.wood != '') {
            /*  LATHING RECIPES
            1)  Wood -> Stripped Wood + Wood Dust
            2)  ---------------------------------
            3)  Wood -> 2 Post */
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

            /*  MI CUTTING MACHINE RECIPES
                Wood -> Stripped Wood */
            $.modern_industrialization.cutting_machine(`foxtech:modern_industrialization/cutting_machine/${material}_${wood}`,
                `1x quark:${material}_${wood}`,
                `1x quark:stripped_${material}_${wood}`,
                5*20, 2)
            
            /*  CREATE SAWING RECIPES
                Wood -> Stripped Wood */
            //  DONE VIA CREATE COMPAT

            /*  FD CUTTING BOARD RECIPES
                Wood -> Stripped Wood + Bark */
            $.farmersdelight.stripping(`foxtech:farmersdelight/cutting/${material}_${wood}`,
                `quark:${material}_${wood}`,
                `quark:stripped_${material}_${wood}`)

            /*  FORSTRY FABRICATOR RECIPOES
                Wood - Refractory Wax - Wood -> 2 Fireproof Wood */
            $.forestry.fabricator(`foxtech:forestry/fabricator/fireproof_${material}_${wood}`, "building",
                ["   ", "WRW", "   "], {"R": "forestry:refractory_wax", "W": `quark:${material}_${wood}`},
                `2x foxtech:fireproof_${material}_${wood}`)
            
            /*  IE SAWMILL RECIPES
                Wood -> Stripped Wood + Sawdust -> 6 Planks + Sawdust */
            $.immersiveengineering.sawmill(`foxtech:immersiveengineering/sawmill/${material}_${wood}`,
                `quark:${material}_${wood}`, 16000,
                `6x quark:${material}_planks`, [`#forge:dusts/wood`],
                `quark:stripped_${material}_${wood}`, [`#forge:dusts/wood`])

        }
        /*  STRIPPED LOGS  */
        /*  GT ASSEMBLER RECIPES
            5)  6 Strippped Logs + 2 Chains -> 6 Hanging Signs */
        event.recipes.gtceu.assembler(`foxtech:${material}_hanging_sign`)
            .itemInputs(`6x quark:stripped_${material}_${log}`, `2x minecraft:chain`)
            .itemOutputs(`1x quark:${material}_hanging_sign`)
            .duration(5*20)
            .EUt(4)
            .circuit(5)

        /*  S.LOG LATHING RECIPES
        1)  Stripped Log -> 4 Long Wood Rod + Wood Dust 
        2)  -------------------------------------------
        3)  Stripped Log -> 2 Stripped Post */
        event.recipes.gtceu.lathe(`foxtech:stripped_${material}_${log}_to_long_wood_rod`)
            .itemInputs(`1x quark:stripped_${material}_${log}`)
            .itemOutputs(`4x gtceu:long_wood_rod`, `1x gtceu:wood_dust`)
            .duration(8*20)
            .EUt(7)
            .circuit(1)

        event.recipes.gtceu.lathe(`foxtech:stripped_${material}_${log}_to_stripped_post`) 
            .itemInputs(`1x quark:stripped_${material}_${log}`)
            .itemOutputs(`2x quark:stripped_${material}_post`)
            .duration(8*20)
            .EUt(7)
            .circuit(3)
        
        /*  MI PACKER RECIPES
            4 Stripped Logs -> 3 Stripped Wood */
        $.modern_industrialization.packer(`foxtech:modern_industrialization/packer/stripped_${material}_${log}`,
            [`4x quark:${material}_${log}`], [],
            [`3x quark:${material}_${wood}`], [],
            5*20, 2)

        /*  CREATE SAWING RECIPES
            Stripped Log -> 6 Planks */
        //  DONE VIA CREATE COMPAT
        
        /*  FORESTRY FABRICATOR RECIPES
            Stripped Log - Refractory Wax - Stripped Log -> Fireproof Stripped Log*/
        $.forestry.fabricator(`foxtech:forestry/fabricator/fireproof_stripped_${material}_${log}`, "building",
            ["   ", "LRL", "   "], {"R": "forestry:refractory_wax", "L": `quark:stripped_${material}_${log}`},
            `2x foxtech:fireproof_stripped_${material}_${log}`)

        /*  IE SAWMILL RECIPES
            Stripped Log -> 6 Planks + Sawdust */
        $.immersiveengineering.sawmill(`foxtech:immersiveengineering/sawmill/stripped_${material}_${log}`,
            `quark:stripped_${material}_${log}`, 800,
            `6x quark:${material}_planks`, [`#forge:dusts/wood`])

        /*  STRIPPED WOOD RECIPES  */
        if(names.wood != ``) {
            /*  LATHING RECIPES
            1)  Stripped Wood -> 4 Long Wood Rod + Wood Dust
            2)  --------------------------------------------
            3)  Stripped Wood -> 2 Stripped Post */
            event.recipes.gtceu.lathe(`foxtech:stripped_${material}_${wood}_to_long_wood_rod`)
                .itemInputs(`1x minecraft:stripped_${material}_${wood}`)
                .itemOutputs(`4x gtceu:long_wood_rod`, `1x gtceu:wood_dust`)
                .duration(8*20)
                .EUt(7)
                .circuit(1)

            event.recipes.gtceu.lathe(`foxtech:stripped_${material}_${wood}_to_stripped_post`)
                .itemInputs(`1x minecraft:stripped_${material}_${wood}`)
                .itemOutputs(`2x quark:stripped_${material}_post`)
                .duration(8*20)
                .EUt(7)
                .circuit(3)
            
            /*  CREATE SAWING RECIPES
                Stripped Wood -> 6 Planks */
            //  DONE VIA CREATE COMPAT

            /*  FORESTRY FABRICATOR RECIPES
                Stripped Wood - Refractory Wax - Stripped Wood -> Fireproof Stripped Wood */
            $.forestry.fabricator(`foxtech:forestry/fabricator/fireproof_stripped_${material}_${wood}`, "building",
                ["   ", "WRW", "   "], {"R": "forestry:refractory_wax", "W": `quark:stripped_${material}_${wood}`},
                `2x foxtech:fireproof_stripped_${material}_${wood}`)

            /*  IE SAWMILL RECIPES 
                Stripped Wood -> 6 Planks + Sawdust */
            $.immersiveengineering.sawmill(`foxtech:immersiveengineering/sawmill/stripped_${material}_${wood}`,
                `quark:stripped_${material}_${wood}`, 800,
                `6x quark:${material}_planks`, [`#forge:dusts/wood`])
        }

        //  PLANKS
        /*  SHAPED RECIPES 
            S
            P       -> 2 Vertical Slabs */
        event.shaped(
            Item.of(`quark:${material}_planks_vertical_slab`, 2),
            ['s', 'P'],
            {s: {tag: "forge:tools/saws"}, P: {item: `quark:${material}_planks`}}
        ).id(`foxtech:saw_${material}_planks_to_vertical_slab`)

        /*  PSP
            P P     
            PSP     -> Barrel           */
        event.shaped(
            `foxtech:${material}_barrel`,
            ['PSP', 'P P', 'PSP'],
            {P: {item:`quark:${material}_planks`}, S:{item:`quark:${material}_planks_slab`}}
        ).id(`foxtech:${material}_barrel`)
        /*   P
            PGP     -> 2 Windows        */
        event.shaped(
            `foxtech:${material}_window`,
            [' P ', 'PGP'], {P: {item: `quark:${material}_planks_slab`}, G: {tag: `forge:glass/colorless`}}
        ).id(`foxtech:${material}_window`)
        /*   SC
             PS
            S       -> Hexcasting Staff */
        event.shaped(
            `hexcasting:staff/${material}`,
            [' SC', ' PS', 'S  '], {S: {tag: `forge:rods/wooden`}, C: {item: `hexcasting:charged_amethyst`}, P: {item: `quark:${material}_planks`}}
        ).id(`foxtech:${material}_staff`)
        /*  PPP
            PCP
            PPP     -> 1x1 Drawer       */
        event.shaped(
            `foxtech:${material}_1`,
            ['PPP', 'PCP', 'PPP'], {C: {tag: `forge:chests/wooden`}, P: {item: `quark:${material}_planks`}}
        ).id(`foxtech:${material}_1`)
        /*  PCP
            PPP
            PCP     -> 1x2 Drawer       */
        event.shaped(
            `foxtech:${material}_2`,
            ['PCP', 'PPP', 'PCP'], {C: {tag: `forge:chests/wooden`}, P: {item: `quark:${material}_planks`}}
        ).id(`foxtech:${material}_2`)
        /*  CPC
            PPP
            CPC     -> 2x2 Drawer       */
        event.shaped(
            `foxtech:${material}_4`,
            ['CPC', 'PPP', 'CPC'], {C: {tag: `forge:chests/wooden`}, P: {item: `quark:${material}_planks`}}
        ).id(`foxtech:${material}_4`)
        
        /*  GT ASSEMBLER RECIPES
        2)  2 Planks + 2 Wooden Rods -> Fence Gate
        3)  6 Planks -> 4 Trapdoors
        4)  4 Planks -> Crafting Table
        6)  6 Planks -> 3 Doors
            6 Planks + 3 Books -> Bookshelf
        7)  6 Wooden Rods + Planks -> 4 Ladder
        7)  3 Planks -> 4 Stairs
        8)  8 Planks -> Chest
        13) Planks -> Fence
        15) 5 Planks -> Boat
        24) 7 Planks -> Barrel */
        event.recipes.gtceu.assembler(`foxtech:${material}_fence_gate`)
            .itemInputs(`2x quark:${material}_planks`, `2x #forge:rods/wooden`)
            .itemOutputs(`quark:${material}_fence_gate`)
            .duration(5*20).EUt(4).circuit(2)
        event.recipes.gtceu.assembler(`foxtech:${material}_trapdoor`)
            .itemInputs(`6x quark:${material}_planks`)
            .itemOutputs(`4x quark:${material}_trapdoor`)
            .duration(5*20).EUt(4).circuit(3)
        event.recipes.gtceu.assembler(`foxtech:${material}_crafting_table`)
            .itemInputs(`4x quark:${material}_planks`)
            .itemOutputs(`foxtech:${material}_crafting_table`)
            .duration(4*20).EUt(6).circuit(4)
        event.recipes.gtceu.assembler(`foxtech:${material}_door`)
            .itemInputs(`6x quark:${material}_planks`)
            .itemOutputs(`3x quark:${material}_door`)
            .duration(30*20).EUt(4).circuit(6)
        event.recipes.gtceu.assembler(`foxtech:${material}_bookshelf`)
            .itemInputs(`6x quark:${material}_planks`, `3x minecraft:books`)
            .itemOutputs(`quark:${material}_bookshelf`)
            .duration(5*20).EUt(4)
        event.recipes.gtceu.assembler(`foxtech:${material}_ladder`)
            .itemInputs(`6x #forge:rods/wooden`, `quark:${material}_planks`)
            .itemOutputs(`quark:${material}_ladder`)
            .duration(2*20).EUt(4).circuit(7)
        event.recipes.gtceu.assembler(`foxtech:${material}_stairs`)
            .itemInputs(`3x quark:${material}_planks`)
            .itemOutputs(`4x quark:${material}_stairs`)
            .duration(5*20).EUt(1).circuit(7)
        event.recipes.gtceu.assembler(`foxtech:${material}_chest`)
            .itemInputs(`8x quark:${material}_planks`)
            .itemOutputs(`quark:${material}_chest`)
            .duration(5*20).EUt(4).circuit(8)
        event.recipes.gtceu.assembler(`foxtech:${material}_fence`)
            .itemInputs(`quark:${material}_planks`)
            .itemOutputs(`quark:${material}_fence`)
            .duration(5*20).EUt(4).circuit(13)
        event.recipes.gtceu.assembler(`foxtech:${material}_boat`)
            .itemInputs(`5x quark:${material}_planks`)
            .itemOutputs(`quark:${material}_boat`)
            .duration(5*20).EUt(4).circuit(15)
        event.recipes.gtceu.assembler(`foxtech:${material}_barrel`)
            .itemInputs(`7x quark:${material}_planks`)
            .itemOutputs(`foxtech:${material}_barrel`)
            .duration(5*20).EUt(4).circuit(24)

        /*  GT CUTTER RECIPES 
        1)  Planks -> 2 Slabs
        2)  Planks -> 2 V.Slabs */
        cutter(`foxtech:gtceu/cutter/${material}_planks_to_slab`,
            [`1x quark:${material}_planks`],
            [`2x quark:${material}_planks_slab`],
            10*20, 4,
        1)
        cutter(`foxtech:gtceu/cutter/${material}_planks_to_vertical_slab`,
            [`1x quark:${material}_planks`],
            [`2x quark:${material}_planks_vertical_slab`],
            10*20, 4,
        2)

        /*  MI ASSEMBLER RECIPES
            6 Planks + 2 Slabs -> 2 Barrels
            8 Planks + Chest [NC] -> 2 Chests */
        $.modern_industrialization.assembler(`foxtech:modern_industrialization/assembler/${material}_chest`,
            [`8x quark:${material}_planks`, `0% quark:${material}_chest`], [], 
            [`2x quark:${material}_chest`], [], 
            10*20, 8)
        $.modern_industrialization.assembler(`foxtech:modern_industrialization/assembler/${material}_barrel`,
            [`6x quark:${material}_planks`, `2x quark:${material}_planks_slab`], [],
            [`2x foxtech:${material}_barrel`], [],
            10*20, 8
        )

        /*  MI CUTTING MACHINE RECIPES
            Planks -> 2 Slabs */
        $.modern_industrialization.cutting_machine(`foxtech:modern_industrialization/cutting_machine/${material}_planks`,
            `1x quark:${material}_planks`,
            `1x quark:${material}_planks_slab`,
            5*20, 2)

        /*  FORESTRY FABRICATOR RECIPES
            PPP
            PWP
            PPP   -> 8 Fireproof Planks */   
        $.forestry.fabricator(`foxtech:forestry/fabricator/fireproof_${material}_planks`, "building",
                ["PPP", "PRP", "PPP"], {"R": "forestry:refractory_wax", "P": `quark:${material}_planks`},
                `8x foxtech:fireproof_${material}_planks`)

        /*  IE SAWMILL RECIPES
            Planks -> 2 Slabs + Sawdust */ 
        $.immersiveengineering.sawmill(`foxtech:immersiveengineering/sawmill/${material}_planks`,
            `quark:${material}_planks`, 800,
            `2x quark:${material}_planks_slab`, [`#forge:dusts/wood`])

        /*  CHISELING
            TODO: CHISELING */

        //  SLABS
        /*  SHAPED RECIPES
            S S
            S S
            SSS - Composter */
        event.shaped(
            `foxtech:${material}_composter`,
            ['S S', 'S S', 'SSS'], {S: `quark:${material}_planks_slab`}
        ).id(`foxtech:${material}_composter`)
        /*  SS
            RR - Taburet */
        event.shaped(
            `foxtech:${material}_taburet`,
            ['SS', 'RR'], {S: `quark:${material}_planks_slab`, R: `#forge:rods/wooden`}
        ).id(`foxtech:${material}_taburet`)
        /*  SS
            RR
            RR - Bar Stool */
        event.shaped(
            `foxtech:${material}_bar_stool`,
            ['SS', 'RR', 'RR'], {S: `quark:${material}_planks_slab`, R: `#forge:rods/wooden`}
        ).id(`foxtech:${material}_bar_stool`)
        /*  R
            SS
            RR - Chair */
        event.shaped(
            `foxtech:${material}_chair`,
            [' R', 'SS', 'RR'], {S: `quark:${material}_planks_slab`, R: `#forge:rods/wooden`}
        ).id(`foxtech:${material}_chair`)
        /*  SSS
            F F
            F F - Table */
        event.shaped(
            `foxtech:${material}_bar_stool`,
            ['SSS', 'FF', 'RR'], {S: `quark:${material}_planks_slab`, F: `quark:${material}_fence`}
        ).id(`foxtech:${material}_bar_stool`)

        /*  GT ASSEMBLER RECIPES 
        2)  2 Wooden Rods + 2 Slabs -> Taburet
        3)  3 Wooden Rods + 2 Slabs -> Chair
        4)  4 Wooden Rods + 2 Slabs -> Bar Stool
            4 Fence + 3 Slabs -> Table */
        event.recipes.gtceu.assembler(`foxtech:${material}_taburet`)
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

        //  STAIRS  
        $.immersiveengineering.sawmill(`foxtech:immersiveengineering/sawmill/${material}_stairs`,
            `quark:${material}_planks_stairs`, 1600,
            `3x quark:${material}_planks`, [`#forge:dusts/wood`])
    }
    $.botania.alchemy('foxtech:botania/mana_infusion/cherry_log_to_ancient_log', 'minecraft:cherry_log', 'quark:ancient_log', 40, 'botania:log_cycle')
    quarkWood('ancient')
    $.botania.alchemy('foxtech:botania/mana_infusion/ancient_log_to_azalea_log', 'quark:ancient_log', 'quark:azalea_log', 40, 'botania:log_cycle')
    quarkWood('azalea')
    $.botania.alchemy('foxtech:botania/mana_infusion/azalea_log_to_blossom_log', 'quark:azalea_log', 'quark:blossom_log', 40, 'botania:log_cycle')
    quarkWood('blossom')

    event.forEachRecipe({id: 'gtceu:shaped/oak_planks_saw'}, r => {console.log(r.json.toString())})
})