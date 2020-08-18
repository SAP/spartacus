import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CheckoutReplenishmentOrderService,
  CheckoutService,
  I18nTestingModule,
  Order,
  ORDER_TYPE,
  ReplenishmentOrder,
  RoutingService,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutReplenishmentFormService } from '../../services/checkout-replenishment-form-service';
import { PlaceOrderComponent } from './place-order.component';

class MockCheckoutService {
  placeOrder(): void {}
  getOrderDetails(): Observable<Order> {
    return of({});
  }
}

class MockCheckoutReplenishmentOrderService {
  scheduleReplenishmentOrder(
    _scheduleReplenishmentForm: ScheduleReplenishmentForm,
    _termsChecked: boolean
  ): void {}

  getOrderDetails(): Observable<ReplenishmentOrder> {
    return of({});
  }
}

class MockCheckoutReplenishmentFormService {
  getScheduleReplenishmentFormData(): Observable<ScheduleReplenishmentForm> {
    return of({});
  }

  setScheduleReplenishmentFormData(
    _formData: ScheduleReplenishmentForm
  ): void {}
}

const routingServiceStub = {
  go(): void {},
};

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
  let checkoutReplenishmentOrderService: CheckoutReplenishmentOrderService;
  let checkoutReplenishmentFormService: CheckoutReplenishmentFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
      declarations: [MockUrlPipe, PlaceOrderComponent],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        {
          provide: CheckoutReplenishmentOrderService,
          useClass: MockCheckoutReplenishmentOrderService,
        },
        {
          provide: CheckoutReplenishmentFormService,
          useClass: MockCheckoutReplenishmentFormService,
        },
        { provide: RoutingService, useValue: routingServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;

    controls = component.checkoutSubmitForm.controls;

    checkoutService = TestBed.inject(CheckoutService);
    checkoutReplenishmentOrderService = TestBed.inject(
      CheckoutReplenishmentOrderService
    );
    checkoutReplenishmentFormService = TestBed.inject(
      CheckoutReplenishmentFormService
    );

    spyOn(checkoutService, 'placeOrder').and.callThrough();
    spyOn(
      checkoutReplenishmentOrderService,
      'scheduleReplenishmentOrder'
    ).and.callThrough();
    spyOn(
      checkoutReplenishmentFormService,
      'setScheduleReplenishmentFormData'
    ).and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when order type is PLACE_ORDER', () => {
    it('should not place order when checkbox not checked', () => {
      component.currentOrderType = ORDER_TYPE.PLACE_ORDER;
      controls.termsAndConditions.setValue(false);
      component.submitForm();

      expect(checkoutService.placeOrder).not.toHaveBeenCalled();
      expect(
        checkoutReplenishmentOrderService.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
      expect(
        checkoutReplenishmentFormService.setScheduleReplenishmentFormData
      ).not.toHaveBeenCalled();
    });

    it('should place order when checkbox checked', () => {
      component.currentOrderType = ORDER_TYPE.PLACE_ORDER;
      controls.termsAndConditions.setValue(true);
      component.submitForm();

      expect(checkoutService.placeOrder).toHaveBeenCalled();
      expect(
        checkoutReplenishmentOrderService.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
      expect(
        checkoutReplenishmentFormService.setScheduleReplenishmentFormData
      ).not.toHaveBeenCalled();
    });
  });

  describe('when order type is SCHEDULE_REPLENISHMENT_ORDER', () => {
    it('should not schedule a replenishment order when checkbox not checked', () => {
      component.currentOrderType = ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER;
      controls.termsAndConditions.setValue(false);
      component.submitForm();

      expect(checkoutService.placeOrder).not.toHaveBeenCalled();
      expect(
        checkoutReplenishmentOrderService.scheduleReplenishmentOrder
      ).not.toHaveBeenCalled();
      expect(
        checkoutReplenishmentFormService.setScheduleReplenishmentFormData
      ).not.toHaveBeenCalled();
    });

    it('should schedule a replenishment order when checkbox checked', () => {
      component.currentOrderType = ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER;
      controls.termsAndConditions.setValue(true);
      component.submitForm();

      expect(checkoutService.placeOrder).not.toHaveBeenCalled();
      expect(
        checkoutReplenishmentOrderService.scheduleReplenishmentOrder
      ).toHaveBeenCalled();
      expect(
        checkoutReplenishmentFormService.setScheduleReplenishmentFormData
      ).toHaveBeenCalled();
    });
  });
});
