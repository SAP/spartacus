import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XxxComponent } from './xxx.component';

describe('XxxComponent', () => {
  let component: XxxComponent;
  let fixture: ComponentFixture<XxxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XxxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
