import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WzaSelectComponent } from './wza-select.component';
import { WzaLabelComponent } from '../wza-label/wza-label.component';

describe('WzaSelectComponent', () => {
    let component: WzaSelectComponent;
    let fixture: ComponentFixture<WzaSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WzaSelectComponent,
                WzaLabelComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WzaSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
