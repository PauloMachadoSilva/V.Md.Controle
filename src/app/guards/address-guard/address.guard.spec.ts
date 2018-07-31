import { TestBed, inject } from '@angular/core/testing';

import { AddressGuard } from './address.guard';

describe('AddressGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AddressGuard]
        });
    });

    it('should be created', inject([AddressGuard], (service: AddressGuard) => {
        expect(service).toBeTruthy();
    }));
});
