import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shopping-list/ingredient.model';
import { Recipe } from './recipe-list/recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Kaszanka z cebulką',
      'Taka dziwna kiełbasa',
      'https://przepisyjoli.com/wp-content/uploads/2016/03/DSC0112.jpg',
      [new Ingredient('Cebula', 1), new Ingredient('Kaszanka', 1)]
    ),
    new Recipe(
      'Chili con carne',
      'OSTRE!!!',
      'http://1.bp.blogspot.com/-QQRIVGzExDg/UQfIMNXtmRI/AAAAAAAAE18/zCPO-vGCui4/s1600/DSC_0037.JPG',
      [
        new Ingredient('Pomidory w puszce', 2),
        new Ingredient('Chilli', 1),
        new Ingredient('Mielone', 1),
      ]
    ),
  ];

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }
}
