import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  @ViewChild('container', { static: false }) container: ElementRef;
  suserName: string;
  semail: string;
  spassword: string;
  smobile: number;
  lpassword: string;
  lemail: string;
  userDetails: any;
  sType: string;

  currentUser = localStorage.getItem('user');

  constructor(
    public route: Router,
    public userS: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.currentUser) {
      this.route.navigate(['fridge-list']);
    }
  }

  click(event) {
    if (event) {
      this.container.nativeElement.classList.add('right-panel-active');
    } else {
      this.container.nativeElement.classList.remove('right-panel-active');
    }
  }

  singIn() {
    if (!this.lemail || !this.lpassword) {
      this.toastr.error('Please enter all the required fields');
      return;
    }
    const body = {
      email: this.lemail,
      password: this.lpassword,
    };

    this.userS
      .login(body)
      .then((data) => {
        console.log(data);
        this.userDetails = data;
        localStorage.setItem('user', JSON.stringify(this.userDetails.data));
        window.location.reload();
        this.route.navigate(['']);
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Something Went Wrong');
      });
  }

  singUp() {
    if (!this.semail || !this.spassword || !this.smobile || !this.smobile) {
      this.toastr.error('Please enter all the required fields');
      return;
    }
    const body = {
      email: this.semail,
      password: this.spassword,
      userName: this.suserName,
      mobile: `${this.smobile}`,
    };

    this.userS
      .signup(body)
      .then((data) => {
        console.log(data);
        this.toastr.success('Signup Successful');
        this.userDetails = data;
        localStorage.setItem('user', JSON.stringify(this.userDetails));
        window.location.reload();
        this.route.navigate(['']);
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Something Went Wrong');
      });
  }
}
