import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/shared/models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipeBookComponent implements OnInit {
  selectedRecipe?: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

}
