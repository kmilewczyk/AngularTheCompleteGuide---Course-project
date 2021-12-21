import { Injectable } from '@angular/core';
import { Recipe } from 'src/shared/models/recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from 'src/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Schabowy',
      'Domowej roboty',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]
    ),
    new Recipe(
      2,
      'Burger',
      'Mamy burgery w domu.',
      'https://images.pexels.com/photos/3915915/pexels-photo-3915915.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.filter(r => r.id == id)[0];
  }
}
