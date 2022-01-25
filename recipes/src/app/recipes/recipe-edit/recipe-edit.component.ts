import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private readonly route: ActivatedRoute,
              private readonly recipeService: RecipeService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
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
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            }));
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imgUrl: new FormControl(recipeImgPath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });
  }

  getIngredients(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }


  onSubmit(): void {
    console.log(this.recipeForm);
  }
}
