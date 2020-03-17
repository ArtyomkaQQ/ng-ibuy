import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Router} from '@angular/router';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public currentProduct: Product;
  public mode = 1;

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
  }

  onSaveProduct(data: any) {
    console.log(data);
    this.productsService.saveProduct(this.productsService.host + '/products', data)
      .subscribe(res => {
        // this.router.navigateByUrl('/products');
        this.currentProduct = res;
        this.mode = 2;
      }, error => {
        console.log('Error saving product');
      });
  }

  onNewProduct() {
    this.mode = 1;
  }

}
