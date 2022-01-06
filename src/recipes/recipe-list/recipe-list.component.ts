import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from 'src/shared/models/recipe.model';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .pipe(map((recipesState => recipesState.recipes)))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
