import { async, TestBed } from '@angular/core/testing';
import { ScheduleReplenishmentForm } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { CheckoutReplenishmentFormService } from './checkout-replenishment-form-service';

const mockDefaultReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: 'test-number-days',
};

const newReplenishmentFormData: ScheduleReplenishmentForm = {
  recurrencePeriod: 'test-period',
  numberOfWeeks: 'test-num-weeks',
};

describe('Checkout Replenishment Form Service', () => {
  let service: CheckoutReplenishmentFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutReplenishmentFormService],
    });
  }));

  beforeEach(() => {
    service = TestBed.inject(CheckoutReplenishmentFormService);
    service['scheduleReplenishmentFormData$'] = new BehaviorSubject<
      ScheduleReplenishmentForm
    >(mockDefaultReplenishmentOrderFormData);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get replenishment form data', () => {
    let result: ScheduleReplenishmentForm;

    service
      .getScheduleReplenishmentFormData()
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockDefaultReplenishmentOrderFormData);
  });

  it('should set new replenishment form data', () => {
    service.setScheduleReplenishmentFormData(newReplenishmentFormData);

    let result: ScheduleReplenishmentForm;

    service
      .getScheduleReplenishmentFormData()
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(newReplenishmentFormData);
  });

  it('should reset the form data to default', () => {
    service.setScheduleReplenishmentFormData(newReplenishmentFormData);

    let result: ScheduleReplenishmentForm;

    service
      .getScheduleReplenishmentFormData()
      .subscribe((data) => (result = data));

    expect(result).toEqual(newReplenishmentFormData);

    service.resetScheduleReplenishmentFormData();

    expect(result).toEqual(service.defaultFormData);
  });
});
