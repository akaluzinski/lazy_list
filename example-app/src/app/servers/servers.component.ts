import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  status = 'No servers.';

  onCreateServer(): void {
    this.status = 'Loading';
  }

  onUpdateServer(event: any): void {
    this.status = event.target.value;
  }
}
