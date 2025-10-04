ServerEvents.tags('item', event => {
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
    function crystal(material, overrides) {
        if(overrides === undefined) {
            overrides = {}
        }
        var def = {
            small: "geodes:small_" + material + "_bud",
            medium: "geodes:medium_" + material + "_bud",
            large: "geodes:large_" + material + "_bud",
            cluster: "geodes:" + material + "_cluster",
            block: "geodes:" + material + "_crystal_block"
        }
        for(var i in overrides) {
            def[i] = overrides[i]
        }
        event.add("forge:buds/" + material + "/small", def.small)
        event.add("forge:buds/" + material + "/medium", def.medium)
        event.add("forge:buds/" + material + "/large", def.large)
        event.add("forge:clusters/" + material, def.cluster)
        event.add("forge:crystal_blocks/" + material, def.block)
    }
    crystal("emerald")
    crystal("quartz")
    crystal("diamond")
    crystal("lapis")
    crystal("echo", {block: "geodes:echo_block"})
    crystal("gypsum", {cluster: "geodes:gypsum_rose"})

    toTags(["forge:gems", "forge:gems/gypsum"], "geodes:gypsum_shard")
    toTags(["forge:raw_materials", "forge:raw_materials/pyrite"], "geodes:pyrite_chunk")
    toTags(["forge:storage_blocks", "forge:storage_blocks/raw_pyrite"], "geodes:pyrite")
})