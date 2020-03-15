import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

declare const loader: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onClickHome() {
    loader();
    window.location.href = 'http://localhost:4200/home';
  }

  logout() {
    this.authService.logout();
    loader();
    window.location.href = 'http://localhost:4200/login';
  }

  onClickLogin() {
    loader();
    window.location.href = 'http://localhost:4200/login';
  }

  onClickRegister() {
    loader();
    window.location.href = 'http://localhost:4200/register';
  }

  onClickProducts() {
    loader();
    window.location.href = 'http://localhost:4200/products';
  }

  onClickAddProduct() {
    loader();
    window.location.href = 'http://localhost:4200/add-product';
  }

  onClickEditProfile() {
    loader();
    window.location.href = 'http://localhost:4200/edit-profile/' + this.authService.username;
  }
}
