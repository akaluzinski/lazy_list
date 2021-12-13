import { Component, OnInit } from '@angular/core';
import { Ingredient } from './ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Beans', 4),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() {}

  ngOnInit(): void {}

  add({ name, amount }: Ingredient): void {
    const existingIngredient = this.ingredients.find((ingredient) =>
      ingredient.name.toLowerCase().trim().includes(name.toLowerCase().trim())
    );

    if (existingIngredient != undefined) {
      existingIngredient.amount += amount;
    } else {
      this.ingredients.push(new Ingredient(name, amount));
    }
  }
}
