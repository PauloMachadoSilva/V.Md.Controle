import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialBreadcrumbComponent } from './partial-breadcrumb.component';

describe('PartialBreadcrumbComponent', () => {
    let component: PartialBreadcrumbComponent;
    let fixture: ComponentFixture<PartialBreadcrumbComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PartialBreadcrumbComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartialBreadcrumbComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
