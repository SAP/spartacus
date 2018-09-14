import { PaymentManagementPageComponent } from './payment-management-page.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { PaymentManagementPageLayoutModule } from '../../layout/payment-management-page-layout/payment-management-page-layout.module';
import { Component } from '@angular/core';
import { PaymentManagementPageLayoutComponent } from '../../layout/payment-management-page-layout/payment-management-page-layout.component';

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
