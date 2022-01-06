import { ActionReducerMap } from '@ngrx/store'
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer'
import * as fromRecipes from '../../recipes/store/recipe.reducer'


export interface AppState {
    shoppingList: fromShoppingList.State;
    recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    recipes: fromRecipes.recipeReducer
}