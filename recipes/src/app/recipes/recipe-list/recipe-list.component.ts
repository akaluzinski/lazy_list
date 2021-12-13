import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
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

  @Output()
  readonly selectedRecipe = new EventEmitter<Recipe>();

  onSelectedRecipe(recipe: Recipe): void {
    this.selectedRecipe.emit(recipe);
  }

  constructor() {}
}
