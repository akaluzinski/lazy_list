import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @Output()
  private readonly ingredientAdded = new EventEmitter<Ingredient>();

  ngOnInit(): void {}

  add({value}: NgForm): void {
    const { amount, name } = value;
    if (amount >= 0) {
      this.ingredientAdded.emit(new Ingredient(name, amount));
    }
  }
}
