import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutFacade, ORDER_TYPE } from '@spartacus/checkout/base/root';
import {
  CheckoutScheduledReplenishmentFacade,
  DaysOfWeek,
  recurrencePeriod,
  ScheduleReplenishmentForm,
} from '@spartacus/checkout/scheduled-replenishment/root';
import {
  I18nTestingModule,
  RoutingService,
  UrlCommands,
} from '@spartacus/core';
import { Order, ReplenishmentOrder } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutReplenishmentFormService } from '../services/checkout-replenishment-form-service';
import { CheckoutScheduledReplenishmentPlaceOrderComponent } from './checkout-place-order.component';

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: 'test-number-days',
  nthDayOfMonth: 'test-day-month',
  recurrencePeriod: recurrencePeriod.WEEKLY,
  numberOfWeeks: 'test-num-of-weeks',
  replenishmentStartDate: 'test-date',
  daysOfWeek: [DaysOfWeek.FRIDAY],
};

const mockReplenishmentOrderFormData$ =
  new BehaviorSubject<ScheduleReplenishmentForm>(
    mockReplenishmentOrderFormData
  );

class MockCheckoutService implements Partial<CheckoutFacade> {
  placeOrder(_termsChecked: boolean): Observable<Order> {
    return of();
  }

  clearOrder(): void {}
}

class MockCheckoutScheduledReplenishmentService
  implements Partial<CheckoutScheduledReplenishmentFacade>
{
  getOrderType(): Observable<ORDER_TYPE> {
    return of(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER);
  }
  scheduleReplenishmentOrder(
    _scheduleReplenishmentForm: ScheduleReplenishmentForm,
    _termsChecked: boolean
  ): Observable<ReplenishmentOrder> {
    return of();
  }
}

class MockCheckoutReplenishmentFormService
  implements Partial<CheckoutReplenishmentFormService>
{
  getScheduleReplenishmentFormData(): Observable<ScheduleReplenishmentForm> {
    return mockReplenishmentOrderFormData$.asObservable();
  }

  setScheduleReplenishmentFormData(
    _formData: ScheduleReplenishmentForm
  ): void {}

  resetScheduleReplenishmentFormData(): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go(_commands: UrlCommands, _extras?: NavigationExtras): Promise<boolean> {
    return of(true).toPromise();
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  launch() {}
  clear() {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('CheckoutScheduledReplenishmentPlaceOrderComponent', () => {
  let component: CheckoutScheduledReplenishmentPlaceOrderComponent;
  let fixture: ComponentFixture<CheckoutScheduledReplenishmentPlaceOrderComponent>;
  let controls: FormGroup['controls'];

  let checkoutService: CheckoutFacade;
  let checkoutReplenishmentFormService: CheckoutReplenishmentFormService;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;
  let checkoutScheduledReplenishmentService: CheckoutScheduledReplenishmentFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
        declarations: [
          MockUrlPipe,
          CheckoutScheduledReplenishmentPlaceOrderComponent,
        ],
        providers: [
          { provide: CheckoutFacade, useClass: MockCheckoutService },
          {
            provide: CheckoutReplenishmentFormService,
            useClass: MockCheckoutReplenishmentFormService,
          },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
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
      CheckoutScheduledReplenishmentPlaceOrderComponent
    );
    component = fixture.componentInstance;

    controls = component.checkoutSubmitForm.controls;

    checkoutService = TestBed.inject(CheckoutFacade);
    checkoutScheduledReplenishmentService = TestBed.inject(
      CheckoutScheduledReplenishmentFacade
    );
    checkoutReplenishmentFormService = TestBed.inject(
      CheckoutReplenishmentFormService
    );
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(checkoutService, 'placeOrder').and.callThrough();
    spyOn(
      checkoutScheduledReplenishmentService,
      'scheduleReplenishmentOrder'
    ).and.callThrough();
    spyOn(
      checkoutReplenishmentFormService,
      'setScheduleReplenishmentFormData'
    ).and.callThrough();
    spyOn(
      checkoutReplenishmentFormService,
      'resetScheduleReplenishmentFormData'
    ).and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when order type is PLACE_ORDER', () => {
    it('should not place order when checkbox not checked', () => {
      submitForm(ORDER_TYPE.PLACE_ORDER, false);

      expect(checkoutService.placeOrder).not.toHaveBeenCalled();
      expect(
        checkoutScheduledReplenishmentService.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
    });

    it('should place order when checkbox checked', () => {
      submitForm(ORDER_TYPE.PLACE_ORDER, true);

      expect(checkoutService.placeOrder).toHaveBeenCalled();
      expect(
        checkoutScheduledReplenishmentService.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
    });

    it('should change page and reset form data on a successful place order', () => {
      spyOn(routingService, 'go').and.stub();

      component.currentOrderType = ORDER_TYPE.PLACE_ORDER;
      component.onSuccess();

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orderConfirmation',
      });
    });
  });

  describe('when order type is SCHEDULE_REPLENISHMENT_ORDER', () => {
    it('should not schedule a replenishment order when checkbox not checked', () => {
      submitForm(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER, false);

      expect(checkoutService.placeOrder).not.toHaveBeenCalled();
      expect(
        checkoutScheduledReplenishmentService.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
    });

    it('should schedule a replenishment order when checkbox checked', () => {
      submitForm(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER, true);

      expect(checkoutService.placeOrder).not.toHaveBeenCalled();
      expect(
        checkoutScheduledReplenishmentService.scheduleReplenishmentOrder
      ).toHaveBeenCalled();
    });

    it('should change page and reset form data on a successful replenishment order', () => {
      spyOn(routingService, 'go').and.stub();

      component.currentOrderType = ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER;
      component.onSuccess();

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'replenishmentConfirmation',
      });
      expect(
        checkoutReplenishmentFormService.resetScheduleReplenishmentFormData
      ).toHaveBeenCalled();
    });
  });

  describe('when order was successfully placed', () => {
    it('should open popover dialog', () => {
      spyOnProperty(component.checkoutSubmitForm, 'valid').and.returnValue(
        true
      );
      spyOn(launchDialogService, 'launch').and.stub();
      component.currentOrderType = ORDER_TYPE.PLACE_ORDER;

      component.submitForm();

      expect(launchDialogService.launch).toHaveBeenCalledWith(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        component['vcr']
      );
    });
  });

  describe('Place order UI', () => {
    beforeEach(() => {
      component.ngOnInit();
      controls.termsAndConditions.setValue(true);
    });

    it('should have button ENABLED when a checkbox for weekday in WEEKLY view is checked and terms and condition checked', () => {
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(false);
    });

    it('should have button DISABLED when a checkbox for weekday in WEEKLY view is NOT checked and terms and condition checked', () => {
      mockReplenishmentOrderFormData$.next({
        ...mockReplenishmentOrderFormData,
        daysOfWeek: [],
      });

      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(true);
    });
  });

  function submitForm(orderType: ORDER_TYPE, isTermsCondition: boolean): void {
    component.currentOrderType = orderType;
    controls.termsAndConditions.setValue(isTermsCondition);
    component.submitForm();
  }
});
