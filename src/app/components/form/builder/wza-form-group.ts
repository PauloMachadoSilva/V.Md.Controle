import { FormGroup } from '@angular/forms';
import { WzaFormControl } from './wza-form-control';

export class WzaFormGroup extends FormGroup {
    field(fieldName: string): WzaFormControl {
        return <WzaFormControl>this.controls[fieldName];
    }

    fieldValue(fieldName: string): string {
        return this.field(fieldName).value;
    }

    setError(fieldName: string, error: string): void {
        this.field(fieldName).setErrors({ message: error });
    }
}
