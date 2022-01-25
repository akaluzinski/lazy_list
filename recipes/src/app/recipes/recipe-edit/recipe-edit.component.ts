import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {

  private readonly amountPattern = /^[1-9]+[0-9]*$/;

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly recipeService: RecipeService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initializeForm();
    });
  }

  private initializeForm(): void {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const { description, imagePath, name, ingredients } = this.recipeService.getRecipe(this.id);
      recipeName = name;
      recipeImgPath = imagePath;
      recipeDescription = description;
      if (ingredients) {
        ingredients.forEach(ingredient => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(this.amountPattern)])
            }));
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imgUrl: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });
  }

  getIngredients(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(this.amountPattern)])
    }));
  }

  onSubmit(): void {
    const { name, description, imgUrl, ingredients } = this.recipeForm.value;
    const recipe = new Recipe(name, description, imgUrl, ingredients);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.navigateBackToList();
  }

  cancel(): void {
    this.navigateBackToList();
  }

  private navigateBackToList(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
