import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProfilePayload} from './profile-payload';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm: FormGroup;
  profilePayload: ProfilePayload;

  private currentUser: any;
  private url: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.editForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
    });
    this.profilePayload = {
      username: '',
      email: '',
      password: ''
    };
  }

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

  onSubmit() {
    console.log(this.url);

    this.authService.deleteUser(this.url);

    this.profilePayload.username = this.editForm.get('username').value;
    this.profilePayload.email = this.editForm.get('email').value;
    this.profilePayload.password = this.editForm.get('password').value;

    this.authService.editProfile(this.profilePayload).subscribe(data => {
      console.log('profile editing succeeded');
      this.router.navigateByUrl('/login');
    }, error => {
      console.log('register failed');
    });
  }

}
