import { Component, OnInit } from '@angular/core';

declare const loader: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClickProducts() {
    loader();
    window.location.href = 'http://localhost:4200/products';
  }
}
