import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Kaszanka',
      'Taka dziwna kiełbasa',
      'https://przepisyjoli.com/wp-content/uploads/2016/03/DSC0112.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
