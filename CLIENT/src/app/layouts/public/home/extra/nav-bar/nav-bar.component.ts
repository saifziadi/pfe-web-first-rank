import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  connected : boolean = false
  constructor(private accountService: AccountService) {
    let token = this.accountService.getDecodedToken();
    this.connected = token ? true : false
  }
}
