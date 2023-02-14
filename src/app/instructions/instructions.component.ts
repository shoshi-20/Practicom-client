import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonService } from '../services/person.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Gender, HMO } from 'src/models/Person';
import { ChildService } from '../services/Child.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {
  personFirstName: string;
  personLastName: string;
  sub: Subscription;
  constructor(public personService: PersonService, public childService: ChildService) { }

  ngOnInit(): void {
    this.sub = this.personService.currentPerson$.subscribe(data => { this.personFirstName = data ? data.get('firstName')?.value : ""; this.personLastName = data ? data.get('lastName')?.value : "" });
  }
  downloadFile() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Person Data");
    let headerP = ["תעודת זהות", "שם פרטי", "שם משפחה", "תאריך לידה", "מין", "קופת חולים"];
    worksheet.addRow(headerP);
    let temp1 = [];
    for (let x of Object.keys(this.personService.prevPerson)) {
      if (x == "Gender")
        temp1.push(Gender[this.personService.prevPerson[x]]);
      else if (x == "HMO")
        temp1.push(HMO[this.personService.prevPerson[x]]);
      else
        temp1.push(this.personService.prevPerson[x]);
    }
    worksheet.addRow(temp1);
    let headerC = ["תעודת זהות ","שם מלא"," תאריך לידה"];
    worksheet.addRow(headerC);
    for (let c of this.childService.prevChildren) {
      let temp = [];
      // let child = Object.keys(c);     
      // for (let prop of child) {
      //   temp.push(c[prop])
      // }
      temp.push(c.Id);
      temp.push(c.Name);
      temp.push(c.DOB);
      worksheet.addRow(temp)
    }
    let fname = `Person Data ${new Date().toLocaleDateString()}`;
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
