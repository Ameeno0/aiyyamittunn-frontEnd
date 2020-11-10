import { Component, OnInit, ViewChild } from '@angular/core';
import { FridgeService } from '../services/fridge.service';
import { ToastrService } from 'ngx-toastr';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fridges',
  templateUrl: './fridges.component.html',
  styleUrls: ['./fridges.component.css'],
})
export class FridgesComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  response: any;
  lat: number;
  lon: number;
  zoom = 12;
  fridges: any;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  markers = [];
  infoContent = '';

  constructor(
    public fridgeS: FridgeService,
    private toastr: ToastrService,
    public route: Router
  ) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.getFridgeBasedonLocation();
      this.markers.push({
        position: {
          lat: this.center.lat,
          lng: this.center.lng,
        },
        label: {
          color: 'red',
          text: 'My Location',
        },
        title: 'My Location',
        options: {
          animation: google.maps.Animation.BOUNCE,
        },
      });
    });
  }

  getFridgeBasedonLocation() {
    const query = {
      lat: this.center.lat,
      lon: this.center.lng,
    };
    this.fridgeS
      .getFridgeByLocation({ query })
      .then((data) => {
        this.response = data;
        this.fridges = this.response.data;
        this.fridges.map((val) => {
          this.markers.push({
            position: {
              lat: val.location.coordinates[1],
              lng: val.location.coordinates[0],
            },
            label: {
              color: 'blue',
              text: 'Fridge',
            },
            title: 'My Location',
          });
        });
      })
      .catch((err) => console.log(err));
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }

  items(id) {
    this.route.navigate(['items'], { queryParams: { id } });
  }
}
