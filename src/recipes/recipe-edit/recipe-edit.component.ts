import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { AddRecipe, UpdateRecipe, UPDATE_RECIPE } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editedRecipeId?: number;
  get editMode(): boolean { return this.editedRecipeId !== undefined}
  recipeForm: FormGroup = new FormGroup({
    'id': new FormControl(),
    'name': new FormControl(''),
    'imagePath': new FormControl(''),
    'description': new FormControl(''),
    'ingredients': new FormArray([])
  });

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.editedRecipeId = +params['id'];
        }

        this.initForm();
        this.cdref.detectChanges();
      }
    )
  }

  private initForm() {
    let {
      recipeName,
      recipeImagePath,
      recipeDescription,
      recipeIngredients } = this.getEditedRecipeInfo();


    this.recipeForm = new FormGroup({
      'id': new FormControl(this.editedRecipeId),
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new UpdateRecipe({ index: this.editedRecipeId!, newRecipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(new AddRecipe(this.recipeForm.value));
    }

    this.resetForm();
    this.navigateBack();
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.resetForm();
    this.navigateBack();
  }

  resetForm() {
    this.recipeForm.reset();
    this.editedRecipeId = undefined;
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getEditedRecipeInfo() {
    const recipeInfo = {
      recipeName: '',
      recipeImagePath: '',
      recipeDescription: '',
      recipeIngredients: new FormArray([])
    };

    if (this.editMode) {
      this.store.select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((_recipe, index) => index === this.editedRecipeId);
          }),
          take(1))
        .subscribe(recipe => {
          if (!recipe) {
            return;
          }

          recipeInfo.recipeName = recipe.name;
          recipeInfo.recipeImagePath = recipe.imagePath;
          recipeInfo.recipeDescription = recipe.description;

          for (let ingredient of recipe.ingredients) {
            recipeInfo.recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        });
    }

    return recipeInfo;
  }
}