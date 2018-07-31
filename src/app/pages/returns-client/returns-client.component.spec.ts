import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsClientComponent } from './returns-client.component';

describe('ReturnsClientComponent', () => {
        let component: ReturnsClientComponent;
        let fixture: ComponentFixture<ReturnsClientComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReturnsClientComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReturnsClientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
