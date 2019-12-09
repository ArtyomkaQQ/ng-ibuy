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
  private currentKeyword = '';

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  onProducts() {
    this.productsService.getProducts(this.currentPage, this.size)
      .subscribe(data => {
      this.totalPages = data['page'].totalPages;
      this.pages = new Array<number>(this.totalPages);
      this.products = data;
    }, error => {
      console.log(error);
    });
  }

  onProductsPage(i: number) {
    this.currentPage = i;
    this.onSearchProducts();
  }

  onSearch(form: any) {
    this.currentPage = 0;
    this.currentKeyword = form.keyword;
    this.onSearchProducts();
  }

  onSearchProducts() {
    this.productsService.getProductsByKeyword(this.currentKeyword, this.currentPage, this.size)
      .subscribe(data => {
        this.totalPages = data['page'].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.products = data;
      }, error => {
        console.log(error);
      });
  }

  onDeleteProduct(p: any) {
    const conf = confirm('Are you sure?');
    if (conf) {
      this.productsService.deleteProducts(p._links.self.href)
        .subscribe(data => {
          this.onSearchProducts();
        }, error => {
          console.log('Error deleting product');
        });
    }
  }

}
