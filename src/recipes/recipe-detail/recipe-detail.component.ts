import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/shared/models/ingredient.model';
import { Recipe } from 'src/shared/models/recipe.model';
import { ShoppingListService } from 'src/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe?: Recipe;

  constructor(private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipe = this.recipeService.getRecipe(+params['id']); 
    })
  }

  sendIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
    
    return false;
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
