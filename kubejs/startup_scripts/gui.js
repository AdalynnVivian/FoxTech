GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    GTRecipeTypes.CUTTER_RECIPES.setMaxIOSize(2, 2, 1, 0)
    GTRecipeTypes.LATHE_RECIPES.setMaxIOSize(2, 2, 0, 0) //This doesn't work for some reason
    GTRecipeTypes.EXTRACTOR_RECIPES.setMaxIOSize(1, 1, 0, 9)
    GTRecipeTypes.MACERATOR_RECIPES.setMaxIOSize(1, 9, 0, 0)
    GTRecipeTypes.ARC_FURNACE_RECIPES.setMaxIOSize(1, 9, 1, 1)
})