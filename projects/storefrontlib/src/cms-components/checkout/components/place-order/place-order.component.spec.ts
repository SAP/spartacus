import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CheckoutService,
  I18nTestingModule,
  Order,
  ORDER_TYPE,
  RoutingService,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '../../../../layout/launch-dialog/index';
import { CheckoutReplenishmentFormService } from '../../services/checkout-replenishment-form-service';
import { PlaceOrderComponent } from './place-order.component';

class MockCheckoutService {
  placeOrder(): void {}
  getOrderDetails(): Observable<Order> {
    return of({});
  }

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

  getCurrentOrderType(): Observable<ORDER_TYPE> {
    return of();
  }
}

class MockCheckoutReplenishmentFormService {
  getScheduleReplenishmentFormData(): Observable<ScheduleReplenishmentForm> {
    return of({});
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

  let checkoutService: CheckoutService;
  let checkoutReplenishmentFormService: CheckoutReplenishmentFormService;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
      declarations: [MockUrlPipe, PlaceOrderComponent],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        {
          provide: CheckoutReplenishmentFormService,
          useClass: MockCheckoutReplenishmentFormService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;

    controls = component.checkoutSubmitForm.controls;

    checkoutService = TestBed.inject(CheckoutService);
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

  describe('should be able to call the launch for the spinner', () => {
    it('should open popover dialog', () => {
      spyOn(checkoutService, 'getPlaceOrderLoading').and.returnValue(of(true));
      spyOn(checkoutService, 'getPlaceOrderSuccess').and.returnValue(of(true));
      spyOn(launchDialogService, 'launch').and.stub();

      component.ngOnInit();

      expect(launchDialogService.launch).toHaveBeenCalledWith(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        component['vcr']
      );
    });
  });

  function submitForm(orderType: ORDER_TYPE, isTermsCondition: boolean): void {
    component.currentOrderType = orderType;
    controls.termsAndConditions.setValue(isTermsCondition);
    component.submitForm();
  }
});
