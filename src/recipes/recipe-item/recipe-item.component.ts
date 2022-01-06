import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeId!: number;
  @Input() recipe!: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  onItemClicked() {
    return false;
  }
}
