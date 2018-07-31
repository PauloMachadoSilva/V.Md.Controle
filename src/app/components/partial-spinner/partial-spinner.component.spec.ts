import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialSpinnerComponent } from './partial-spinner.component';

describe('PartialSpinnerComponent', () => {
    let component: PartialSpinnerComponent;
    let fixture: ComponentFixture<PartialSpinnerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PartialSpinnerComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartialSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
