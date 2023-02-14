import { Component, OnInit } from '@angular/core';

import Child from '../models/Child';
import Person from '../models/Person';
import ChildService from '../services/service.child';
import PersonService from '../services/service.person';

import { Workbook } from 'exceljs';
import * as Excel from 'exceljs/dist/exceljs.min.js';
 import * as fs from 'file-saver';
import { eHMO } from '../enums/HMO';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
child:Child=new Child("","",new Date(),"")
  constructor(public personSer:PersonService,public childSer:ChildService) { }

  ngOnInit(): void {
  }
  save(form){
this.personSer.person.Gender=Number(this.personSer.person.Gender)
this.personSer.person.HMO=Number(this.personSer.person.HMO)
this.personSer.Add(this.personSer.person).subscribe(succ=>console.log(succ));
for (let index = 0; index < this.childSer.children.length; index++) {
  this.childSer.children[index].ParentId=this.personSer.person.PersonId;
  this.childSer.Add(this.childSer.children[index]).subscribe(succ=>console.log(succ));
}
    this.downloadExcel();
//form.reset();
  }
  addChild(n,d,t){
    //this.child.ParentId=this.personSer.person.PersonId
    this.childSer.children.push(new Child(this.child.FirstName,this.child.ChildId,this.child.DateOfBirth,this.child.ParentId));
    n.value="";
    d.value="";
    t.value="";
  }

 downloadExcel()
 {
  let workbook = new Excel.Workbook();
 let  worksheet = workbook.addWorksheet("Employee Data");

  let  header=["first anme","last name","id","date of birth","gender","HMO"];
 let headerRow =worksheet.addRow(header);

  let temp1=[]
 
  for (let x1 of Object.keys(this.personSer.person))
  { 
    if(x1=="HMO")
    temp1.push(eHMO[this.personSer.person[x1]])  
    else
      temp1.push(this.personSer.person[x1])    
  
  }
  worksheet.addRow(temp1)
  let  header2=["child name","child id"," child date of birth"];
  worksheet.addRow(header2)

  for (let x1 of this.childSer.children)
  {
    let x2=Object.keys(x1);
    let temp=[]
    for(let y of x2)
    {
      temp.push(x1[y])
    }
   worksheet.addRow(temp)
  }


  let fname="Emp Data Sep 2020"

//add data and file name and download
   workbook.xlsx.writeBuffer().then((data) => {
  let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
});

 }
}
