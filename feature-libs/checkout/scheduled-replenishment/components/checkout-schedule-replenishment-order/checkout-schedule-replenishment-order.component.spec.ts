import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  DaysOfWeek,
  ORDER_TYPE,
  recurrencePeriod,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import { IconTestingModule } from 'projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { of } from 'rxjs';
import { CheckoutReplenishmentFormService } from '../services/checkout-replenishment-form.service';
import { CheckoutScheduleReplenishmentOrderComponent } from './checkout-schedule-replenishment-order.component';
import createSpy = jasmine.createSpy;

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: '14',
  nthDayOfMonth: '1',
  recurrencePeriod: recurrencePeriod.WEEKLY,
  numberOfWeeks: '1',
  replenishmentStartDate: '2025-01-30',
  daysOfWeek: [],
};

class MockCheckoutReplenishmentFormService
  implements Partial<CheckoutReplenishmentFormService>
{
  getOrderType = createSpy().and.returnValue(of(ORDER_TYPE.PLACE_ORDER));
  setOrderType = createSpy();
  getScheduleReplenishmentFormData = createSpy().and.returnValue(of({}));
  setScheduleReplenishmentFormData = createSpy();
}

describe('CheckoutScheduleReplenishmentOrderComponent', () => {
  let component: CheckoutScheduleReplenishmentOrderComponent;
  let fixture: ComponentFixture<CheckoutScheduleReplenishmentOrderComponent>;

  let checkoutReplenishmentFormService: CheckoutReplenishmentFormService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule, IconTestingModule],
        declarations: [CheckoutScheduleReplenishmentOrderComponent],
        providers: [
          {
            provide: CheckoutReplenishmentFormService,
            useClass: MockCheckoutReplenishmentFormService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CheckoutScheduleReplenishmentOrderComponent
    );
    component = fixture.componentInstance;

    checkoutReplenishmentFormService = TestBed.inject(
      CheckoutReplenishmentFormService
    );

    component.scheduleReplenishmentFormData = mockReplenishmentOrderFormData;
  });

  it('should get selected order type', (done) => {
    component.selectedOrderType$.subscribe((result) => {
      expect(result).toEqual(ORDER_TYPE.PLACE_ORDER);
      done();
    });
  });

  it('should change order type', () => {
    component.changeOrderType(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER);

    expect(checkoutReplenishmentFormService.setOrderType).toHaveBeenCalledWith(
      ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER
    );
  });

  it('should change number of days of replenishment form data', () => {
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
