import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs';
import { appUrl } from '../config';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { map, tap } from 'rxjs/operators';

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

  loadRecipes(): Observable<Recipe[]> {
    return this.fetchRecipes().pipe(tap(recipes => this.recipeService.setRecipes(recipes)));
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.path)
      .pipe(map(recipes => recipes.map(recipe => ({...recipe, ingredients: recipe.ingredients ?? []
      }))
    ));
  }
}
