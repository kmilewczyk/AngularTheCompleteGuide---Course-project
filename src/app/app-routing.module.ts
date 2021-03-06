import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'shopping-list', loadChildren: () => import('../shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'recipes', loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipeBookModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
