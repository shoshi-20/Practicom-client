import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Person from 'src/models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(public http: HttpClient) { }
  routeUrl = `${environment.baseUrl}/Person`;
  person:Person=new Person("","","",new Date(),0,0)
  prevPerson:Person=new Person("","","",new Date(),0,0)
currentPerson$ = new BehaviorSubject<FormGroup>(null);
  addPerson(p: Person) {
    return this.http.post<Person>(`${this.routeUrl}`, p);
  }

}