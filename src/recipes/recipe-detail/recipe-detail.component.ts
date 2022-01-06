import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/shared/models/ingredient.model';
import { Recipe } from 'src/shared/models/recipe.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
import { AppState } from 'src/app/store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { DeleteRecipe } from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe?: Recipe & { id: number };
  private id = -1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => +params['id'] ),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((_recipe, index) => {
            return index === this.id;
          })
        }))
      .subscribe(recipe => {
        if (recipe) {
          this.recipe = { id: this.id, ...recipe };
        }
      });
  }

  sendIngredientsToShoppingList(ingredients: Ingredient[]) {
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
      this.store.dispatch(new DeleteRecipe(this.id));
    }

    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
