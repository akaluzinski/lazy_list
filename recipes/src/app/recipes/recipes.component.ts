import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit, OnDestroy {
  private recipeSelectedSubscription: Subscription;

  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeSelectedSubscription =
      this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
        this.selectedRecipe = recipe;
      });
  }

  ngOnDestroy(): void {
    this.recipeSelectedSubscription.unsubscribe();
  }
}
