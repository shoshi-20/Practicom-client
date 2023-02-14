import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Child from 'src/models/Child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
children:Child[]=[]
prevChildren:Child[]=[]
  constructor(public http: HttpClient) { }
  routeUrl = `${environment.baseUrl}/Child`;
// currentChild$ = new BehaviorSubject<Child>(null);
  addChild(c:Child) {
    return this.http.post<Child>(`${this.routeUrl}`, c);
  }

}