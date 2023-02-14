import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Child from 'src/models/Child';
import Client from 'src/models/Client';
import ChildService from '../services/child.service';
import ClientService from '../services/client.service';
import { UserService } from '../services/user.service';
// import swal from 'sweetalert';
// import { createTokenForExternalReference } from '@angular/compiler/src/identifiers';
// import ExcelService from '../services/excel.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  client: Client = new Client(0, " ", " ", " ", null, null, null,null);
  id: number;
  children: Child[] = [];
  child: Child = new Child(0, " ", " ", null);
  isChild: boolean = false;
  data = []
  thisDate:Date
  constructor(private router: Router, public userService: UserService, public clientService: ClientService,
    // public childService: ChildService, private excelServ: ExcelService) {
      public childService: ChildService) {
    console.log(this.userService.thisUser)
    // this.thisDate.getDate()
  }
  ngOnInit(): void {
    this.client = this.userService.getFromStorage();
    console.log(this.userService.getFromStorage());
  }
  ngOnDestroy() {
    this.userService.setInStorage(this.client);
  }
  save(form) {
    this.children.push(this.child);
    this.client.Children=this.children
    console.log(this.client)
    this.data.push(this.client)
    // this.excelServ.exportexcel(this.data, (this.client.FName) + '-excel')
    // swal("מצוין!", "המידע נשמר בהצלחה!", "success");
    this.clientService.Add(this.client).subscribe(succ => {
      form.reset();
    })
  }
  addChild() {
    console.log(this.children)
    this.children.push(this.child);
    console.log(this.child)
    this.child = new Child("", " ", new Date(), null);
  }
  openChild() {
    this.isChild = true;
  }
}
