import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/shared/models/ingredient.model';
import { Recipe } from 'src/shared/models/recipe.model';
import { IngredientMap, ShoppingListService } from 'src/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe?: Recipe & { id: number };

  constructor(private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{shoppingList: {ingredients: IngredientMap}}>) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipe = { id: +params['id'], ...this.recipeService.getRecipe(+params['id'])}; 
    })
  }

  sendIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(
        new Map(ingredients.map((ingr) => [ingr.name.toLowerCase(), ingr]))));

    return false;
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    if (this.recipe) {
      this.recipeService.deleteRecipe(this.recipe.id);
    }

    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
