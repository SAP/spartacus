import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CheckoutService,
  DaysOfWeek,
  I18nTestingModule,
  ORDER_TYPE,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { IconModule } from '../../../misc/index';
import { CheckoutReplenishmentFormService } from '../../services/checkout-replenishment-form-service';
import { ScheduleReplenishmentOrderComponent } from './schedule-replenishment-order.component';

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: 'test-number-days',
  nthDayOfMonth: 'test-day-month',
  recurrencePeriod: 'test-daily',
  numberOfWeeks: 'test-num-of-weeks',
  replenishmentStartDate: 'test-date',
  daysOfWeek: [],
};

class MockCheckoutService {
  getCurrentOrderType(): Observable<ORDER_TYPE> {
    return of();
  }

  setOrderType(_orderType: ORDER_TYPE): void {}
}

class MockCheckoutReplenishmentFormService {
  getScheduleReplenishmentFormData(): Observable<ScheduleReplenishmentForm> {
    return of({});
  }

  setScheduleReplenishmentFormData(
    _formData: ScheduleReplenishmentForm
  ): void {}
}

describe('ScheduleReplenishmentOrderComponent', () => {
  let component: ScheduleReplenishmentOrderComponent;
  let fixture: ComponentFixture<ScheduleReplenishmentOrderComponent>;

  let checkoutService: CheckoutService;
  let checkoutReplenishmentFormService: CheckoutReplenishmentFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule, IconModule],
      declarations: [ScheduleReplenishmentOrderComponent],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        {
          provide: CheckoutReplenishmentFormService,
          useClass: MockCheckoutReplenishmentFormService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleReplenishmentOrderComponent);
    component = fixture.componentInstance;

    checkoutService = TestBed.inject(CheckoutService);
    checkoutReplenishmentFormService = TestBed.inject(
      CheckoutReplenishmentFormService
    );

    component.scheduleReplenishmentFormData = mockReplenishmentOrderFormData;

    spyOn(checkoutService, 'getCurrentOrderType').and.returnValue(
      of(ORDER_TYPE.PLACE_ORDER)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get selected order type', () => {
  //   let result: ORDER_TYPE;

  //   component.selectedOrderType$.subscribe((data) => {
  //     result = data;
  //   });

  //   expect(result).toEqual(ORDER_TYPE.PLACE_ORDER);
  // });

  it('should change order type', () => {
    spyOn(checkoutService, 'setOrderType').and.callThrough();

    component.changeOrderType(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER);

    expect(checkoutService.setOrderType).toHaveBeenCalledWith(
      ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER
    );
  });

  it('should change number of days of replenishment form data', () => {
    spyOn(
      checkoutReplenishmentFormService,
      'setScheduleReplenishmentFormData'
    ).and.callThrough();

    const mockNumberOfDays = 'new-test-num-days';

    component.changeNumberOfDays(mockNumberOfDays);

    expect(
      checkoutReplenishmentFormService.setScheduleReplenishmentFormData
    ).toHaveBeenCalledWith({
      ...mockReplenishmentOrderFormData,
      numberOfDays: mockNumberOfDays,
    });
  });

  it('should change recurrence period type of replenishment form data', () => {
    spyOn(
      checkoutReplenishmentFormService,
      'setScheduleReplenishmentFormData'
    ).and.callThrough();

    const mockPeriodType = 'test-monthly';

    component.changeRecurrencePeriodType(mockPeriodType);

    expect(
      checkoutReplenishmentFormService.setScheduleReplenishmentFormData
    ).toHaveBeenCalledWith({
      ...mockReplenishmentOrderFormData,
      recurrencePeriod: mockPeriodType,
    });
  });

  it('should change day of month of replenishment form data', () => {
    spyOn(
      checkoutReplenishmentFormService,
      'setScheduleReplenishmentFormData'
    ).and.callThrough();

    const mockDayOfMonth = 'new-test-day-month';

    component.changeDayOfTheMonth(mockDayOfMonth);

    expect(
      checkoutReplenishmentFormService.setScheduleReplenishmentFormData
    ).toHaveBeenCalledWith({
      ...mockReplenishmentOrderFormData,
      nthDayOfMonth: mockDayOfMonth,
    });
  });

  // it('should change replenishment start date of replenishment form data', () => {
  //   spyOn(
  //     checkoutReplenishmentFormService,
  //     'setScheduleReplenishmentFormData'
  //   ).and.callThrough();

  //   const mockStartDate = 'new-test-date';

  //   component.changeReplenishmentStartDate(mockStartDate);

  //   expect(
  //     checkoutReplenishmentFormService.setScheduleReplenishmentFormData
  //   ).toHaveBeenCalledWith({
  //     ...mockReplenishmentOrderFormData,
  //     replenishmentStartDate: mockStartDate,
  //   });
  // });

  it('should change repeat days when reoccurence is weekly of replenishment form data', () => {
    spyOn(
      checkoutReplenishmentFormService,
      'setScheduleReplenishmentFormData'
    ).and.callThrough();

    const mockRepeatDays = DaysOfWeek.MONDAY;

    component.changeRepeatDays(mockRepeatDays, true);

    expect(
      checkoutReplenishmentFormService.setScheduleReplenishmentFormData
    ).toHaveBeenCalledWith({
      ...mockReplenishmentOrderFormData,
      daysOfWeek: [mockRepeatDays],
    });
  });
});
