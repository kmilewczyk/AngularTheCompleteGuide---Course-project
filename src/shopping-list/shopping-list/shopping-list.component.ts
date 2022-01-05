import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IngredientMap, ShoppingListService } from '../shopping-list.service';
import * as fromShoppingList from '../store/shopping-list.reducer'
import * as ShoppingListAction from '../store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients?: Observable<{ ingredients: IngredientMap }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(name: string) {
    // this.shoppingListService.startedEditing.next(name)
    this.store.dispatch(new ShoppingListAction.StartEdit(name));
  }
}
