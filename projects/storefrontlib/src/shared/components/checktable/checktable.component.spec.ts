import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecktableComponent } from './checktable.component';

describe('ChecktableComponent', () => {
  let component: ChecktableComponent;
  let fixture: ComponentFixture<ChecktableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecktableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecktableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
