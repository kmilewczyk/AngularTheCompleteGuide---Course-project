import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/shared/models/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromApp from '../../app/store/app.reducer'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm!: NgForm;
  subscription?: Subscription;
  editMode = false;
  editedItemKey?: string;
  editedItem?: Ingredient;

  constructor(private store: Store<fromApp.AppState> ) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredient) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.editedItemKey = stateData.editedIngredientKey;
        this.shoppingListForm.setValue({
          name: this.editedItem?.name,
          amount: this.editedItem?.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const amount = parseInt(value.amount);

    if (value.name && !isNaN(amount)) {
      const name: string = (value.name.charAt(0).toUpperCase() + value.name.slice(1)).trim();
      const key: string = name.toLowerCase();

      let ingredient =  new Ingredient(name, amount);

      if (this.editMode) {
        // this.shoppingListService.updateIngredient(this.editedItemKey!, ingredient);
        this.store.dispatch(new ShoppingListActions.UpdateIngredient({ key: key, value: ingredient }));
      } else {
        this.store.dispatch(new ShoppingListActions.AddIngredient([key, ingredient]));
      }

      this.onClear();
    }
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    if (this.editedItemKey) 
      this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemKey))

    this.onClear();
  }
}
