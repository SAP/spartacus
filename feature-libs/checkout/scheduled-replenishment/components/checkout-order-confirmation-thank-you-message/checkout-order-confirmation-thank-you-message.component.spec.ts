import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { CheckoutScheduledReplenishmentFacade } from '@spartacus/checkout/scheduled-replenishment/root';
import {
  I18nTestingModule,
  Order,
  ORDER_TYPE,
  ReplenishmentOrder,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent } from './checkout-order-confirmation-thank-you-message.component';

@Component({ selector: 'cx-add-to-home-screen-banner', template: '' })
class MockAddtoHomeScreenBannerComponent {}

@Component({ selector: 'cx-guest-register-form', template: '' })
class MockGuestRegisterFormComponent {
  @Input() guid: string;
  @Input() email: string;
}

class MockCheckoutService implements Partial<CheckoutFacade> {
  getOrder(): Observable<Order | ReplenishmentOrder> {
    return of({
      code: 'test-code-412',
      guid: 'guid',
      guestCustomer: true,
      paymentInfo: { billingAddress: { email: 'test@test.com' } },
      replenishmentOrderCode: 'test-repl-code',
    });
  }
}

class MockCheckoutScheduledReplenishmentService
  implements Partial<CheckoutScheduledReplenishmentFacade>
{
  getOrderType(): Observable<ORDER_TYPE> {
    return of(ORDER_TYPE.PLACE_ORDER);
  }
}

describe('CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent', () => {
  let component: CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent;
  let fixture: ComponentFixture<CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent>;

  let checkoutService: CheckoutFacade;
  let checkoutScheduledReplenishmentFacade: CheckoutScheduledReplenishmentFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent,
          MockAddtoHomeScreenBannerComponent,
          MockGuestRegisterFormComponent,
        ],
        providers: [
          { provide: CheckoutFacade, useClass: MockCheckoutService },
          {
            provide: CheckoutScheduledReplenishmentFacade,
            useClass: MockCheckoutScheduledReplenishmentService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent
    );
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutFacade);
    checkoutScheduledReplenishmentFacade = TestBed.inject(
      CheckoutScheduledReplenishmentFacade
    );
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

  it('should display replenishment order code', () => {
    spyOn(checkoutScheduledReplenishmentFacade, 'getOrderType').and.returnValue(
      of(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER)
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cx-page-title')).nativeElement
        .innerHTML
    ).toContain('test-repl-code');
  });

  it('should display guest register form for guest user', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('cx-guest-register-form'))
    ).not.toBeNull();
  });

  it('should not display guest register form for login user', () => {
    spyOn(checkoutService, 'getOrder').and.returnValue(
      of({ guid: 'guid', guestCustomer: false })
    );
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('cx-guest-register-form'))
    ).toBeNull();
  });
});
