import {
  ComponentRef,
  Pipe,
  PipeTransform,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import {
  I18nTestingModule,
  Order,
  RoutingService,
  UrlCommands,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CheckoutPlaceOrderComponent } from './checkout-place-order.component';

class MockCheckoutService implements Partial<CheckoutFacade> {
  placeOrder(_termsChecked: boolean): Observable<Order> {
    return of({});
  }

  clearOrder(): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go(_commands: UrlCommands, _extras?: NavigationExtras): Promise<boolean> {
    return of(true).toPromise();
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  launch(
    _caller: LAUNCH_CALLER | string,
    _vcr?: ViewContainerRef,
    _data?: any
  ): void | Observable<ComponentRef<any> | undefined> {}
  clear(_caller: LAUNCH_CALLER | string): void {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('PlaceOrderComponent', () => {
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

    spyOn(checkoutService, 'placeOrder').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not place order when checkbox not checked', () => {
    submitForm(false);

    expect(checkoutService.placeOrder).not.toHaveBeenCalled();
  });

  it('should place order when checkbox checked', () => {
    submitForm(true);

    expect(checkoutService.placeOrder).toHaveBeenCalled();
  });

  it('should change page and reset form data on a successful place order', () => {
    spyOn(routingService, 'go').and.stub();

    component.onSuccess();

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderConfirmation',
    });
  });

  describe('when order was successfully placed', () => {
    beforeEach(() => {
      controls.termsAndConditions.setValue(true);
    });
    it('should open popover dialog', () => {
      spyOn(launchDialogService, 'launch').and.stub();

      component.submitForm();

      expect(launchDialogService.launch).toHaveBeenCalledWith(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        component['vcr']
      );
    });
  });

  describe('Place order UI', () => {
    beforeEach(() => {
      controls.termsAndConditions.setValue(true);
    });

    it('should have button ENABLED when a checkbox for weekday in WEEKLY view is checked and terms and condition checked', () => {
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
