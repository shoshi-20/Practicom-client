export enum Gender { זכר=1,נקבה=2 }
export enum HMO { כללית=1, מכבי=2, מאוחדת=4, לאומית=8 }
export default class Person {
    constructor(public Id: string,
        public FirstName: string,
        public LastName: string,
        public DOB: Date,
        public Gender: Gender,
        public HMO: HMO
    ) { }
}