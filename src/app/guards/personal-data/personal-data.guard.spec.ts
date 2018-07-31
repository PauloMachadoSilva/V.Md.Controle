import { TestBed, inject } from '@angular/core/testing';

import { PersonalDataGuard } from './personal-data.guard';

describe('PersonalDataGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PersonalDataGuard]
        });
    });

    it('should be created', inject([PersonalDataGuard], (service: PersonalDataGuard) => {
        expect(service).toBeTruthy();
    }));
});
