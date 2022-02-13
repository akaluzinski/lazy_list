import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  user: User;

  private userSubscription: Subscription;

  constructor(private readonly storageService: StorageService,
              private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  saveData(): void {
    this.storageService.storeRecipes().subscribe(response => console.log('Save recipes'));
  }

  loadData(): void {
    this.storageService.loadRecipes().subscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
