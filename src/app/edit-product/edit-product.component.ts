import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public curreProduct: Product;
  public url: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    this.url = atob(this.activatedRoute.snapshot.params.id);
    this.productsService.getProduct(this.url)
      .subscribe(data => {
        this.curreProduct = data;
      }, error => {
        console.log(error);
    });
  }

  onUpdateProduct(value: any) {
    this.productsService.updateProduct(this.url, value)
      .subscribe(data => {
        alert('Update succeeded');
        this.router.navigateByUrl('/products');
      }, error => {
        console.log(error);
      });
  }

}
