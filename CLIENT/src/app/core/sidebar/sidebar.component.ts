import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

export const ROUTES: any[] = [
    { role :'admin', path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/events/calendar', title: "Calendar",  icon:'event', class: '' },
    { role :'admin', path: '/events/list', title: "Events List",  icon:'event_note', class: '' },
    { role :'admin', path: '/agents/list', title: "Agents List",  icon:'people', class: '' },
    { role :'admin', path: '/blogs/list', title: "Blogs List",  icon:'article', class: '' },
    { role :'admin', path: '/tools/list', title: "Tools List",  icon:'highlight', class: '' },
    { path: '/profile', title: "User Profile",  icon:'person', class: '' },
    { role :'admin',path: '/payments/list', title: "Payments List",  icon:'payment', class: '' },
    { role :'admin',path: '/contacts/list', title: "Contacts List",  icon:'contact_support', class: '' },
    { role :'admin',path: '/reviews/list', title: "Reviews List",  icon:'star_rate', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  isAdmin: any= "";

  constructor(public accountService : AccountService){
        let token =this.accountService.getDecodedToken();
    let currentRoles = token.roles;
    this.isAdmin = currentRoles.some(role => currentRoles.includes("admin"));
  }
  ngOnInit(): void {
    if (!this.isAdmin) {
      this.menuItems = ROUTES.filter(menuItem => !menuItem.role);
    }else{
      this.menuItems = ROUTES.map(x=>x)
      
    }
  }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
