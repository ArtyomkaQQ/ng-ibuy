import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private currentUser: User;
  private url: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.url = 'http://localhost:8080/users/search/findByUsername?username=' + this.authService.username;
    console.log(this.authService.username);
    this.authService.getUser(this.url)
      .subscribe(data => {
        this.currentUser = data;
        console.log(this.currentUser);
      }, error => {
        console.log(error);
      });
  }

  onUpdateUser(value: any) {
    this.authService.updateUser(this.url, value)
      .subscribe(data => {
        alert('Update succeeded');
        this.router.navigateByUrl('/home');
      }, error => {
        console.log(error);
      });
  }

}
