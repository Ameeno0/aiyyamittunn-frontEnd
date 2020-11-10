import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CountService } from '../services/count.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userRes: any;
  users: any;
  response: any;
  constructor(
    public userS: UserService,
    public countS: CountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCount();
    this.getAllUser();
  }

  getAllUser() {
    this.userS.getAllUsers({}).then((data) => {
      console.log(data);
      this.userRes = data;
      this.users = this.userRes.data;
    });
  }
  getCount() {
    this.countS.getCount().then((data) => {
      this.response = data;
      console.log(this.response);
    });
  }
  promoteUser(pkid, type) {
    this.userS.promoteUser({ pkid, type }).then((data) => {
      this.toastr.success(`User promoted as ${type}`);
    });
  }
}
