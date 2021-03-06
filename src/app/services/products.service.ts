import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public host = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  public getProducts(page: number, size: number) {
    return this.httpClient.get(this.host + '/products?page=' + page + '&size=' + size);
  }

  public getProductsByKeyword(mc: string, page: number, size: number) {
    return this.httpClient.get(this.host + '/products/search/by_description_page?mc=' + mc + '&page=' + page + '&size=' + size);
  }

  public deleteProduct(url) {
    return this.httpClient.delete(url);
  }

  public saveProduct(url, data): Observable<any> {
    return this.httpClient.post(url, data);
  }

  public getProduct(url): Observable<any> {
    return this.httpClient.get(url);
  }

  public updateProduct(url, data): Observable<any> {
    return this.httpClient.put(url, data);
  }

}
