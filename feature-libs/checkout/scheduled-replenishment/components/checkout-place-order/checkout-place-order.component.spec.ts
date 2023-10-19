import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import {
  DaysOfWeek,
  OrderFacade,
  ORDER_TYPE,
  recurrencePeriod,
  ScheduledReplenishmentOrderFacade,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import {
  AtMessageModule,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { CheckoutReplenishmentFormService } from '../services/checkout-replenishment-form.service';
import { CheckoutScheduledReplenishmentPlaceOrderComponent } from './checkout-place-order.component';
import createSpy = jasmine.createSpy;

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

class MockOrderFacade implements Partial<OrderFacade> {
  placeOrder = createSpy().and.returnValue(EMPTY);
  clearPlacedOrder = createSpy();
}

class MockScheduledReplenishmentOrderFacade
  implements Partial<ScheduledReplenishmentOrderFacade>
{
  scheduleReplenishmentOrder = createSpy().and.returnValue(EMPTY);
}

class MockCheckoutReplenishmentFormService
  implements Partial<CheckoutReplenishmentFormService>
{
  getOrderType = createSpy().and.returnValue(
    of(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER)
  );
  getScheduleReplenishmentFormData = createSpy().and.returnValue(
    mockReplenishmentOrderFormData$.asObservable()
  );
  setScheduleReplenishmentFormData = createSpy();
  resetScheduleReplenishmentFormData = createSpy();
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
  transform = createSpy();
}

describe('CheckoutScheduledReplenishmentPlaceOrderComponent', () => {
  let component: CheckoutScheduledReplenishmentPlaceOrderComponent;
  let fixture: ComponentFixture<CheckoutScheduledReplenishmentPlaceOrderComponent>;
  let controls: UntypedFormGroup['controls'];

  let orderFacade: OrderFacade;
  let checkoutReplenishmentFormService: CheckoutReplenishmentFormService;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;
  let scheduledReplenishmentOrderFacade: ScheduledReplenishmentOrderFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          AtMessageModule,
        ],
        declarations: [
          MockUrlPipe,
          CheckoutScheduledReplenishmentPlaceOrderComponent,
        ],
        providers: [
          { provide: OrderFacade, useClass: MockOrderFacade },
          {
            provide: CheckoutReplenishmentFormService,
            useClass: MockCheckoutReplenishmentFormService,
          },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          {
            provide: ScheduledReplenishmentOrderFacade,
            useClass: MockScheduledReplenishmentOrderFacade,
          },
          {
            provide: GlobalMessageService,
            useValue: {},
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

    orderFacade = TestBed.inject(OrderFacade);
    scheduledReplenishmentOrderFacade = TestBed.inject(
      ScheduledReplenishmentOrderFacade
    );
    checkoutReplenishmentFormService = TestBed.inject(
      CheckoutReplenishmentFormService
    );
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when order type is PLACE_ORDER', () => {
    it('should not place order when checkbox not checked', () => {
      submitForm(ORDER_TYPE.PLACE_ORDER, false);

      expect(orderFacade.placeOrder).not.toHaveBeenCalled();
      expect(
        scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
    });

    it('should place order when checkbox checked', () => {
      submitForm(ORDER_TYPE.PLACE_ORDER, true);

      expect(orderFacade.placeOrder).toHaveBeenCalled();
      expect(
        scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
    });

    it('should change page and reset form data on a successful place order', () => {
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

      expect(orderFacade.placeOrder).not.toHaveBeenCalled();
      expect(
        scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
    });

    it('should schedule a replenishment order when checkbox checked', () => {
      submitForm(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER, true);

      expect(orderFacade.placeOrder).not.toHaveBeenCalled();
      expect(
        scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder
      ).toHaveBeenCalled();
    });

    it('should change page and reset form data on a successful replenishment order', () => {
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
