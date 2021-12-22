import { Component, OnInit } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.refreshIngredients();
  }

  add(ingredient: Ingredient): void {
    this.shoppingListService.addIngredient(ingredient);
    this.refreshIngredients();
  }

  private refreshIngredients(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
