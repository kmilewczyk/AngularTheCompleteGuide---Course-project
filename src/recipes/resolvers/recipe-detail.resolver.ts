import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from 'src/shared/models/recipe.model';
import { RecipeService } from '../recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailResolver implements Resolve<Recipe> {
  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe {
    let id = route.params['id'];
    return this.recipeService.getRecipe(id);
  }
}
