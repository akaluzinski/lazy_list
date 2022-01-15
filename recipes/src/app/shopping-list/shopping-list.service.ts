import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

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

  addIngredient({ name, amount }: Ingredient): void {
    const existingIngredient = this.ingredients.find((ingredient) =>
      ingredient.name.toLowerCase().trim().includes(name.toLowerCase().trim())
    );

    if (existingIngredient != undefined) {
      existingIngredient.amount += amount;
    } else {
      this.ingredients.push(new Ingredient(name, amount));
    }
    this.ingredientsChanged.next(this.getIngredients());
  }
}
