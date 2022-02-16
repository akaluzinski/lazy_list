import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from './recipe.service';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  private recipeSelectedSubscription: Subscription;

  selectedRecipe: Recipe;

  constructor(private readonly recipeService: RecipeService,
              private readonly storageService: StorageService) {}

  ngOnInit(): void {

    this.storageService.loadRecipes().subscribe();

    this.recipeSelectedSubscription =
      this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
        this.selectedRecipe = recipe;
      });
  }

  ngOnDestroy(): void {
    this.recipeSelectedSubscription.unsubscribe();
  }
}
