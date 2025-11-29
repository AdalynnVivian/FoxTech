var VANILLA_OW_WOOD = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'mangrove', 'cherry']
var QUARK_WOOD = ['ancient', 'azalea', 'blossom']

StartupEvents.registry('item', event => {
    for(var type of QUARK_WOOD) {
        event.create(`foxtech:crated_${type}_log`)
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
    }
})