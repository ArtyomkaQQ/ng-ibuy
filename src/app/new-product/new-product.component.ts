import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
  }

  onSaveProduct(data: any) {
    this.productsService.saveProduct(this.productsService.host + '/products', data)
      .subscribe(res => {
        this.router.navigateByUrl('/products');
      }, error => {
        console.log('Error saving product');
      });
  }

}
