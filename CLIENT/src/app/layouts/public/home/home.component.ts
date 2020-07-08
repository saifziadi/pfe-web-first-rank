import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  connected : boolean = false
  constructor(private accountService: AccountService) {
    let token = this.accountService.getDecodedToken();
    this.connected = token ? true : false
  }

  ngOnInit(): void {
  }

}
