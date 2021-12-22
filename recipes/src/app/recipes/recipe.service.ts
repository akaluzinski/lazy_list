import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Kaszanka',
      'Taka dziwna kiełbasa',
      'https://przepisyjoli.com/wp-content/uploads/2016/03/DSC0112.jpg'
    ),
    new Recipe(
      'Chili con carne',
      'OSTRE!!!',
      'http://1.bp.blogspot.com/-QQRIVGzExDg/UQfIMNXtmRI/AAAAAAAAE18/zCPO-vGCui4/s1600/DSC_0037.JPG'
    ),
  ];

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }
}
