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
    return of(ORDER_TYPE.PLACE_ORDER);
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get selected order type', () => {
    let result: ORDER_TYPE;

    component.selectedOrderType$
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(ORDER_TYPE.PLACE_ORDER);
  });

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

  it('should change number of weeks of replenishment form data', () => {
    spyOn(
      checkoutReplenishmentFormService,
      'setScheduleReplenishmentFormData'
    ).and.callThrough();

    const mockNumberOfWeeks = 'new-test-num-weeks';

    component.changeNumberOfWeeks(mockNumberOfWeeks);

    expect(
      checkoutReplenishmentFormService.setScheduleReplenishmentFormData
    ).toHaveBeenCalledWith({
      ...mockReplenishmentOrderFormData,
      numberOfWeeks: mockNumberOfWeeks,
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

  describe('changeReplenishmentStartDate', () => {
    describe('when form data for numbers of days and day in a month > current current numb of days', () => {
      it('should change replenishment start date of replenishment form data', () => {
        spyOn(
          checkoutReplenishmentFormService,
          'setScheduleReplenishmentFormData'
        ).and.callThrough();

        component.scheduleReplenishmentFormData.numberOfDays = '1';
        component.scheduleReplenishmentFormData.nthDayOfMonth = '1';

        const mockStartDate = new Date('1994-02-11').toISOString();

        component.changeReplenishmentStartDate(mockStartDate);

        expect(
          checkoutReplenishmentFormService.setScheduleReplenishmentFormData
        ).toHaveBeenCalledWith({
          ...mockReplenishmentOrderFormData,
          replenishmentStartDate: mockStartDate,
        });
      });
    });

    describe('when form data for day in a month > current current numb of days', () => {
      it('should change replenishment start date of replenishment form data', () => {
        spyOn(
          checkoutReplenishmentFormService,
          'setScheduleReplenishmentFormData'
        ).and.callThrough();

        component.scheduleReplenishmentFormData.numberOfDays = '1';
        component.scheduleReplenishmentFormData.nthDayOfMonth = '31';

        const mockStartDate = new Date('1994-02-11').toISOString();

        component.changeReplenishmentStartDate(mockStartDate);

        expect(
          checkoutReplenishmentFormService.setScheduleReplenishmentFormData
        ).toHaveBeenCalledWith({
          ...mockReplenishmentOrderFormData,
          nthDayOfMonth: '1',
          replenishmentStartDate: mockStartDate,
        });
      });
    });

    describe('when form data for number of days > current current numb of days', () => {
      it('should change replenishment start date of replenishment form data', () => {
        spyOn(
          checkoutReplenishmentFormService,
          'setScheduleReplenishmentFormData'
        ).and.callThrough();

        component.scheduleReplenishmentFormData.nthDayOfMonth = '1';
        component.scheduleReplenishmentFormData.numberOfDays = '31';

        const mockStartDate = new Date('1994-02-11').toISOString();

        component.changeReplenishmentStartDate(mockStartDate);

        expect(
          checkoutReplenishmentFormService.setScheduleReplenishmentFormData
        ).toHaveBeenCalledWith({
          ...mockReplenishmentOrderFormData,
          numberOfDays: '1',
          replenishmentStartDate: mockStartDate,
        });
      });
    });

    describe('when form data for numbers of days and day in a month > current current numb of days', () => {
      it('should change replenishment start date of replenishment form data', () => {
        spyOn(
          checkoutReplenishmentFormService,
          'setScheduleReplenishmentFormData'
        ).and.callThrough();

        component.scheduleReplenishmentFormData.numberOfDays = '31';
        component.scheduleReplenishmentFormData.nthDayOfMonth = '31';

        const mockStartDate = new Date('1994-02-11').toISOString();

        component.changeReplenishmentStartDate(mockStartDate);

        expect(
          checkoutReplenishmentFormService.setScheduleReplenishmentFormData
        ).toHaveBeenCalledWith({
          ...mockReplenishmentOrderFormData,
          numberOfDays: '1',
          nthDayOfMonth: '1',
          replenishmentStartDate: mockStartDate,
        });
      });
    });
  });

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

  it('should return TRUE if the day does exist in the currentDaysOfWeek array', () => {
    component.currentDaysOfWeek = [DaysOfWeek.FRIDAY];

    const result = component.hasDaysOfWeekChecked(DaysOfWeek.FRIDAY);

    expect(result).toBeTruthy();
  });

  it('should return FALSE if the day does NOT exist in the currentDaysOfWeek array', () => {
    component.currentDaysOfWeek = [DaysOfWeek.FRIDAY];

    const result = component.hasDaysOfWeekChecked(DaysOfWeek.MONDAY);

    expect(result).toBeFalsy();
  });

  it('should get the date and format to YYYY-MM-DD', () => {
    const ISODateFormat = '1994-01-11T00:00Z';

    const result = component.currentISODate(ISODateFormat);

    expect(result).toEqual('1994-01-11');
  });
});
