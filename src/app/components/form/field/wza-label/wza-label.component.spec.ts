import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WzaLabelComponent } from './wza-label.component';

describe('WzaLabelComponent', () => {
  let component: WzaLabelComponent;
  let fixture: ComponentFixture<WzaLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WzaLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WzaLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
