// import { Component, OnInit } from '@angular/core';
// import Child from 'src/models/Child';
// import Person, { Gender, HMO } from 'src/models/Person';
// import { ChildService } from '../services/Child.service';
// import { PersonService } from '../services/person.service';

// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.scss']
// }) 

// export class FormComponent implements OnInit {

// // constructor(public personService:PersonService,public childService:ChildService) { }
// person:Person=new Person(null,null,null,null,null,null);
// child:Child=new Child(null,null,null,null);
// children:Child[]=[];

//   ngOnInit(): void {
//   }
//    add(myForm){
//    }
// }
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, } from '@angular/forms';
import Person, { Gender, HMO } from 'src/models/Person';
import { PersonService } from '../services/person.service';
import { ChildService } from '../services/Child.service';
import { Router } from '@angular/router';
import Child from 'src/models/Child';

import { MatCardModule } from '@angular/material/card';
// import swal from 'sweetalert';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  public allForm: FormGroup;
  Gender = Gender;
  HMO = HMO;
  parentId: string
  constructor(private fb: FormBuilder, public personService: PersonService, public childService: ChildService, public router: Router) { }
  ngOnInit(): void {
    this.allForm = this.fb.group({
      id: [this.personService.person.Id ? this.personService.person.Id : "", [Validators.required, Validators.pattern(/[0-9]/), Validators.maxLength(9), Validators.minLength(9)]],
      firstName: [this.personService.person.FirstName ? this.personService.person.FirstName : "", [Validators.required, Validators.pattern(/[a-zA-Zא-ת ]/)]],
      lastName: [this.personService.person.LastName ? this.personService.person.LastName : "", [Validators.required, Validators.pattern(/[a-zA-Zא-ת ]/)]],
      dateOfBirth: [this.personService.person.DOB ? this.personService.person.DOB : "", [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(new Date().getFullYear() - 100)]],
      gender: [this.personService.person.Gender ? Gender[this.personService.person.Gender] : 0, [Validators.required]],
      hmo: [this.personService.person.HMO ? HMO[this.personService.person.HMO] : 0, [Validators.required]],
      children: new FormArray([]),
    })
    if (this.childService.children.length > 0)
      for (let item of this.childService.children) {
        this.children.push(new FormGroup({
          childId: this.fb.control(item.Id, [Validators.required, Validators.pattern(/[0-9]/), Validators.maxLength(9), Validators.minLength(9)]),
          childName: this.fb.control(item.Name, [Validators.required, Validators.pattern(/[a-zA-Zא-ת ]+\s+[a-zA-Zא-ת ]/)]),
          childDateOfBirth: this.fb.control(item.DOB, [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(new Date().getFullYear() - 100)])
        }));
      }
  }
  ngOnDestroy(): void {
    this.personService.currentPerson$.next(this.allForm);
    this.update();
  }
  update() {
    this.personService.person.Id = this.allForm.get('id') ? this.allForm.get('id').value : '';
    this.personService.person.FirstName = this.allForm.get('firstName') ? this.allForm.get('firstName').value : "";
    this.personService.person.LastName = this.allForm.get('lastName') ? this.allForm.get('lastName').value : "";
    this.personService.person.DOB = this.allForm.get('dateOfBirth')?this.allForm.get('dateOfBirth').value:new Date();
    this.personService.person.Gender =this.allForm.get('gender').value? +Gender[this.allForm.get('gender').value]:0;
    this.personService.person.HMO =this.allForm.get('hmo')? +HMO[this.allForm.get('hmo').value]:0;
    for (let item of this.allForm.get('children')?.value) {
      this.childService.children.push(new Child(
        item.childId, item.childName, item.childDateOfBirth, this.allForm.get('id').value))
    }
  }
  get children() {
    return this.allForm.get('children') as FormArray;
  }
  addChild() {
    this.children.push(new FormGroup({
      childId: this.fb.control('', [Validators.required, Validators.pattern(/[0-9]/), Validators.maxLength(9), Validators.minLength(9)]),
      childName: this.fb.control('', [Validators.required, Validators.pattern(/[a-zA-Zא-ת ]+\s+[a-zA-Zא-ת ]/)]),
      childDateOfBirth: this.fb.control('', [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(new Date().getFullYear() - 100)])
    }));
  }
  submit(form) {
    this.update();
    this.personService.addPerson(this.personService.person).subscribe((succ) => {
      console.log(succ);
    });
    this.childService.prevChildren=[]; 
    for (let child of this.childService.children) {
      this.childService.prevChildren.push(child);
      this.childService.addChild(child).subscribe((succ) => {
        console.log(succ);
      });
    }
    this.personService.prevPerson = this.personService.person;
    this.personService.person = new Person("", "", "", new Date(), 0, 0);
    this.childService.children=[];
    form.reset();
    alert("הטופס נשלח בהצלחה!!")
    this.router.navigate(['/instructions']);
  }
}