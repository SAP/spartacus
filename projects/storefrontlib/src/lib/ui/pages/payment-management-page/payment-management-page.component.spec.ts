import { PaymentManagementPageComponent } from './payment-management-page.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'y-payment-management-page-layout',
  template: ''
})
class MockPaymentManagementPageLayoutComponent {}

describe('PaymentManagementPageLayoutComponent', () => {
  let component: PaymentManagementPageComponent;
  let fixture: ComponentFixture<PaymentManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentManagementPageComponent,
        MockPaymentManagementPageLayoutComponent
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManagementPageComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
