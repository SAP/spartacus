import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutFacade } from '@spartacus/checkout/root';
import {
  DaysOfWeek,
  I18nTestingModule,
  ORDER_TYPE,
  recurrencePeriod,
  RoutingService,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutReplenishmentFormService } from '../../services/checkout-replenishment-form-service';
import { PlaceOrderComponent } from './place-order.component';

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

class MockCheckoutService {
  placeOrder(): void {}

  scheduleReplenishmentOrder(
    _scheduleReplenishmentForm: ScheduleReplenishmentForm,
    _termsChecked: boolean
  ): void {}

  getPlaceOrderLoading(): Observable<boolean> {
    return of();
  }

  getPlaceOrderSuccess(): Observable<boolean> {
    return of();
  }

  getPlaceOrderError(): Observable<boolean> {
    return of();
  }

  getCurrentOrderType(): Observable<ORDER_TYPE> {
    return of();
  }

  clearPlaceOrderState(): void {}
}

class MockCheckoutReplenishmentFormService {
  getScheduleReplenishmentFormData(): Observable<ScheduleReplenishmentForm> {
    return mockReplenishmentOrderFormData$.asObservable();
  }

  setScheduleReplenishmentFormData(
    _formData: ScheduleReplenishmentForm
  ): void {}

  resetScheduleReplenishmentFormData(): void {}
}

class MockRoutingService {
  go(): void {}
}

class MockLaunchDialogService {
  launch() {}
  clear() {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('PlaceOrderComponent', () => {
  let component: PlaceOrderComponent;
  let fixture: ComponentFixture<PlaceOrderComponent>;
  let controls: FormGroup['controls'];

  let checkoutService: CheckoutFacade;
  let checkoutReplenishmentFormService: CheckoutReplenishmentFormService;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
        declarations: [MockUrlPipe, PlaceOrderComponent],
        providers: [
          { provide: CheckoutFacade, useClass: MockCheckoutService },
          {
            provide: CheckoutReplenishmentFormService,
            useClass: MockCheckoutReplenishmentFormService,
          },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;

    controls = component.checkoutSubmitForm.controls;

    checkoutService = TestBed.inject(CheckoutFacade);
    checkoutReplenishmentFormService = TestBed.inject(
      CheckoutReplenishmentFormService
    );
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(checkoutService, 'placeOrder').and.callThrough();
    spyOn(checkoutService, 'scheduleReplenishmentOrder').and.callThrough();
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
      expect(checkoutService.scheduleReplenishmentOrder).not.toHaveBeenCalled();
    });

    it('should place order when checkbox checked', () => {
      submitForm(ORDER_TYPE.PLACE_ORDER, true);

      expect(checkoutService.placeOrder).toHaveBeenCalled();
      expect(checkoutService.scheduleReplenishmentOrder).not.toHaveBeenCalled();
    });

    it('should NOT change page and reset form data when there is no successful place order', () => {
      spyOn(routingService, 'go').and.stub();

      component.currentOrderType = ORDER_TYPE.PLACE_ORDER;
      component.onSuccess(false);

      expect(routingService.go).not.toHaveBeenCalled();
    });

    it('should change page and reset form data on a successful place order', () => {
      spyOn(routingService, 'go').and.stub();

      component.currentOrderType = ORDER_TYPE.PLACE_ORDER;
      component.onSuccess(true);

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orderConfirmation',
      });
    });
  });

  describe('when order type is SCHEDULE_REPLENISHMENT_ORDER', () => {
    it('should not schedule a replenishment order when checkbox not checked', () => {
      submitForm(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER, false);

      expect(checkoutService.placeOrder).not.toHaveBeenCalled();
      expect(checkoutService.scheduleReplenishmentOrder).not.toHaveBeenCalled();
    });

    it('should schedule a replenishment order when checkbox checked', () => {
      submitForm(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER, true);

      expect(checkoutService.placeOrder).not.toHaveBeenCalled();
      expect(checkoutService.scheduleReplenishmentOrder).toHaveBeenCalled();
    });

    it('should NOT change page and reset form data when there is no successful replenishment order', () => {
      spyOn(routingService, 'go').and.stub();

      component.currentOrderType = ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER;
      component.onSuccess(false);

      expect(routingService.go).not.toHaveBeenCalled();
      expect(
        checkoutReplenishmentFormService.resetScheduleReplenishmentFormData
      ).not.toHaveBeenCalled();
    });

    it('should change page and reset form data on a successful replenishment order', () => {
      spyOn(routingService, 'go').and.stub();

      component.currentOrderType = ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER;
      component.onSuccess(true);

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
      spyOn(checkoutService, 'getPlaceOrderLoading').and.returnValue(of(true));
      spyOn(checkoutService, 'getPlaceOrderSuccess').and.returnValue(of(true));
      spyOn(checkoutService, 'getPlaceOrderError').and.returnValue(of(false));
      spyOn(launchDialogService, 'launch').and.stub();

      component.ngOnInit();

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
