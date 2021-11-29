import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { CheckoutOrderConfirmationThankYouMessageComponent } from './checkout-order-confirmation-thank-you-message.component';
import createSpy = jasmine.createSpy;

@Component({ selector: 'cx-add-to-home-screen-banner', template: '' })
class MockAddtoHomeScreenBannerComponent {}

@Component({ selector: 'cx-guest-register-form', template: '' })
class MockGuestRegisterFormComponent {
  @Input() guid: string;
  @Input() email: string;
}

class MockCheckoutService implements Partial<CheckoutFacade> {
  getOrder = createSpy().and.returnValue(
    of({
      code: 'test-code-412',
      guid: 'guid',
      guestCustomer: true,
      paymentInfo: { billingAddress: { email: 'test@test.com' } },
      replenishmentOrderCode: 'test-repl-code',
    })
  );
}

describe('CheckoutOrderConfirmationThankYouMessageComponent', () => {
  let component: CheckoutOrderConfirmationThankYouMessageComponent;
  let fixture: ComponentFixture<CheckoutOrderConfirmationThankYouMessageComponent>;

  let checkoutService: CheckoutFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          CheckoutOrderConfirmationThankYouMessageComponent,
          MockAddtoHomeScreenBannerComponent,
          MockGuestRegisterFormComponent,
        ],
        providers: [{ provide: CheckoutFacade, useClass: MockCheckoutService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CheckoutOrderConfirmationThankYouMessageComponent
    );
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutFacade);
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

  it('should display guest register form for guest user', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('cx-guest-register-form'))
    ).not.toBeNull();
  });

  it('should not display guest register form for login user', () => {
    checkoutService.getOrder = createSpy().and.returnValue(
      of({ guid: 'guid', guestCustomer: false })
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('cx-guest-register-form'))
    ).toBeNull();
  });
});
