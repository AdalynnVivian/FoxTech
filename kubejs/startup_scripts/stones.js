// priority: 0

/* Create variants of the ores for every stone type in-game */
GTCEuStartupEvents.registry('gtceu:tag_prefix', event => {
    var ob0 = (m, b) =>
        event.create(b, 'ore')
        .stateSupplier(() => Block.getBlock(m+':'+b).defaultBlockState()) // 
        .baseModelLocation(m+":block/"+b+"_natural_0") // 
        .unificationEnabled(true)
        .materialIconType(GTMaterialIconType.ore)
        .generationCondition(ItemGenerationCondition.hasOreProperty)
        .miningToolTag('minecraft:mineable/pickaxe')
    var ob = (m, b, s) =>
        event.create(b, 'ore')
        .stateSupplier(() => Block.getBlock(m+':'+b).defaultBlockState()) // 
        .baseModelLocation(m+":block/"+b) // 
        .unificationEnabled(true)
        .materialIconType(GTMaterialIconType.ore)
        .generationCondition(ItemGenerationCondition.hasOreProperty)
        .miningToolTag('minecraft:mineable/pickaxe')
    var obp0 = (m, b, s) =>
        event.create(m+'_'+b, 'ore')
        .stateSupplier(() => Block.getBlock(m+':'+b).defaultBlockState()) // 
        .baseModelLocation(m+":block/"+b+"_natural_0") // 
        .unificationEnabled(true)
        .materialIconType(GTMaterialIconType.ore)
        .generationCondition(ItemGenerationCondition.hasOreProperty)
        .miningToolTag('minecraft:mineable/pickaxe')
    var obp = (m, b, s) =>
        event.create(m+'_'+b, 'ore')
        .stateSupplier(() => Block.getBlock(m+':'+b).defaultBlockState()) // 
        .baseModelLocation(m+":block/"+b) // 
        .unificationEnabled(true)
        .materialIconType(GTMaterialIconType.ore)
        .generationCondition(ItemGenerationCondition.hasOreProperty)
        .miningToolTag('minecraft:mineable/pickaxe')
    
    obp('ad_astra', 'moon_sand').miningToolTag('minecraft:mineable/shovel').isSand(true)
    obp('ad_astra', 'moon_stone')
    obp('ad_astra', 'mars_sand').miningToolTag('minecraft:mineable/shovel').isSand(true)
    obp('ad_astra', 'mars_stone')
    obp('ad_astra', 'venus_sand').miningToolTag('minecraft:mineable/shovel').isSand(true)
    obp('ad_astra', 'venus_sandstone')
    obp('ad_astra', 'venus_stone')
    obp('ad_astra', 'mercury_stone')
    obp('ad_astra', 'glacio_stone')
    obp('ad_astra', 'permafrost')

    ob('aether', 'holystone')

    obp('alexscaves', 'galena')
    obp('alexscaves', 'limestone')
    ob('alexscaves', 'radrock')
    ob('alexscaves', 'abyssmarine')
    ob('alexscaves', 'guanostone')
    ob('alexscaves', 'gingerbread_block')
    ob('alexscaves', 'block_of_chocolate')
    ob('alexscaves', 'cake_layer')

    ob('betterend', 'flavolite')
    ob('betterend', 'violecite')
    ob('betterend', 'sulphuric_rock')
    ob('betterend', 'virid_jadestone')
    ob('betterend', 'azure_jadestone')
    ob('betterend', 'sandy_jadestone')
    var m = 'betterend'
    var b = 'umbralith'
    event.create(b, 'ore')
        .stateSupplier(() => Block.getBlock(m+':'+b).defaultBlockState()) // 
        .baseModelLocation(m+":block/"+b+"_1") // 
        .unificationEnabled(true)
        .materialIconType(GTMaterialIconType.ore)
        .generationCondition(ItemGenerationCondition.hasOreProperty)
        .miningToolTag('minecraft:mineable/pickaxe')

    
    ob('botania', 'livingrock')
    ob('botania', 'metamorphic_desert_stone')
    ob('botania', 'metamorphic_forest_stone')
    ob('botania', 'metamorphic_fungal_stone')
    ob('botania', 'metamorphic_mesa_stone')
    ob('botania', 'metamorphic_mountain_stone')
    ob('botania', 'metamorphic_plains_stone')
    ob('botania', 'metamorphic_swamp_stone')
    ob('botania', 'metamorphic_taiga_stone')

    ob0('create', 'asurine')
    ob0('create', 'crimsite')
    obp('create', 'limestone')
    ob0('create', 'ochrum')
    ob('create', 'scorchia')
    ob('create', 'scoria')
    ob0('create', 'veridium')

    ob('geodes', 'pyrite')
    ob('geodes', 'gabbro')

    ob('minecraft', 'calcite')
    ob('minecraft', 'cobbled_deepslate')
    ob('minecraft', 'cobblestone')
    ob('minecraft', 'dripstone_block')
    ob('minecraft', 'smooth_basalt')
    ob('minecraft', 'terracotta')
    ob('minecraft', 'white_terracotta')
    ob('minecraft', 'light_gray_terracotta')
    ob('minecraft', 'gray_terracotta')
    ob('minecraft', 'black_terracotta')
    ob('minecraft', 'brown_terracotta')
    ob('minecraft', 'red_terracotta')
    ob('minecraft', 'orange_terracotta')
    ob('minecraft', 'yellow_terracotta')
    ob('minecraft', 'lime_terracotta')
    ob('minecraft', 'green_terracotta')
    ob('minecraft', 'cyan_terracotta')
    ob('minecraft', 'light_blue_terracotta')
    ob('minecraft', 'blue_terracotta')
    ob('minecraft', 'purple_terracotta')
    ob('minecraft', 'magenta_terracotta')
    ob('minecraft', 'pink_terracotta')

    obp('ad_extendra', 'ceres_sand').miningToolTag('minecraft:mineable/shovel').isSand(true)
    obp('ad_extendra', 'ceres_stone')
    obp('ad_extendra', 'jupiter_sand').miningToolTag('minecraft:mineable/shovel').isSand(true) //the fuck mate????
    obp('ad_extendra', 'jupiter_stone')
    obp('ad_extendra', 'saturn_sand').miningToolTag('minecraft:mineable/shovel').isSand(true) //the fuck mate????
    obp('ad_extendra', 'saturn_stone')
    obp('ad_extendra', 'uranus_stone') //the fuck mate????
    obp('ad_extendra', 'neptune_stone') //the fuck mate????
    obp('ad_extendra', 'orcus_stone')
    obp('ad_extendra', 'pluto_sand').miningToolTag('minecraft:mineable/shovel').isSand(true)
    obp('ad_extendra', 'pluto_stone')
    obp('ad_extendra', 'haumea_stone')
    obp('ad_extendra', 'quaoar_stone')
    obp('ad_extendra', 'makemake_stone')
    obp('ad_extendra', 'gonggong_stone')
    obp('ad_extendra', 'eris_stone')
    obp('ad_extendra', 'sedna_stone')
    obp('ad_extendra', 'b_sand').miningToolTag('minecraft:mineable/shovel').isSand(true)
    obp('ad_extendra', 'b_sandstone')
    obp('ad_extendra', 'b_stone')
    
    ob0('tfmg', 'bauxite')
    obp0('tfmg', 'galena')
    ob('tfmg', 'lignite')
    ob('tfmg', 'fireclay')

    ob('twigs', 'rhyolite')
    ob('twigs', 'schist')
    ob('twigs', 'silt').miningToolTag('minecraft:mineable/shovel').isSand(true)
    ob('twigs', 'bloodstone')

    obp('quark', 'limestone')
    ob('quark', 'jasper')
    ob('quark', 'shale')
    ob('quark', 'myalite')
    obp('quark', 'permafrost')
})