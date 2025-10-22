import FoxTechAddon from "../addon.js"

ServerEvents.tags('block', event => {
    var $ = FoxTechAddon(event)
    var tc = ['terracotta', 'white_terracotta', 'light_gray_terracotta', 'gray_terracotta', 'black_terracotta', 'brown_terracotta', 'red_terracotta', 'orange_terracotta', 'yellow_terracotta', 'lime_terracotta', 'green_terracotta',
        'cyan_terracotta', 'light_blue_terracotta', 'blue_terracotta', 'purple_terracotta', 'magenta_terracotta', 'pink_terracotta']
    //Oregen
    $.tagItems(['minecraft:stone_ore_replaceables', 'minecraft:deepslate_ore_replaceables'], tc.concat(['minecraft:stone_ore_replaceables', 'minecraft:deepslate_ore_replaceables',
        'minecraft:blackstone', 'minecraft:calcite', 'minecraft:cobbled_deepslate', 'minecraft:cobblestone', 'minecraft:dripstone_block', 'minecraft:smooth_basalt',
        'geodes:pyrite', 'geodes:gabbro',
        'create:asurine', 'create:crimsite', 'create:limestone', 'create:ochrum', 'create:schorchia', 'create:scoria', 'create:veridium',
        'aether:holystone',
        'alexscaves:abyssmarine', 'alexscaves:galena', 'alexscaves:limestone', 'alexscaves:radrock', 'alexscaves:guanostone', 'alexscaves:gingerbread_block','alexscaves:block_of_chocolate','alexscaves:cake_layer',
        'tfmg:bauxite', 'tfmg:galena', 'tfmg:lignite', 'tfmg:fireclay',
        'twigs:rhyolite', 'twigs:schist',
        'minecraft:gravel', 'ad_extendra:b_sand', 'ad_extendra:b_stone', 'ad_extendra:b_sandstone',
        'quark:limestone', 'quark:jasper', 'quark:shale', 'quark:myalite', 'quark:permafrost']))
    $.toTag('minecraft:nether_carver_replaceables', [
        'tfmg:sulfur',
        'twigs:bloodstone', 'twigs:silt',
        'minecraft:smooth_basalt',
        'minecraft:gravel', 'ad_extendra:b_sand', 'ad_extendra:b_stone', 'ad_extendra:b_sandstone'])
    $.tagItems(['forge:end_stone_ore_replaceables', 'c:end_stone_ore_replaceables'],[
        'betterend:flavolite', 'betterend:violecite', 'betterend:sulphuric_rock', 'betterend:virid_jadestone', 'betterend:azure_jadestone', 'betterend:sandy_jadestone', 'betterend:umbralith',
        'minecraft:gravel', 'ad_extendra:b_sand', 'ad_extendra:b_stone', 'ad_extendra:b_sandstone'])
})