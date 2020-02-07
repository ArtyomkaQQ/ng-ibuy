import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Router} from '@angular/router';

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

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
  }

  onProducts() {
    this.productsService.getProducts(this.currentPage, this.size)
      .subscribe(data => {
      // @ts-ignore
        this.totalPages = data.page.totalPages;
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
        // @ts-ignore
        this.totalPages = data.page.totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.products = data;
      }, error => {
        console.log(error);
      });
  }

  onDeleteProduct(p: any) {
    const conf = confirm('Are you sure?');
    if (conf) {
      this.productsService.deleteProduct(p._links.self.href)
        .subscribe(data => {
          this.onSearchProducts();
        }, error => {
          console.log('Error deleting product');
        });
    }
  }

  onEditProduct(p: any) {
    const url = p._links.self.href;
    this.router.navigateByUrl('/edit-product/' + btoa(url));
  }

}
