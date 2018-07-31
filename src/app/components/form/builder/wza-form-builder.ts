import { WzaFormBuilderInterface } from './wza-form-builder-interface';
import { WzaFormControl } from './wza-form-control';
import { WzaFormGroup } from './wza-form-group';


export class WzaFormBuilder {
    static build(fields: Array<WzaFormBuilderInterface>): WzaFormGroup {
        const formGroup = new WzaFormGroup({});
        fields.forEach(field => {
            const control = new WzaFormControl(field.name, field.value, field.required, field.type);

            if (field.error) {
                control.errorMessage = field.error;
            }

            formGroup.addControl(field.name, control);
        });
        return formGroup;
    }
}
