import {
  Component,
  OnInit,
} from '@angular/core';
import { ItemsService } from '../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../modals/item/item.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  response: any;
  items: any[];
  total: Number;
  count: Number;
  query = {
    page: 1,
    count: 10,
  };
  fridgeId: string;
  currentUser = JSON.parse(localStorage.getItem('user'));
  constructor(
    public itemS: ItemsService,
    private actRoute: ActivatedRoute,
    public route: Router,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe((params) => {
      if (params && params.id) {
        this.query = Object.assign(this.query, { fridgeId: params.id });
        this.fridgeId = params.id;
      }
    });
    this.getItems();
  }

  getItems() {
    this.itemS
      .getItems({ query: this.query })
      .then((data) => {
        this.response = data;
        this.items = this.response.data;
        this.total = this.response.total;
        this.count = this.response.count;
      })
      .catch((err) => console.log(err));
  }

  handlePage(e) {
    console.log(e);
    this.query.page = e.pageIndex + 1;
    this.getItems();
  }

  openDialog(type = 'new', id = ''): void {
    if (!this.currentUser) {
      return;
    }
    console.log('modal open');
    const dialogRef = this.dialog.open(ItemComponent, {
      width: '50%',
      height: 'auto',
      data: {
        type,
        id,
        fridgeId: this.fridgeId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        this.getItems();
      }
    });
  }
}
