import { TestBed, inject } from '@angular/core/testing';

import { ResumeGuard } from './resume.guard';

describe('RedirectGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ResumeGuard ]
        });
    });

    it('should be created', inject([ResumeGuard], (service: ResumeGuard) => {
        expect(service).toBeTruthy();
    }));
});
