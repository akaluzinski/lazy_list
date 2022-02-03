import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs';
import { appUrl } from '../config';
import { Recipe } from '../recipes/recipe-list/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly path = `${appUrl}/recipes.json`;

  constructor(private readonly http: HttpClient,
              private readonly recipeService: RecipeService) { }

  storeRecipes(): Observable<object> {
    return this.http.put(this.path, this.recipeService.getRecipes());
  }

  // TODO load photos from drive
  // TODO integrate with listonic
  // TODO autosave, autoload

  loadRecipes(): void {
    this.fetchRecipes().subscribe((response: Recipe[]) => this.recipeService.setRecipes(response));
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.path);
  }
}
