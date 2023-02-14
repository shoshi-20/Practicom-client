import { FormControl, ValidationErrors } from '@angular/forms';

export class DateValidator {

    static IsValidDate(control: FormControl): ValidationErrors | null {
        let today: Date = new Date();

        if (new Date(control.value) > today)
            return { "LessThanToday": true };
        if (new Date(control.value).getFullYear() < today.getFullYear()-100)
            return { "ToEarlyDate": true };
        return null;
    }
}