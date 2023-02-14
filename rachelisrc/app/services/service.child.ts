import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { environment } from "projectsrc/environments/environment";
import Child from "../models/Child";

@Injectable({
    providedIn:"root"
})
export default class ChildService{
    constructor(public http: HttpClient)
    {
    }
    children:Child[]=[];
    // routeUrl = `${environment.baseUrl}/Person`;
    Add(c1:Child) {
      console.log("add child")
      return this.http.post<Child>(`https://localhost:44395/api/Child`,c1);
    }

}