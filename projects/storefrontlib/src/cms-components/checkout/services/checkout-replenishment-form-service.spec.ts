import { async, TestBed } from '@angular/core/testing';
import { ScheduleReplenishmentForm } from '@spartacus/core';
import { CheckoutReplenishmentFormService } from './checkout-replenishment-form-service';

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
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get default replenishment form data', () => {
    let result: ScheduleReplenishmentForm;

    service.scheduleReplenishmentFormData$
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(service.defaultFormData);
  });

  it('should emit new replenishment form data', () => {
    service.emitScheduleReplenishmentFormData(newReplenishmentFormData);

    let result: ScheduleReplenishmentForm;

    service.scheduleReplenishmentFormData$
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(newReplenishmentFormData);
  });

  it('should reset the form data to default', () => {
    service.emitScheduleReplenishmentFormData(newReplenishmentFormData);

    let result: ScheduleReplenishmentForm;

    service.scheduleReplenishmentFormData$.subscribe((data) => (result = data));

    expect(result).toEqual(newReplenishmentFormData);

    service.resetScheduleReplenishmentFormData();

    expect(result).toEqual(service.defaultFormData);
  });
});
