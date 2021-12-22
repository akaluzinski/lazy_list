import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shopping-list/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input()
  recipe: Recipe;

  @Output()
  recipeChange = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  toShoppingList(): void {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
