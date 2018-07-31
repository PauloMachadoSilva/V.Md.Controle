import { TestBed, inject } from '@angular/core/testing';

import { HomeGuard } from './home.guard';

describe('RedirectGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ HomeGuard ]
        });
    });

    it('should be created', inject([HomeGuard], (service: HomeGuard) => {
        expect(service).toBeTruthy();
    }));
});
