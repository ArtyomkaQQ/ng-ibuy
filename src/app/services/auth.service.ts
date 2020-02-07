import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {JwtAutResponse} from '../auth/jwt-aut-response';
import {RegisterPayload} from '../auth/register-payload';
import {LoginPayload} from '../auth/login-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/api/auth/';
  private username: string;
  private userPassword: string;

  constructor(private httpClient: HttpClient, private localStoraqeService: LocalStorageService) {
  }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      this.localStoraqeService.store('authenticationToken', data.authenticationToken);
      this.localStoraqeService.store('username', data.username);
      this.username = loginPayload.username;
      this.userPassword = loginPayload.password;
      return true;
    }));
  }

  isAuthenticated(): boolean {
    return this.localStoraqeService.retrieve('username') != null;
  }

  getUser(): object {
    console.log(this.username, this.userPassword);
    // tslint:disable-next-line:prefer-const
    return {
      name: this.username,
      password: this.userPassword
    };
  }

  logout() {
    this.localStoraqeService.clear('authenticationToken');
    this.localStoraqeService.clear('username');
  }

}
