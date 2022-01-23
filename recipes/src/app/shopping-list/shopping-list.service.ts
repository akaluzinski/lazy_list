import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients = [
    new Ingredient('Beans', 4),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach((ingredient: Ingredient) => {
      this.addIngredient(ingredient);
    });
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient({ name, amount }: Ingredient): void {
    this.ingredients.push(new Ingredient(name, amount));
    this.ingredientsChanged.next(this.getIngredients());
  }

  updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.getIngredients());
  }
}
