import { TestBed, inject } from '@angular/core/testing';

import { PlansGuard } from './plans.guard';

describe('PlansGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PlansGuard]
        });
    });

    it('should be created', inject([PlansGuard], (service: PlansGuard) => {
        expect(service).toBeTruthy();
    }));
});
