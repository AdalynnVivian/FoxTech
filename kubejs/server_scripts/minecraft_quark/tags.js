import FoxTechAddon from "../addon.js"

ServerEvents.tags('item', event => {
    var $ = FoxTechAddon(event)

    /* STONE */
    $.toTags(['forge:normal_stone', 'foxtech:blocks', 'foxtech:blocks/stone'], ['minecraft:stone', 'minecraft:cobblestone', 'minecraft:mossy_cobblestone',
        'quark:cobblestone_bricks', 'quark:mossy_cobblestone_bricks', 'minecraft:smooth_stone',
        'minecraft:stone_bricks', 'minecraft:cracked_stone_bricks', 'minecraft:chiseled_stone_bricks',
        'minecraft:mossy_stone_bricks'])
    $.toTags(['minecraft:stairs', 'foxtech:stairs/stone'], ['minecraft:stone_stairs', 'minecraft:cobblestone_stairs', 'minecraft:cobblestone_bricks_stairs', 
        'minecraft:mossy_cobblestone_stairs', 'quark:mossy_cobblestone_bricks_stairs', 'minecraft:stone_bricks_stairs',
        'minecraft:mossy_stone_bricks_stairs'])
    $.toTags(['minecraft:slabs', 'foxtech:slabs/stone'], ['minecraft:stone_slab', 'minecraft:cobblestone_slab', 'quark:cobblestone_bricks_slab',
        'minecraft:mossy_cobblestone_slab', 'quark:mossy_cobblestone_bricks_slab', 'minecraft:smooth_stone_slab',
        'minecraft:stone_brick_slab', 'minecraft:mossy_stone_brick_slab'])
    $.toTags(['quark:vertical_slabs', 'foxtech:vertical_slabs/stone'], ['quark:stone_vertical_slab', 'quark:cobblestone_vertical_slab', 'quark:cobblestone_bricks_vertical_slab',
        'quark:mossy_cobblestone_vertical_slab', 'quark:mossy_cobblestone_bricks_vertical_slab', 'quark:smooth_stone_vertical_slab',
        'quark:stone_brick_vertical_slab', 'quark:mossy_stone_brick_vertical_slab'])
    $.toTags(['minecraft:walls', 'foxtech:walls/normal_stone'], ['minecraft:cobblestone_wall', 'quark:cobblestone_bricks_wall', 'minecraft:mossy_cobblestone_wall',
        'quark:mossy_cobblestone_bricks_wall', 'minecraft:stone_brick_wall', 'minecraft:mossy_stone_brick_wall'])
    /* GRANITE */
    $.toTag('foxtech:blocks/granite', ['minecraft:granite', 'minecraft:polished_granite', 'quark:granite_bricks',
        'quark:chiseled_granite_bricks', 'quark:granite_pillar'])
    $.toTag('foxtech:stairs/granite', ['minecraft:granite_stairs', 'minecraft:polished_granite_stairs', 'quark:granite_bricks_stairs'])
    $.toTag('foxtech:slabs/granite', ['minecraft:granite_slab', 'quark:granite_bricks_slab', 'minecraft:polished_granite_slab'])
    $.toTag('foxtech:vertical_slabs/granite', ['quark:granite_vertical_slab', 'quark:granite_bricks_vertical_slab', 'quark:polished_granite_vertical_slab'])
    $.toTag('foxtech:walls/granite', ['minecraft:granite_wall', 'quark:granite_bricks_wall'])
    /* DIORITE */
    $.toTag('foxtech:blocks/diorite', ['minecraft:diorite', 'minecraft:polished_diorite', 'quark:diorite_bricks',
        'quark:chiseled_diorite_bricks', 'quark:diorite_pillar'])
    $.toTag('foxtech:stairs/diorite', ['minecraft:diorite_stairs', 'minecraft:polished_diorite_stairs', 'quark:diorite_bricks_stairs'])
    $.toTag('foxtech:slabs/diorite', ['minecraft:diorite_slab', 'quark:diorite_bricks_slab', 'minecraft:polished_diorite_slab'])
    $.toTag('foxtech:vertical_slabs/diorite', ['quark:diorite_vertical_slab', 'quark:diorite_bricks_vertical_slab', 'quark:polished_diorite_vertical_slab'])
    $.toTag('foxtech:walls/diorite', ['minecraft:diorite_wall', 'quark:diorite_bricks_wall'])
    /* ANDESITE */
    $.toTag('foxtech:blocks/andesite', ['minecraft:andesite', 'minecraft:polished_andesite', 'quark:andesite_bricks',
        'quark:chiseled_andesite_bricks', 'quark:andesite_pillar'])
    $.toTag('foxtech:stairs/andesite', ['minecraft:andesite_stairs', 'minecraft:polished_andesite_stairs', 'quark:andesite_bricks_stairs'])
    $.toTag('foxtech:slabs/andesite', ['minecraft:andesite_slab', 'quark:andesite_bricks_slab', 'minecraft:polished_andesite_slab'])
    $.toTag('foxtech:vertical_slabs/andesite', ['quark:andesite_vertical_slab', 'quark:andesite_bricks_vertical_slab', 'quark:polished_andesite_vertical_slab'])
    $.toTag('foxtech:walls/andesite', ['minecraft:andesite_wall', 'quark:andesite_bricks_wall'])
    /* LIMESTONE */
    $.toTag('foxtech:blocks/limestone', ['quark:limestone', 'quark:polished_limestone', 'quark:limestone_bricks',
        'quark:chiseled_limestone_bricks', 'quark:limestone_pillar'])
    $.toTag('foxtech:stairs/limestone', ['quark:limestone_stairs', 'quark:polished_limestone_stairs', 'quark:limestone_bricks_stairs'])
    $.toTag('foxtech:slabs/limestone', ['quark:limestone_slab', 'quark:limestone_bricks_slab', 'quark:polished_limestone_slab'])
    $.toTag('foxtech:vertical_slabs/limestone', ['quark:limestone_vertical_slab', 'quark:limestone_bricks_vertical_slab', 'quark:polished_limestone_vertical_slab'])
    $.toTag('foxtech:walls/limestone', ['quark:limestone_wall', 'quark:limestone_bricks_wall'])
    /* JASPER */
    $.toTag('foxtech:blocks/jasper', ['quark:jasper', 'quark:polished_jasper', 'quark:jasper_bricks',
        'quark:chiseled_jasper_bricks', 'quark:jasper_pillar'])
    $.toTag('foxtech:stairs/jasper', ['quark:jasper_stairs', 'quark:polished_jasper_stairs', 'quark:jasper_bricks_stairs'])
    $.toTag('foxtech:slabs/jasper', ['quark:jasper_slab', 'quark:jasper_bricks_slab', 'quark:polished_jasper_slab'])
    $.toTag('foxtech:vertical_slabs/jasper', ['quark:jasper_vertical_slab', 'quark:jasper_bricks_vertical_slab', 'quark:polished_jasper_vertical_slab'])
    $.toTag('foxtech:walls/jasper', ['quark:jasper_wall', 'quark:jasper_bricks_wall'])
    /* SHALE */
    $.toTag('foxtech:blocks/shale', ['quark:shale', 'quark:polished_shale', 'quark:shale_bricks',
        'quark:chiseled_shale_bricks', 'quark:shale_pillar'])
    $.toTag('foxtech:stairs/shale', ['quark:shale_stairs', 'quark:polished_shale_stairs', 'quark:shale_bricks_stairs'])
    $.toTag('foxtech:slabs/shale', ['quark:shale_slab', 'quark:shale_bricks_slab', 'quark:polished_shale_slab'])
    $.toTag('foxtech:vertical_slabs/shale', ['quark:shale_vertical_slab', 'quark:shale_bricks_vertical_slab', 'quark:polished_shale_vertical_slab'])
    $.toTag('foxtech:walls/shale', ['quark:shale_wall', 'quark:shale_bricks_wall'])
    /* MYALITE */
    $.toTag('foxtech:blocks/myalite', ['quark:myalite', 'quark:polished_myalite', 'quark:myalite_bricks',
        'quark:chiseled_myalite_bricks', 'quark:myalite_pillar'])
    $.toTag('foxtech:stairs/myalite', ['quark:myalite_stairs', 'quark:polished_myalite_stairs', 'quark:myalite_bricks_stairs'])
    $.toTag('foxtech:slabs/myalite', ['quark:myalite_slab', 'quark:myalite_bricks_slab', 'quark:polished_myalite_slab'])
    $.toTag('foxtech:vertical_slabs/myalite', ['quark:myalite_vertical_slab', 'quark:myalite_bricks_vertical_slab', 'quark:polished_myalite_vertical_slab'])
    $.toTag('foxtech:walls/myalite', ['quark:myalite_wall', 'quark:myalite_bricks_wall'])
    /* PERMAFROST */
    $.toTag('foxtech:blocks/permafrost', ['quark:permafrost', 'quark:permafrost_bricks'])
    $.toTag('foxtech:stairs/permafrost', ['quark:permafrost_stairs', 'quark:permafrost_bricks_stairs'])
    $.toTag('foxtech:slabs/permafrost', ['quark:permafrost_slab', 'quark:permafrost_bricks_slab'])
    $.toTag('foxtech:vertical_slabs/permafrost', ['quark:permafrost_vertical_slab', 'quark:permafrost_vertical_bricks_slab'])
    $.toTag('foxtech:walls/permafrost', ['quark:permafrost_wall', 'quark:permafrost_bricks_wall'])
    /* CALCITE */
    $.toTag('foxtech:blocks/calcite', ['minecraft:calcite', 'quark:polished_calcite', 'quark:calcite_bricks',
        'quark:chiseled_calcite_bricks', 'quark:calcite_pillar'])
    $.toTag('foxtech:stairs/calcite', ['quark:calcite_bricks_stairs', 'quark:calcite_stairs', 'quark:polished_calcite_stairs'])
    $.toTag('foxtech:slabs/calcite', ['quark:calcite_slab', 'quark:polished_calcite_slab', 'quark:calcite_bricks_slab'])
    $.toTag('foxtech:vertical_slabs/calcite', ['quark:calcite_vertical_slab', 'quark:polished_calcite_vertical_slab', 'quark:calcite_bricks_vertical_slab'])
    $.toTag('foxtech:walls/calcite', ['quark:calcite_bricks_wall', 'quark:calcite_wall'])
    /* DRIPSTONE */
    $.toTag('foxtech:blocks/dripstone', ['minecraft:dripstone_block', 'quark:polished_dripstone', 'quark:dripstone_bricks',
        'quark:chiseled_dripstone_bricks', 'quark:dripstone_pillar'])
    $.toTag('foxtech:stairs/dripstone', ['quark:dripstone_bricks_stairs', 'quark:dripstone_block_stairs', 'quark:polished_dripstone_stairs'])
    $.toTag('foxtech:slabs/dripstone', ['quark:dripstone_bricks_slab', 'quark:dripstone_block_slab', 'quark:polished_dripstone_slab'])
    $.toTag('foxtech:vertical_slabs/dripstone', ['quark:dripstone_bricks_vertical_slab', 'quark:dripstone_block_vertical_slab', 'quark:polished_dripstone_vertical_slab'])
    $.toTag('foxtech:walls/dripstone', ['quark:dripstone_bricks_wall', 'quark:dripstone_block_wall'])
    /* TUFF */
    $.toTag('foxtech:blocks/tuff', ['minecraft:tuff', 'quark:polished_tuff', 'quark:tuff_bricks',
        'quark:chiseled_tuff_bricks', 'quark:tuff_pillar'])
    $.toTag('foxtech:stairs/tuff', ['quark:tuff_bricks_stairs', 'quark:tuff_stairs', 'quark:polished_tuff_stairs'])
    $.toTag('foxtech:slabs/tuff', ['quark:tuff_bricks_slab', 'quark:tuff_slab', 'quark:polished_tuff_slab'])
    $.toTag('foxtech:vertical_slabs/tuff', ['quark:tuff_bricks_vertical_slab', 'quark:tuff_vertical_slab', 'quark:polished_tuff_vertical_slab'])
    $.toTag('foxtech:walls/tuff', ['quark:tuff_bricks_wall', 'quark:tuff_wall'])
    /* DEEPSLATE */
    $.toTag('foxtech:blocks/deepslate', ['minecraft:deepslate', 'minecraft:cobbled_deepslate', 'minecraft:chiseled_deepslate',
        'minecraft:polished_deepslate', 'minecraft:deepslate_bricks', 'minecraft:cracked_deepslate_bricks', 'minecraft:deepslate_tiles',
        'minecraft:cracked_deepslate_tiles', 'minecraft:reinfornced_deepslate'])
    $.toTag('foxtech:stairs/deepslate', ['minecraft:cobbled_deepslate_stairs', 'minecraft:polished_deepslate_stairs', 'minecraft:deepslate_brick_stairs',
        'minecraft:deepslate_tile_stairs'])
    $.toTag('foxtech:slabs/deepslate', ['minecraft:cobbled_deepslate_slab', 'minecraft:polished_deepslate_slab', 'minecraft:deepslate_brick_slab',
        'minecraft:deepslate_tile_slab'])
    $.toTag('foxtech:vertical_slabs/deepslate', ['quark:cobbled_deepslate_vertical_slab', 'quark:polished_deepslate_vertical_slab', 'quark:deepslate_brick_vertical_slab',
        'quark:deepslate_tile_vertical_slab'])
    $.toTag('foxtech:walls/deepslate', ['minecraft:cobbled_deepslate_wall', 'minecraft:polished_deepslate_wall', 'minecraft:deepslate_brick_wall',
        'minecraft:deepslate_tile_wall'
    ])
    /* BRICK */
    $.toTag('foxtech:blocks/brick', ['minecraft:bricks'])
    $.toTag('foxtech:stairs/brick', ['minecraft:brick_stairs'])
    $.toTag('foxtech:slabs/brick', ['minecraft:brick_slab'])
    $.toTag('foxtech:vertical_slabs/brick', ['quark:brick_vertical_slab'])
    $.toTag('foxtech:walls/brick', ['minecraft:brick_wall'])
    /* SANDSTONE */
    $.toTag('foxtech:blocks/sandstone', ['minecraft:sandstone', 'minecraft:chiseled_sandstone', 'minecraft:smooth_sandstone',
        'minecraft:cut_sandstone', 'quark:sandstone_bricks'])
    $.toTag('foxtech:stairs/sandstone', ['minecraft:sandstone_stairs', 'minecraft:smooth_sandstone_stairs', 'quark:sandstone_bricks_stairs'])
    $.toTag('foxtech:slabs/sandstone', ['minecraft:sandstone_slab', 'minecraft:smooth_sandstone_slab', 'minecraft:cut_sandstone_slab',
        'quark:sandstone_bricks_slab'])
    $.toTag('foxtech:vertical_slabs/sandstone', ['quark:sandstone_vertical_slab', 'quark:smooth_sandstone_vertical_slab', 'quark:cut_sandstone_vertical_slab',
        'quark:sandstone_bricks_vertical_slab'])
    $.toTag('foxtech:walls/sandstone', ['minecraft:sandstone_wall', 'quark:sandstone_bricks_wall'])
    /* DIRT */
    $.toTag('foxtech:blocks/dirt', ['quark:dirt_bricks'])
    $.toTag('foxtech:stairs/dirt', ['quark:dirt_bricks_stairs'])
    $.toTag('foxtech:slabs/dirt', ['quark:dirt_bricks_slab'])
    $.toTag('foxtech:vertical_slabs/dirt', ['quark:dirt_bricks_vertical_slab'])
    $.toTag('foxtech:walls/dirt', ['quark:dirt_bricks_wall'])
    /* MUD */
    $.toTag('foxtech:blocks/mud', ['minecraft:packed_mud', 'minecraft:mud_bricks', 'quark:carved_mud_bricks',
        'quark:mud_pillar', 'quark:mud_brick_lattice'])
    $.toTag('foxtech:stairs/mud', ['minecraft:mud_brick_stairs'])
    $.toTag('foxtech:slabs/mud', ['minecraft:mud_brick_slab'])
    $.toTag('foxtech:vertical_slabs/mud', ['quark:mud_brick_vertical_slab'])
    $.toTag('foxtech:walls/mud', ['minecraft:mud_brick_wall'])
    /* RED SANDSTONE */
    $.toTag('foxtech:blocks/red_sandstone', ['minecraft:red_sandstone', 'minecraft:chiseled_red_sandstone', 'minecraft:smooth_red_sandstone',
        'minecraft:cut_red_sandstone', 'quark:red_sandstone_bricks'])
    $.toTag('foxtech:stairs/red_sandstone', ['minecraft:red_sandstone_stairs', 'minecraft:smooth_red_sandstone_stairs', 'quark:red_sandstone_bricks_stairs'])
    $.toTag('foxtech:slabs/red_sandstone', ['minecraft:red_sandstone_slab', 'minecraft:smooth_red_sandstone_slab', 'minecraft:cut_red_sandstone_slab',
        'quark:red_sandstone_bricks_slab'])
    $.toTag('foxtech:vertical_slabs/red_sandstone', ['quark:red_sandstone_vertical_slab', 'quark:smooth_red_sandstone_vertical_slab', 'quark:cut_red_sandstone_vertical_slab',
        'quark:red_sandstone_bricks_vertical_slab'])
    $.toTag('foxtech:walls/red_sandstone', ['minecraft:red_sandstone_wall', 'quark:red_sandstone_bricks_wall'])
    /* SOUL SANDSTONE */
    $.toTag('foxtech:blocks/soul_sandstone', ['quark:soul_sandstone', 'quark:chiseled_soul_sandstone', 'quark:smooth_soul_sandstone',
        'quark:cut_soul_sandstone', 'quark:soul_sandstone_bricks'])
    $.toTag('foxtech:stairs/soul_sandstone', ['quark:soul_sandstone_stairs', 'quark:smooth_soul_sandstone_stairs', 'quark:soul_sandstone_bricks_stairs'])
    $.toTag('foxtech:slabs/soul_sandstone', ['quark:soul_sandstone_slab', 'quark:smooth_soul_sandstone_slab', 'quark:cut_soul_sandstone_slab',
        'quark:soul_sandstone_bricks_slab'])
    $.toTag('foxtech:vertical_slabs/soul_sandstone', ['quark:soul_sandstone_vertical_slab', 'quark:smooth_soul_sandstone_vertical_slab', 'quark:cut_soul_sandstone_vertical_slab',
        'quark:soul_sandstone_bricks_vertical_slab'])
    $.toTag('foxtech:walls/soul_sandstone', ['quark:soul_sandstone_wall', 'quark:soul_sandstone_bricks_wall'])
    /* PRISMARINE */
    $.toTag('foxtech:blocks/prismarine', ['minecraft:prismarine', 'minecraft:prismarine_bricks'])
    $.toTag('foxtech:stairs/prismarine', ['minecraft:prismarine_stairs', 'minecraft:prismarine_brick_stairs'])
    $.toTag('foxtech:slabs/prismarine', ['minecraft:prismarine_slab', 'minecraft:prismarine_brick_slab'])
    $.toTag('foxtech:vertical_slabs/prismarine', ['quark:prismarine_vertical_slab', 'quark:prismarine_brick_vertical_slab'])
    $.toTag('foxtech:walls/prismarine', ['minecaft:prismarine_wall'])
    /* DARK PRISMARINE */
    $.toTag('foxtech:blocks/dark_prismarine', ['minecraft:dark_prismarine'])
    $.toTag('foxtech:stairs/dark_prismarine', ['minecraft:dark_prismarine_stairs'])
    $.toTag('foxtech:slabs/dark_prismarine', ['minecraft:dark_prismarine_slab'])
    $.toTag('foxtech:vertical_slabs/dark_prismarine', ['quark:dark_prismarine_vertical_slab'])
})