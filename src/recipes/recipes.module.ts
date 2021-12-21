import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeBookRoutingModule } from './recipes-routing.module';
import { RecipeBookComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { SharedModule } from 'src/shared/shared.module';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';


@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    NoRecipeSelectedComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    RecipeBookRoutingModule,
    SharedModule
  ]
})
export class RecipeBookModule { }
