import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput')
  private readonly nameInput: ElementRef;

  @ViewChild('amountInput')
  private readonly amountInput: ElementRef;

  @Output()
  private readonly ingredientAdded = new EventEmitter<Ingredient>();

  ngOnInit(): void {}

  add(): void {
    const name = this.nameInput.nativeElement.value;
    const amount = Number(this.amountInput.nativeElement.value);

    this.ingredientAdded.emit(new Ingredient(name, amount));
  }
}
