// priority: 0

GTCEuServerEvents.oreVeins(event => {
    event.modifyAll((id, vein) => {
        vein.density(Math.sqrt(Math.sqrt(vein.density())))
    })
})