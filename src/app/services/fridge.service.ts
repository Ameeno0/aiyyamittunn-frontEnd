import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  baseURL = environment.apiBase;
  route = 'fridge';

  constructor(public http: HttpClient) {}

  getFridge({ query }) {
    return this.http
      .get(`${this.baseURL}/${this.route}/`, { params: query })
      .toPromise();
  }

  getFridgeByLocation({ query }) {
    return this.http
      .get(`${this.baseURL}/${this.route}/location`, { params: query })
      .toPromise();
  }

  createFridge({
    coordinates,
    address,
    coordinatorId,
  }: {
    coordinatorId: number;
    address: string;
    coordinates: any[number];
  }) {
    return this.http
      .post(`${this.baseURL}/${this.route}/location`, {
        coordinates,
        address,
        coordinatorId,
      })
      .toPromise();
  }
}
