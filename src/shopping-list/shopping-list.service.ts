import { Injectable } from '@angular/core';
import { Ingredient } from 'src/shared/models/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

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

  ingredientsChanged = new Subject<IngredientMap>();
  startedEditing = new Subject<string>();

  constructor() { }

  getIngredients() {
    return new Map(this.ingredients);
  }

  getIngredient(name: string) {
    return this.ingredients.get(name);
  }

  addIngredient(ingredient: Ingredient) {
    this.addIngredientToMap(ingredient);

    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.addIngredientToMap(ingredient);
    }

    this.ingredientsChanged.next(this.ingredients);
  }

  private addIngredientToMap(ingredient: Ingredient) {
    let dictIngredient = this.ingredients.get(ingredient.name.toLowerCase());

    if (dictIngredient != null) {
      dictIngredient.amount += ingredient.amount;
    } else {
      this.ingredients.set(ingredient.name.toLowerCase(), ingredient);
    }
  }

  updateIngredient(key: string, newIngredient: Ingredient) {
    this.ingredients.set(key, newIngredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredient(key: string) {
    this.ingredients.delete(key);
    this.ingredientsChanged.next(this.ingredients);
  }
}
