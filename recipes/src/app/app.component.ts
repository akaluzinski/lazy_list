import { Component } from '@angular/core';

export enum MenuItem {
  Recipes = 'Recipes',
  ShoppingList = 'ShoppingList',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'recipes';

  menuItem = MenuItem;

  selectedMenuItem = MenuItem.Recipes;

  onSelectedMenu(menuItem: MenuItem): void {
    this.selectedMenuItem = menuItem;
  }
}
