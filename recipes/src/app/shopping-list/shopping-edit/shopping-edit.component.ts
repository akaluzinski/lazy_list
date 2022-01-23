import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingEditForm')
  shoppingListForm: NgForm;

  @Output()
  private readonly ingredientAdded = new Subject<Ingredient>();

  private subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private readonly shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem({ value }: NgForm): void {
    const { amount, name } = value;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
  }
}
