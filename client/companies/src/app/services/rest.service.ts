import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      observe: "body",
      responseType: 'json'
    });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body, {
      observe: "body",
      responseType: 'json'
    });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body, {
      observe: "body",
      responseType: 'json'
    });
  }

  del(url: string): Observable<any> {
    return this.http.delete(url, {
      observe: "body",
      responseType: 'text'
    });
  }
}
