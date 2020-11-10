import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/fridges', title: 'Fridges', icon: 'content_paste', class: '' },
];
const currentUser = JSON.parse(localStorage.getItem('user'));
if (currentUser) {
  ROUTES.unshift(
    { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
    {
      path: '/fridge-list',
      title: 'Fridge List',
      icon: 'content_paste',
      class: '',
    }
  );
} else {
  ROUTES.push({
    path: '/authenticate',
    title: 'Login/Signup',
    icon: 'person',
    class: '',
  });
}
if (currentUser && currentUser.type === 'admin') {
  ROUTES.unshift({
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    class: '',
  });
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
