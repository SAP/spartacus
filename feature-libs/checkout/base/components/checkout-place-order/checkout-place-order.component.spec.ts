import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CheckoutPlaceOrderComponent } from './checkout-place-order.component';
import createSpy = jasmine.createSpy;

class MockCheckoutService implements Partial<CheckoutFacade> {
  placeOrder = createSpy().and.returnValue(of({}));

  clearOrder = createSpy();
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy().and.returnValue(of(true).toPromise());
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  launch = createSpy();
  clear = createSpy();
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('CheckoutPlaceOrderComponent', () => {
  let component: CheckoutPlaceOrderComponent;
  let fixture: ComponentFixture<CheckoutPlaceOrderComponent>;
  let controls: FormGroup['controls'];
  let checkoutService: CheckoutFacade;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
        declarations: [MockUrlPipe, CheckoutPlaceOrderComponent],
        providers: [
          { provide: CheckoutFacade, useClass: MockCheckoutService },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPlaceOrderComponent);
    component = fixture.componentInstance;
    controls = component.checkoutSubmitForm.controls;

    checkoutService = TestBed.inject(CheckoutFacade);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not place order when checkbox not checked', () => {
    submitForm(false);

    expect(checkoutService.placeOrder).not.toHaveBeenCalled();
  });

  it('should place order when checkbox checked', () => {
    controls.termsAndConditions.setValue(true);

    submitForm(true);

    expect(launchDialogService.launch).toHaveBeenCalledWith(
      LAUNCH_CALLER.PLACE_ORDER_SPINNER,
      component['vcr']
    );
    expect(checkoutService.placeOrder).toHaveBeenCalled();
  });

  it('should change page and reset form data on a successful place order', () => {
    component.onSuccess();

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderConfirmation',
    });
  });

  describe('Place order UI', () => {
    beforeEach(() => {
      controls.termsAndConditions.setValue(true);
    });

    it('should have the place order button ENABLED when terms and condition is checked', () => {
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(false);
    });
  });

  function submitForm(isTermsCondition: boolean): void {
    controls.termsAndConditions.setValue(isTermsCondition);
    component.submitForm();
  }
});
