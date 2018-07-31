import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialPlanCardComponent } from './partial-plan-card.component';

describe('PartialPlanCardComponent', () => {
    let component: PartialPlanCardComponent;
    let fixture: ComponentFixture<PartialPlanCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PartialPlanCardComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartialPlanCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
