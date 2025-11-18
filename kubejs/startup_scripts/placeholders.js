StartupEvents.registry('item', event => {
    //event.create('foxtech:placeholder_item')
})

StartupEvents.registry('block', event => {
    var VANILLA_OW_WOOD = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'mangrove', 'cherry']
    var QUARK_WOOD = ['ancient', 'azalea', 'trumpet']
    for(var type of VANILLA_OW_WOOD) {
        if(type != 'oak') {
            event.create(`foxtech:${type}_composter`)
            event.create(`foxtech:${type}_barrel`)
        }
    }
    for(var type of QUARK_WOOD) {
        event.create(`foxtech:${type}_composter`)
        event.create(`foxtech:${type}_barrel`)
    }
})