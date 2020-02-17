import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {JwtAutResponse} from '../auth/jwt-aut-response';
import {RegisterPayload} from '../auth/register-payload';
import {LoginPayload} from '../auth/login-payload';
import {ProfilePayload} from '../edit-profile/profile-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/api/auth/';
  public username: string;
  public userPassword: string;

  constructor(private httpClient: HttpClient, private localStoraqeService: LocalStorageService) {
  }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  editProfile(profilePayload: ProfilePayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', profilePayload);
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

  public getUser(url): Observable<any> {
    return this.httpClient.get(url);
  }

  public deleteUser(url) {
    return this.httpClient.delete(url);
  }

  logout() {
    this.localStoraqeService.clear('authenticationToken');
    this.localStoraqeService.clear('username');
  }

}
