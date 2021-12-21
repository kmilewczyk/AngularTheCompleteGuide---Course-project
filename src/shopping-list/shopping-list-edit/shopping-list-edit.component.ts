import { TitleCasePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef!: ElementRef;
  @ViewChild('amountInput') amountInput!: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onItemAdd() {
    let name: string = this.nameInputRef.nativeElement.value;
    let amount = Number(this.amountInput.nativeElement.value);

    if (name && amount) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
    }

  }
}
