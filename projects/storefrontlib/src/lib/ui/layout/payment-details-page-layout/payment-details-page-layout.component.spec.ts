import { PaymentDetailsPageLayoutComponent } from './payment-details-page-layout.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'cx-payment-methods',
  template: ''
})
class MockPaymentMethodsComponent {}

describe('PaymentDetailsPageLayoutComponent', () => {
  let component: PaymentDetailsPageLayoutComponent;
  let fixture: ComponentFixture<PaymentDetailsPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentDetailsPageLayoutComponent,
        MockPaymentMethodsComponent
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailsPageLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
