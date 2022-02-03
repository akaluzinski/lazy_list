import { Component } from '@angular/core';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  constructor(private readonly storageService: StorageService) {
  }

  saveData(): void {
    this.storageService.storeRecipes().subscribe(response => console.log('Save recipes'));
  }

  loadData(): void {
    this.storageService.loadRecipes().subscribe();
  }
}
