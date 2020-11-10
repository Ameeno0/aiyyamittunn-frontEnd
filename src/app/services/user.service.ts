import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface User {
  userName: string;
  email: string;
  mobile: string;
  type: string;
  adress: string;
  firstName: String;
  lastName: string;
  city: string;
  country: string;
  postalCode: number;
  aboutMe: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = environment.apiBase;
  route = 'user';

  constructor(public http: HttpClient) {}

  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post(`${this.baseURL}/${this.route}/login`, {
        email,
        password,
      })
      .toPromise();
  }

  signup({
    email,
    password,
    userName,
    mobile,
    type = 'user',
  }: {
    email: string;
    password: string;
    userName: string;
    mobile: string;
    type?: string;
  }) {
    return this.http
      .post(`${this.baseURL}/${this.route}/create`, {
        email,
        password,
        userName,
        mobile,
        type,
      })
      .toPromise();
  }

  getAllUsers({ query }: { query?: any }) {
    return this.http
      .get(`${this.baseURL}/${this.route}/`, { params: query })
      .toPromise();
  }

  getOneUser({ pkid }: { pkid: number }) {
    return this.http.get(`${this.baseURL}/${this.route}/${pkid}`).toPromise();
  }

  promoteUser({ pkid, type }: { pkid: number; type: string }) {
    return this.http
      .patch(`${this.baseURL}/${this.route}/promoteUser`, { pkid, type })
      .toPromise();
  }

  updateUser({ pkid, body }: { pkid: number; body: User }) {
    return this.http
      .patch(`${this.baseURL}/${this.route}/update/${pkid}`, body)
      .toPromise();
  }
}
