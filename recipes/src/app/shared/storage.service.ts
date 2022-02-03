import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs';
import { appUrl } from '../config';

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

}
