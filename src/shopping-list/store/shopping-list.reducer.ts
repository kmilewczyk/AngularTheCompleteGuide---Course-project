import { Action } from "@ngrx/store";
import { Ingredient } from "src/shared/models/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions"

export interface State {
    ingredients: Map<string, Ingredient>;
    editedIngredient?: Ingredient;
    editedIngredientKey?: string;
}

const initialState: State = {
    ingredients: new Map(
        [
            ['apples', new Ingredient('Apples', 5)],
            ['tomatoes', new Ingredient('Tomatoes', 10)]
        ]
    ),
    editedIngredient: undefined,
    editedIngredientKey: undefined
};


export function shoppingListReducer(state = initialState, action: Action): State {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: new Map([...state.ingredients, (action as ShoppingListActions.AddIngredient).payload])
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: new Map([...state.ingredients, ...(action as ShoppingListActions.AddIngredients).payload])
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const update = action as ShoppingListActions.UpdateIngredient;
            const ingredient = state.ingredients.get(update.payload.key)
            const updatedIngredient = { ...ingredient, ...update.payload.value };
            const updatedIngredients = new Map(state.ingredients);
            updatedIngredients.set(update.payload.key, updatedIngredient);

            return { 
                ...state,
                ingredients: updatedIngredients,
            };
        case ShoppingListActions.DELETE_INGREDIENT: 
            const deleteAction = action as ShoppingListActions.DeleteIngredient;
            const ingredientsAfterDelete = new Map(state.ingredients);
            ingredientsAfterDelete.delete(deleteAction.payload);
            
            return {
                ...state,
                ingredients: ingredientsAfterDelete,
            }
        case ShoppingListActions.START_EDIT:
            const startEdit = action as ShoppingListActions.StartEdit;
            const editedIngredient = state.ingredients.has(startEdit.payload) ?
                {...state.ingredients.get(startEdit.payload)!} : undefined;
            
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientKey: !!editedIngredient ? startEdit.payload : undefined
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: undefined,
                editedIngredientKey: undefined
            }
        default:
            return state;
    }
}