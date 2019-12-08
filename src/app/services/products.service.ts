import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public host = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  public getProducts(page: number, size: number) {
    return this.httpClient.get(this.host + '/products?page=' + page + '&size=' + size);
  }

}
