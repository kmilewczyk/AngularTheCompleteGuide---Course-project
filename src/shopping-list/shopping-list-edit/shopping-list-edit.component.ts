import { TitleCasePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm!: NgForm;
  shopItemEdit?: Subscription;
  editMode = false;
  editedItemKey?: string;
  editedItem?: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.shopItemEdit?.unsubscribe();
  }

  ngOnInit(): void {
    this.shopItemEdit = this.shoppingListService.startedEditing.subscribe(
      (name: string) => {
        this.editedItemKey = name;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(name);
        this.shoppingListForm.setValue({
          name: this.editedItem?.name,
          amount: this.editedItem?.amount
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const amount = parseInt(value.amount);

    if (value.name && !isNaN(amount)) {
      let name = (value.name.charAt(0).toUpperCase() + value.name.slice(1)).trim();

      let ingredient =  new Ingredient(name, amount);

      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedItemKey!, ingredient);
      } else {
        this.shoppingListService.addIngredient(ingredient);
      }

      this.onClear();
    }
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    if (this.editedItemKey) 
      this.shoppingListService.deleteIngredient(this.editedItemKey);

    this.onClear();
  }
}
