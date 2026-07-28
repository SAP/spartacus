import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CurrencyService,
  CxDatePipe,
  GlobalMessageService,
  LanguageService,
  MockDatePipe,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  DaysOfWeek,
  ORDER_TYPE,
  OrderFacade,
  recurrencePeriod,
  ScheduledReplenishmentOrderFacade,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import {
  AtMessageModule,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { CheckoutReplenishmentFormService } from '../services/checkout-replenishment-form.service';
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

class MockOrderFacade implements Partial<OrderFacade> {
  placeOrder = vi.fn().mockReturnValue(EMPTY);
  clearPlacedOrder = vi.fn();
}

class MockScheduledReplenishmentOrderFacade
  implements Partial<ScheduledReplenishmentOrderFacade>
{
  scheduleReplenishmentOrder = vi.fn().mockReturnValue(EMPTY);
}

class MockCheckoutReplenishmentFormService
  implements Partial<CheckoutReplenishmentFormService>
{
  getOrderType = vi.fn().mockReturnValue(
    of(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER)
  );
  getScheduleReplenishmentFormData = vi.fn().mockReturnValue(
    mockReplenishmentOrderFormData$.asObservable()
  );
  setScheduleReplenishmentFormData = vi.fn();
  resetScheduleReplenishmentFormData = vi.fn();
}

class MockRoutingService implements Partial<RoutingService> {
  go = vi.fn().mockReturnValue(Promise.resolve(true));
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  launch = vi.fn();
  clear = vi.fn();
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform = vi.fn();
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

  beforeEach(async () => {
    const mockCurrencyService = {
      getActive: () => of('USD'),
    };
    const mockLanguageService = {
      getActive: () => of('en'),
    };
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        AtMessageModule,
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
        { provide: CurrencyService, useValue: mockCurrencyService },
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    })
      .overrideComponent(CheckoutScheduledReplenishmentPlaceOrderComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
  });

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
      vi.spyOn(component.checkoutSubmitForm, 'valid', 'get').mockReturnValue(
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
