import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  baseURL = environment.apiBase;
  route = 'item';

  constructor(public http: HttpClient) {}

  getItems({ query }) {
    return this.http
      .get(`${this.baseURL}/${this.route}/`, { params: query })
      .toPromise();
  }
  getOneItem({ id }: { id: string }) {
    return this.http
      .get(`${this.baseURL}/${this.route}/getOne/${id}`)
      .toPromise();
  }

  addItem({
    type,
    description,
    userId,
    noi,
    fridgeId,
  }: {
    type: string;
    description: string;
    userId: number;
    noi: number;
    fridgeId: string;
  }) {
    return this.http
      .post(`${this.baseURL}/${this.route}/add`, {
        type,
        description,
        userId,
        noi,
        fridgeId,
      })
      .toPromise();
  }

  updateItem({ body }: { body: any }) {
    return this.http
      .patch(`${this.baseURL}/${this.route}/update`, body)
      .toPromise();
  }
}
