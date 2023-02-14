
import { eGender } from "../enums/Gender";
import { eHMO } from "../enums/HMO";

export default class Person{
   
    constructor(public FirstName:string,public LastName:string,public PersonId:string,public Gender:eGender,
        public DateOfBirth:Date,public HMO:eHMO){

    }
}