import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { UnnamedFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { UnnamedOrderConfirmationThankYouMessageComponent } from './unnamed-order-confirmation-thank-you-message.component';
import createSpy = jasmine.createSpy;

@Component({ selector: 'cx-add-to-home-screen-banner', template: '' })
class MockAddtoHomeScreenBannerComponent {}

@Component({ selector: 'cx-guest-register-form', template: '' })
class MockGuestRegisterFormComponent {
  @Input() guid: string;
  @Input() email: string;
}

class MockUnnamedService implements Partial<UnnamedFacade> {
  getCurrentOrderDetails = createSpy().and.returnValue(
    of({
      code: 'test-code-412',
      guid: 'guid',
      guestCustomer: true,
      paymentInfo: { billingAddress: { email: 'test@test.com' } },
      replenishmentOrderCode: 'test-repl-code',
    })
  );
}

describe('UnnamedOrderConfirmationThankYouMessageComponent', () => {
  let component: UnnamedOrderConfirmationThankYouMessageComponent;
  let fixture: ComponentFixture<UnnamedOrderConfirmationThankYouMessageComponent>;

  let checkoutService: UnnamedFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          UnnamedOrderConfirmationThankYouMessageComponent,
          MockAddtoHomeScreenBannerComponent,
          MockGuestRegisterFormComponent,
        ],
        providers: [{ provide: UnnamedFacade, useClass: MockUnnamedService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      UnnamedOrderConfirmationThankYouMessageComponent
    );
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(UnnamedFacade);
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
    checkoutService.getCurrentOrderDetails = createSpy().and.returnValue(
      of({ guid: 'guid', guestCustomer: false })
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('cx-guest-register-form'))
    ).toBeNull();
  });
});
