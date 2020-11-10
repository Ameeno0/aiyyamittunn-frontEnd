import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  response: any;
  type: string;
  description: string;
  noi: number;
  closeDialogue: boolean;
  currentUser = JSON.parse(localStorage.getItem('user'));
  constructor(
    public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public itemS: ItemsService
  ) {
    if (data.id) {
      this.getOneItem(data.id);
    }
  }

  ngOnInit(): void {}

  getOneItem(id) {
    this.itemS
      .getOneItem({ id })
      .then((data) => {
        this.response = data;
        this.type = this.response.data.type;
        this.description = this.response.data.description;
        this.noi = this.response.data.noi;
      })
      .catch((err) => console.log(err));
  }

  save() {
    const body = {
      type: this.type,
      description: this.description,
      noi: this.noi,
      _id: this.data.id,
      userType: this.currentUser.type,
    };
    if (this.data.type === 'edit') {
      this.itemS
        .updateItem({ body })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      this.itemS
        .addItem({
          type: body.type,
          description: body.description,
          noi: body.noi,
          userId: this.currentUser.pkid,
          fridgeId: this.data.fridgeId,
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }
}
