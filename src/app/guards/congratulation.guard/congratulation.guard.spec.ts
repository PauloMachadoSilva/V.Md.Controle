import { TestBed, inject } from '@angular/core/testing';

import { CongratulationGuard } from './congratulation.guard';

describe('CongratulationGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CongratulationGuard]
        });
    });

    it('should be created', inject([CongratulationGuard], (service: CongratulationGuard) => {
        expect(service).toBeTruthy();
    }));
});
