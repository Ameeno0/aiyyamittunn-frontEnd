import { Component, OnInit } from '@angular/core';
import { FridgeService } from '../services/fridge.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FridgeComponent } from '../modals/fridge/fridge.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user'));
  coordinates = JSON.parse(localStorage.getItem('coordinates'));
  response: any;
  fridges: any[];
  total: Number;
  count: Number;
  query = {
    page: 1,
    count: 10,
  };
  constructor(
    public fridgeS: FridgeService,
    public route: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFridgeBasedonLocation();
  }

  getFridgeBasedonLocation() {
    const query = {
      lat: this.coordinates[0],
      lon: this.coordinates[1],
    };
    this.fridgeS
      .getFridgeByLocation({ query })
      .then((data) => {
        this.response = data;
        this.fridges = this.response.data;
        // this.fridges = this.response.data.map((data) => {
        //   if (
        //     this.currentUser &&
        //     this.currentUser === 'coordinator' &&
        //     this.currentUser.pkid === data.coordinatorId
        //   ) {
        //     data.showEdit = true;
        //   } else if (this.currentUser && this.currentUser === 'admin') {
        //     data.showEdit = true;
        //   }
        // });
        this.total = this.response.total;
        this.count = this.response.count;
      })
      .catch((err) => console.log(err));
  }

  getFridges() {
    this.fridgeS
      .getFridge({ query: this.query })
      .then((data) => {
        this.response = data;
        this.fridges = this.response.data;
        // this.fridges = this.response.data.map((data) => {
        //   if (
        //     this.currentUser &&
        //     this.currentUser === 'coordinator' &&
        //     this.currentUser.pkid === data.coordinatorId
        //   ) {
        //     data.showEdit = true;
        //   } else if (this.currentUser && this.currentUser === 'admin') {
        //     data.showEdit = true;
        //   }
        // });
        this.total = this.response.total;
        this.count = this.response.count;
      })
      .catch((err) => console.log(err));
  }

  handlePage(e) {
    console.log(e);
    this.query.page = e.pageIndex + 1;
    this.getFridges();
  }

  items(id) {
    this.route.navigate(['items'], { queryParams: { id } });
  }

  openDialog(): void {
    if (!this.currentUser) {
      return;
    }
    console.log('modal open');
    const dialogRef = this.dialog.open(FridgeComponent, {
      width: '50%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        this.getFridges();
      }
    });
  }
}
