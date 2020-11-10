import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
export interface User {
  pkid: number;
  userName: string;
  email: string;
  mobile: string;
  type: string;
  adress: string;
  firstName: String;
  lastName: string;
  city: string;
  country: string;
  postalCode: number;
  aboutMe: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user'));

  userBody: User = this.currentUser;
  respose;

  constructor(public userS: UserService, private toastr: ToastrService) {}

  ngOnInit() {}

  update() {
    const pkid = this.userBody.pkid;
    delete this.userBody.pkid;
    this.userS.updateUser({ pkid, body: this.userBody }).then((data) => {
      this.respose = data;
      this.userBody.pkid = pkid;
      localStorage.setItem('user', JSON.stringify(this.respose.data));
      this.toastr.success(this.respose.message);
    });
  }
}
