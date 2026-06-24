import { Pipe, PipeTransform } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CurrencyService,
  CxDatePipe,
  FeatureConfigService,
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
  go = createSpy().and.returnValue(Promise.resolve(true));
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  launch = createSpy();
  clear = createSpy();
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  isStable$ = new BehaviorSubject<boolean>(true);
  isStable = () => this.isStable$.asObservable();
}

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled = jasmine
    .createSpy('isEnabled')
    .and.callFake((flag: string) => flag === 'enableCartSlowNetworkResilience');
}

@Pipe({ name: 'cxUrl' })
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
  let activeCartFacade: MockActiveCartFacade;

  beforeEach(waitForAsync(() => {
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
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
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
  }));

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
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as unknown as MockActiveCartFacade;
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
      mockReplenishmentOrderFormData$.next(mockReplenishmentOrderFormData);
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

    it('should have button DISABLED while the cart is unstable', () => {
      activeCartFacade.isStable$.next(false);
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(true);
    });

    it('should re-enable the button when the cart becomes stable again', () => {
      activeCartFacade.isStable$.next(false);
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(true);

      activeCartFacade.isStable$.next(true);
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(false);
    });

    it('should render the cart-updating hint while the cart is unstable', () => {
      activeCartFacade.isStable$.next(false);
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector(
          '.cx-place-order-cart-updating'
        ).hidden
      ).toBeFalse();
    });

    it('should NOT render the cart-updating hint while the cart is stable', () => {
      activeCartFacade.isStable$.next(true);
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector(
          '.cx-place-order-cart-updating'
        ).hidden
      ).toBeTrue();
    });
  });

  describe('submitForm cart-stability guard', () => {
    it('should NOT place a regular order if submitForm() is invoked while the cart is unstable', () => {
      controls.termsAndConditions.setValue(true);
      component.currentOrderType = ORDER_TYPE.PLACE_ORDER;
      activeCartFacade.isStable$.next(false);

      component.submitForm();

      expect(launchDialogService.launch).not.toHaveBeenCalled();
      expect(orderFacade.placeOrder).not.toHaveBeenCalled();
    });

    it('should NOT schedule a replenishment order if submitForm() is invoked while the cart is unstable', () => {
      controls.termsAndConditions.setValue(true);
      component.currentOrderType = ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER;
      activeCartFacade.isStable$.next(false);

      component.submitForm();

      expect(launchDialogService.launch).not.toHaveBeenCalled();
      expect(
        scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
    });

    it('should place the order once the cart becomes stable', () => {
      controls.termsAndConditions.setValue(true);
      component.currentOrderType = ORDER_TYPE.PLACE_ORDER;
      activeCartFacade.isStable$.next(true);

      component.submitForm();

      expect(orderFacade.placeOrder).toHaveBeenCalled();
    });

    it('should schedule a replenishment order once the cart becomes stable', () => {
      controls.termsAndConditions.setValue(true);
      component.currentOrderType = ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER;
      activeCartFacade.isStable$.next(true);

      component.submitForm();

      expect(
        scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder
      ).toHaveBeenCalled();
    });

    it('should early-return when currentOrderType is undefined WITHOUT consulting isStable()', () => {
      // Form valid but order-type still missing — the form-state guard must
      // win before the toggle-ON gate consults isStable().
      controls.termsAndConditions.setValue(true);
      component.currentOrderType = undefined as any;
      const isStableSpy = spyOn(activeCartFacade, 'isStable').and.callThrough();

      component.submitForm();

      expect(isStableSpy).not.toHaveBeenCalled();
      expect(orderFacade.placeOrder).not.toHaveBeenCalled();
      expect(
        scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
      expect(launchDialogService.launch).not.toHaveBeenCalled();
    });
  });

  describe('safety-valve timeout (subclass inherits parent wiring)', () => {
    it('should release the gate after 10s even when isStable stays false', fakeAsync(() => {
      controls.termsAndConditions.setValue(true);
      activeCartFacade.isStable$.next(false);
      fixture.detectChanges();

      const emissions: boolean[] = [];
      const sub = component.isCartUpdating$.subscribe((v) => emissions.push(v));

      // Gate engaged on the subclass component too.
      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(true);

      tick(10_000);
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(false);

      expect(emissions[emissions.length - 1]).toBe(false);
      expect(emissions).toContain(true);
      sub.unsubscribe();
    }));
  });

  function submitForm(orderType: ORDER_TYPE, isTermsCondition: boolean): void {
    component.currentOrderType = orderType;
    controls.termsAndConditions.setValue(isTermsCondition);
    component.submitForm();
  }
});

describe('CheckoutScheduledReplenishmentPlaceOrderComponent — enableCartSlowNetworkResilience OFF', () => {
  let component: CheckoutScheduledReplenishmentPlaceOrderComponent;
  let fixture: ComponentFixture<CheckoutScheduledReplenishmentPlaceOrderComponent>;
  let controls: UntypedFormGroup['controls'];
  let orderFacade: OrderFacade;
  let scheduledReplenishmentOrderFacade: ScheduledReplenishmentOrderFacade;
  let activeCartFacade: MockActiveCartFacade;

  beforeEach(waitForAsync(() => {
    const mockCurrencyService = { getActive: () => of('USD') };
    const mockLanguageService = { getActive: () => of('en') };
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
        { provide: GlobalMessageService, useValue: {} },
        { provide: CurrencyService, useValue: mockCurrencyService },
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        {
          provide: FeatureConfigService,
          useValue: { isEnabled: (_flag: string) => false },
        },
      ],
    })
      .overrideComponent(CheckoutScheduledReplenishmentPlaceOrderComponent, {
        remove: { imports: [TranslatePipe, CxDatePipe, UrlPipe] },
        add: { imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe] },
      })
      .compileComponents();
  }));

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
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as unknown as MockActiveCartFacade;
  });

  it('should place a regular order without consulting isStable() when toggle is OFF', () => {
    controls.termsAndConditions.setValue(true);
    component.currentOrderType = ORDER_TYPE.PLACE_ORDER;
    activeCartFacade.isStable$.next(false);

    component.submitForm();

    expect(orderFacade.placeOrder).toHaveBeenCalled();
  });

  it('should schedule a replenishment without consulting isStable() when toggle is OFF', () => {
    controls.termsAndConditions.setValue(true);
    component.currentOrderType = ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER;
    activeCartFacade.isStable$.next(false);

    component.submitForm();

    expect(
      scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder
    ).toHaveBeenCalled();
  });
});
