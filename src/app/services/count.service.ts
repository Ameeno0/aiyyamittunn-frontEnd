import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  baseURL = environment.apiBase;
  route = 'count';

  constructor(public http: HttpClient) {}

  getCount() {
    return this.http.get(`${this.baseURL}/${this.route}`).toPromise();
  }
}
