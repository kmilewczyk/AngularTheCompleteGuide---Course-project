import { Action, UPDATE } from "@ngrx/store";
import { Ingredient } from "src/shared/models/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor (public payload: [string, Ingredient]) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor (public payload: Map<string, Ingredient>) {}
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor (public payload: {key: string, value: Ingredient}) {}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;

    constructor (public payload: string) {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor (public payload: string) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}