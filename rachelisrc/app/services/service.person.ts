import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { environment } from "projectsrc/environments/environment";
import Person from "../models/Person";
@Injectable({
    providedIn:"root"
})
export default class PersonService{
    constructor(public http: HttpClient)
    {
    }
    person:Person=new Person("","","",0,new Date(),0)
    // routeUrl = `${environment.baseUrl}/Person`;
    Add(p1:Person) {
      console.log("add")
      return this.http.post<Person>(`https://localhost:44395/api/Person`,p1);
    }
}