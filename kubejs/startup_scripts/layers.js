GTCEuStartupEvents.registry('gtceu:world_gen_layer', event => {
    function toTags(tags, item) {
        tags.forEach(tag => {
           event.add(tag, item)
        })
    }
    function toTag(tag, items) {
        items.forEach(item => {
            event.add(tag, item)
        })
    }
    function tagItems(tags, items) {
        tags.forEach(tag => {
            items.forEach(item => {
                event.add(tag, item)
            })
        })
    }
})