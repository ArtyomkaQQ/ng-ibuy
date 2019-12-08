import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: any;
  public size = 5;
  public currentPage = 0;
  public totalPages: number;
  public pages: Array<number>;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  onGetProducts() {
    this.productsService.getProducts(this.currentPage, this.size)
      .subscribe(data => {
      this.totalPages = data['page'].totalPages;
      this.pages = new Array<number>(this.totalPages);
      this.products = data;
    }, error => {
      console.log(error);
    });
  }

  onGetProductsPage(i: number) {
    this.currentPage = i;
    this.onGetProducts();
  }

}
