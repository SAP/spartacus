import { PaymentDetailsPageComponent } from './payment-details-page.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'cx-payment-details-page-layout',
  template: ''
})
class MockPaymentDetailsPageLayoutComponent {}

describe('PaymentDetailsPageComponent', () => {
  let component: PaymentDetailsPageComponent;
  let fixture: ComponentFixture<PaymentDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentDetailsPageComponent,
        MockPaymentDetailsPageLayoutComponent
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailsPageComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
