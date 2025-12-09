var VANILLA_OW_WOOD = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'mangrove', 'cherry']
var VANILLA_N_WOOD = ['']
var QUARK_WOOD = ['ancient', 'azalea', 'blossom']

StartupEvents.registry('item', event => {
    for(var type of QUARK_WOOD) {
        event.create(`foxtech:crated_${type}_log`)
        event.create(`hexcasting:staff/${type}`) 
    }
})

StartupEvents.registry('block', event => {
    for(var type of VANILLA_OW_WOOD) {
        if(type != 'oak') event.create(`foxtech:${type}_composter`)
        if(type != 'oak') event.create(`foxtech:${type}_barrel`)
    }
    for(var type of QUARK_WOOD) {
        event.create(`foxtech:${type}_composter`)
        event.create(`foxtech:${type}_barrel`)
        event.create(`foxtech:fireproof_${type}_log`)
        event.create(`foxtech:fireproof_${type}_wood`)
        event.create(`foxtech:fireproof_stripped_${type}_log`)
        event.create(`foxtech:fireproof_stripped_${type}_wood`)
        event.create(`foxtech:fireproof_${type}_planks`)
        event.create(`foxtech:fireproof_vertical_${type}_planks`)
        event.create(`foxtech:${type}_window`) // WINDOW
        event.create(`foxtech:${type}_1`) // 1X1 DRAWER
        event.create(`foxtech:${type}_2`) // 1X2 DRAWER
        event.create(`foxtech:${type}_4`) // 2X2 DRAWER
        event.create(`foxtech:${type}_crafting_table`)
        event.create(`foxtech:${type}_taburet`)
        event.create(`foxtech:${type}_bar_stool`)
        event.create(`foxtech:${type}_chair`)
        event.create(`foxtech:${type}_table`)
        event.create(`foxtech:${type}_banister`)
        event.create(`foxtech:${type}_cabinet`)
    }
})