import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shopping-list/ingredient.model';
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

  constructor() {}

  ngOnInit(): void {}
}
