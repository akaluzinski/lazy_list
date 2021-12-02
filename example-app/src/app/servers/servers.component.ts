import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  status = 'No servers.';
  servers = ['ServerA', 'DC2'];

  onCreateServer(): void {
    this.status = 'Loading';
    this.servers.push(this.getUUID());
  }

  onUpdateServer(event: any): void {
    this.status = event.target.value;
  }

  getUUID(): string {
    return uuidv4();
  }
}
