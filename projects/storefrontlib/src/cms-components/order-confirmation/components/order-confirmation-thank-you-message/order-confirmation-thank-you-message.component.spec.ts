import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutService, I18nTestingModule, Order } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderConfirmationThankYouMessageComponent } from './order-confirmation-thank-you-message.component';

import createSpy = jasmine.createSpy;
import { By } from '@angular/platform-browser';

@Component({ selector: 'cx-add-to-home-screen-banner', template: '' })
class MockAddtoHomeScreenBannerComponent {}

class MockCheckoutService {
  clearCheckoutData = createSpy();

  getOrderDetails(): Observable<Order> {
    return of({
      code: 'test-code-412',
    });
  }
}

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationThankYouMessageComponent;
  let fixture: ComponentFixture<OrderConfirmationThankYouMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        OrderConfirmationThankYouMessageComponent,
        MockAddtoHomeScreenBannerComponent,
      ],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      OrderConfirmationThankYouMessageComponent
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should display order code', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cx-page-title')).nativeElement
        .innerHTML
    ).toContain('test-code-412');
  });
});
