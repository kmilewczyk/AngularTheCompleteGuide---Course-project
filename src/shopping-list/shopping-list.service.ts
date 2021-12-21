import { Injectable } from '@angular/core';
import { Ingredient } from 'src/shared/models/ingredient.model';
import { EventEmitter } from '@angular/core';

export type IngredientMap = Map<string, Ingredient>;

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // add ingredients
  private ingredients: IngredientMap = new Map(
    [
      ['apples', new Ingredient('Apples', 5)],
      ['tomatoes', new Ingredient('Tomatoes', 10)]
    ]
  );

  ingredientsChanged = new EventEmitter<IngredientMap>();

  constructor() { }

  getIngredients() {
    return new Map(this.ingredients);
  }

  addIngredient(ingredient: Ingredient) {
    this.addIngredientToMap(ingredient);

    this.ingredientsChanged.emit(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.addIngredientToMap(ingredient);
    }

    this.ingredientsChanged.emit(this.ingredients);
  }

  private addIngredientToMap(ingredient: Ingredient) {
    let dictIngredient = this.ingredients.get(ingredient.name.toLowerCase());

    if (dictIngredient != null) {
      dictIngredient.amount += ingredient.amount;
    } else {
      this.ingredients.set(ingredient.name.toLowerCase(), ingredient);
    }
  }
}
