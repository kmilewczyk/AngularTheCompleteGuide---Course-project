import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/shared/models/ingredient.model';
import { IngredientMap, ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients?: IngredientMap;
  private igChangeSub?: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.igChangeSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(() => {
      this.ingredients = this.shoppingListService.getIngredients();
    });
  }

  onEditItem(name: string) {
    this.shoppingListService.startedEditing.next(name)
  }
}
