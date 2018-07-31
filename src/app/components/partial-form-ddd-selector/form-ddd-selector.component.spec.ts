import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDddSelectorComponent } from './form-ddd-selector.component';
import { ServiceModule } from '../../shared/services/service.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

describe('DddSelectorComponent', () => {
    let component: FormDddSelectorComponent;
    let fixture: ComponentFixture<FormDddSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FormDddSelectorComponent
            ],
            imports: [
                HttpClientModule,
                ServiceModule
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDddSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
