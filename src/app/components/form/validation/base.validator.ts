import { AbstractControl } from '@angular/forms';

export class BaseValidator {
    protected static buildResponse(message: string): { [ key: string ]: any } {
        return (!message) ? null : { enabled: true, message: message };
    }
}
