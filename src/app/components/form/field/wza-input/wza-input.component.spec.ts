import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WzaInputComponent } from './wza-input.component';
import { WzaLabelComponent } from '../wza-label/wza-label.component';

describe('WzaInputComponent', () => {
    let component: WzaInputComponent;
    let fixture: ComponentFixture<WzaInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WzaInputComponent,
                WzaLabelComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WzaInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
