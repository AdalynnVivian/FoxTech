import FoxTechAddon from "../addon.js"

ServerEvents.recipes(event => {
    var $ = FoxTechAddon(event)

    /* Wood item recipes found in vanilla + quark */
    $.recycle('#quark:logs', ['90x wood'])
    $.recycle('#quark:hollow_logs', ['90x wood'])
    $.recycle('#minecraft:planks', ['90x wood'])
    $.recycle('#minecraft:wooden_slabs', ['45x wood'])
    $.recycle('#quark:wooden_vertical_slabs', ['45x wood'])
    $.recycle('#quark:posts', ['270x wood'])
    $.recycle('#forge:fences/wooden', ['90x wood'])
    $.recycle('#forge:fence_gates/wooden', ['90x wood'])
    $.recycle('#minecraft:wooden_doors', ['180x wood'])
    $.recycle('#minecraft:wooden_trapdoors', ['135x wood'])
    $.recycle('#minecraft:wooden_buttons', ['10x wood'])

    /* STONES. 1 Block = 1 Dust */
    function stone(material, gt) {
        gt = gt == undefined ? material : gt
        $.recycle('#foxtech:blocks/'+material, ['90x '+gt])
        $.recycle('#foxtech:stairs/'+material, ['67.5x '+gt])
        $.recycle('#foxtech:slabs/'+material, ['45x '+gt])
        $.recycle('#foxtech:vertical_slabs/'+material, ['45x '+gt])
        $.recycle('#foxtech:walls/'+material, ['90x '+gt])
    }
    /* CRYSTAL BLOCKS. 1 Block = 4 Dust */
    function four(material, gt) {
        gt = gt == undefined ? material : gt
        $.recycle('#foxtech:blocks/'+material, ['360x '+gt])
        $.recycle('#foxtech:stairs/'+material, ['270x '+gt])
        $.recycle('#foxtech:slabs/'+material, ['180x '+gt])
        $.recycle('#foxtech:vertical_slabs/'+material, ['180x '+gt])
        $.recycle('#foxtech:walls/'+material, ['360x '+gt])
    }
    /* LIQUID + RAW. 1 Block = 9 Dust */
    function nine(material, gt) {
        gt = gt == undefined ? material : gt
        $.recycle('#foxtech:blocks/'+material, ['810x '+gt])
        $.recycle('#foxtech:stairs/'+material, ['607.5x '+gt])
        $.recycle('#foxtech:slabs/'+material, ['405x '+gt])
        $.recycle('#foxtech:vertical_slabs/'+material, ['405x '+gt])
        $.recycle('#foxtech:walls/'+material, ['810x '+gt])
    }
    stone('stone')
    $.recycle('foxtech:sturdy_stone', ['810x stone'])
    stone('granite')
    stone('diorite')
    stone('andesite')
    stone('limestone')
    stone('jasper')
    stone('shale')
    stone('myalite')
    stone('permafrost')
    stone('calcite')
    stone('dripstone', 'clay')
    stone('tuff', 'ash')
    stone('deepslate')
    four('bricks', 'brick')

    stone('sandstone', 'quartz_sand')
    stone('red_sandstone', 'quartz_sand')
    stone('soul_sandstone', 'soul_quartz_sand')

    stone('dirt')
    nine('mud')
    four('prismarine')
    nine('dark_prismarine')


})