import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FridgeService } from '../../services/fridge.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css'],
})
export class FridgeComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user'));
  response: any;
  lat: number;
  lon: number;
  address: string;
  coordinatorId: number;
  coordinators: any;
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  constructor(
    public dialogRef: MatDialogRef<FridgeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fridgeS: FridgeService,
    public userS: UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getCoordinator();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  getCoordinator() {
    // tslint:disable-next-line: no-shadowed-variable
    const query = {
      type: JSON.stringify({ $in: ['coordinator', 'admin'] }),
    };
    this.userS
      .getAllUsers({ query })
      .then((data) => {
        this.response = data;
        this.coordinators = this.response.data;
      })
      .catch((err) => console.log(err));
  }

  save() {
    this.fridgeS
      .createFridge({
        coordinates: [this.lon, this.lat],
        address: this.address,
        coordinatorId: this.coordinatorId,
      })
      .then((data) => {
        console.log(data);
        this.toastr.success('Fridge Created Successfully');
      })
      .catch((err) => console.log(err));
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) {
      this.zoom++;
    }
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) {
      this.zoom--;
    }
  }

  click(event: google.maps.MouseEvent) {
    console.log(event);
  }
}
