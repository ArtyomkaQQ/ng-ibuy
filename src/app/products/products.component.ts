import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: any;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  onGetProducts() {
    this.productsService.getProducts()
      .subscribe(data => {
      this.products = data;
    }, error => {
      console.log(error);
    });
  }

}
