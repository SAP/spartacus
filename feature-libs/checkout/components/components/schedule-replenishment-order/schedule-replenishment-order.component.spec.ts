import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutFacade } from '@spartacus/checkout/root';
import {
  DaysOfWeek,
  I18nTestingModule,
  ORDER_TYPE,
  recurrencePeriod,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { IconTestingModule } from '../../../../../projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { CheckoutReplenishmentFormService } from '../../services/checkout-replenishment-form-service';
import { ScheduleReplenishmentOrderComponent } from './schedule-replenishment-order.component';

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: '14',
  nthDayOfMonth: '1',
  recurrencePeriod: recurrencePeriod.WEEKLY,
  numberOfWeeks: '1',
  replenishmentStartDate: '2025-01-30',
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

  let checkoutService: CheckoutFacade;
  let checkoutReplenishmentFormService: CheckoutReplenishmentFormService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule, IconTestingModule],
        declarations: [ScheduleReplenishmentOrderComponent],
        providers: [
          { provide: CheckoutFacade, useClass: MockCheckoutService },
          {
            provide: CheckoutReplenishmentFormService,
            useClass: MockCheckoutReplenishmentFormService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleReplenishmentOrderComponent);
    component = fixture.componentInstance;

    checkoutService = TestBed.inject(CheckoutFacade);
    checkoutReplenishmentFormService = TestBed.inject(
      CheckoutReplenishmentFormService
    );

    component.scheduleReplenishmentFormData = mockReplenishmentOrderFormData;
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

    const mockNumberOfDays = '20';

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

    const mockNumberOfWeeks = '5';

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

    const mockPeriodType = recurrencePeriod.MONTHLY;

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

    const mockDayOfMonth = '31';

    component.changeDayOfTheMonth(mockDayOfMonth);

    expect(
      checkoutReplenishmentFormService.setScheduleReplenishmentFormData
    ).toHaveBeenCalledWith({
      ...mockReplenishmentOrderFormData,
      nthDayOfMonth: mockDayOfMonth,
    });
  });

  it('should change replenishment start date of replenishment form data', () => {
    spyOn(
      checkoutReplenishmentFormService,
      'setScheduleReplenishmentFormData'
    ).and.callThrough();

    const mockStartDate = '2021-10-31';

    component.changeReplenishmentStartDate(mockStartDate);

    expect(
      checkoutReplenishmentFormService.setScheduleReplenishmentFormData
    ).toHaveBeenCalledWith({
      ...mockReplenishmentOrderFormData,
      replenishmentStartDate: mockStartDate,
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

  it('should return TRUE if the day exist in the currentDaysOfWeek array', () => {
    component.currentDaysOfWeek = [DaysOfWeek.FRIDAY];

    const result = component.hasDaysOfWeekChecked(DaysOfWeek.FRIDAY);

    expect(result).toBeTruthy();
  });

  it('should return FALSE if the day does NOT exist in the currentDaysOfWeek array', () => {
    component.currentDaysOfWeek = [DaysOfWeek.FRIDAY];

    const result = component.hasDaysOfWeekChecked(DaysOfWeek.MONDAY);

    expect(result).toBeFalsy();
  });
});
