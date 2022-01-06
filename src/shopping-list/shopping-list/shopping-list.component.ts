import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ShoppingListAction from '../store/shopping-list.actions'
import { IngredientMap } from 'src/shared/types/ingredient-map.type';
import * as fromApp from '../../app/store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients?: Observable<{ ingredients: IngredientMap }>;

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(name: string) {
    // this.shoppingListService.startedEditing.next(name)
    this.store.dispatch(new ShoppingListAction.StartEdit(name));
  }
}
