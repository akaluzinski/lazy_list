import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  status: string;

  @Input()
  name = 'unknown';

  constructor() {
    this.randomizeStatus();
  }

  ngOnInit(): void {}

  getColor(): string {
    return this.isOnline() ? 'green' : 'red';
  }

  randomizeStatus(): void {
    this.status = Math.random() >= 0.5 ? 'online' : 'offline';
  }

  isOnline(): boolean {
    return this.status === 'online';
  }
}
