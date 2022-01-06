import { Action, ActionsSubject } from "@ngrx/store";
import { Ingredient } from "src/shared/models/ingredient.model";
import { Recipe } from "src/shared/models/recipe.model";
import { AddRecipe, ADD_RECIPE, DeleteRecipe, DELETE_RECIPE, SetRecipes, SET_RECIPES, UpdateRecipe, UPDATE_RECIPE } from "./recipe.actions";

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe(
            'Schabowy',
            'Domowej roboty',
            'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20),
            ]
        ),
        new Recipe(
            'Burger',
            'Mamy burgery w domu.',
            'https://images.pexels.com/photos/3915915/pexels-photo-3915915.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
        )
    ]
}

export function recipeReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ADD_RECIPE:
            const addRecipeAction = action as AddRecipe;
            return {
                ...state,
                recipes: [...state.recipes, addRecipeAction.payload]
            };
        case UPDATE_RECIPE:
            const updateRecipeAction = action as UpdateRecipe;
            const updatedRecipe = { 
                ...state.recipes[updateRecipeAction.payload.index],
                ...updateRecipeAction.payload.newRecipe };
            const updatedRecipes = [...state.recipes];
            updatedRecipes[updateRecipeAction.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: updatedRecipes,
            };
        case DELETE_RECIPE:
            const deleteRecipeAction = action as DeleteRecipe;
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => index !== deleteRecipeAction.payload)
            };
        default:
            return state;
    }
}
