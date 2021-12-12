import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() selectedMenu: EventEmitter<any> = new EventEmitter();

  menuItem = MenuItem;

  constructor() {}

  ngOnInit(): void {}

  selectMenu(menuItem: MenuItem) {
    console.log('Select: ', menuItem);
    this.selectedMenu.emit(menuItem);
  }
}
