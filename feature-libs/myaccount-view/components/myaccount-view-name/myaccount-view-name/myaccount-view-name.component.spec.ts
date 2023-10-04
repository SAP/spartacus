import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountViewNameComponent } from './myaccount-view-name.component';

describe('MyaccountViewNameComponent', () => {
  let component: MyaccountViewNameComponent;
  let fixture: ComponentFixture<MyaccountViewNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyaccountViewNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyaccountViewNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
