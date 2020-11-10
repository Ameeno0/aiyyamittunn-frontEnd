import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public lat;
  public lng;
  currentUser = JSON.parse(localStorage.getItem('user'));

  constructor(public route: Router) {}

  public ngOnInit(): void {
    this.getLocation();
    if (!this.currentUser) {
      this.route.navigate(['fridges']);
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            localStorage.setItem(
              'coordinates',
              JSON.stringify([this.lat, this.lng])
            );
          }
        },
        (error: PositionError) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
