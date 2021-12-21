import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeBookComponent } from './recipes/recipes.component';
import { RecipeDetailResolver } from './resolvers/recipe-detail.resolver';

const routes: Routes = [
  { path: '', component: RecipeBookComponent, children: [
    { path: '', component: NoRecipeSelectedComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeBookRoutingModule { }
