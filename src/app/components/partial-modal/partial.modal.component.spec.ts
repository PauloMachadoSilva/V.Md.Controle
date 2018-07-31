import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialModalComponent } from './partial.modal.component';

describe('PartialModalComponent', () => {
    let component: PartialModalComponent;
    let fixture: ComponentFixture<PartialModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PartialModalComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartialModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
