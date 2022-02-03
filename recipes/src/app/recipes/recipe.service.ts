import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe-list/recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  setRecipes(recipes: Recipe[]): void{
    this.recipes = recipes;
    this.notifyRecipesChanged();
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.notifyRecipesChanged();
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.notifyRecipesChanged();
  }

  deleteRecipe(id: number): void {
    this.recipes.splice(id, 1);
    this.notifyRecipesChanged();
  }

  private notifyRecipesChanged(): void {
    this.recipesChanged.next(this.recipes.slice());
  }
}
