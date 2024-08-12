import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleServiceOrderComponent } from './reschedule-service-order.component';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of, throwError } from 'rxjs';
import { OrderDetailsService } from '@spartacus/order/components';
import { FormBuilder } from '@angular/forms';
import {
  RescheduleServiceOrderFacade,
  CheckoutServiceSchedulePickerService,
  ServiceDateTime,
} from '@spartacus/s4-service/root';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import createSpy = jasmine.createSpy;

const mockOrder = {
  code: '0005004001',
  entries: [
    {
      product: {
        code: 'SRV_01',
        name: 'SRV_01',
        productTypes: 'SERVICE',
      },
    },
  ],
  serviceReschedulable: false,
  servicedAt: '2024-08-06T11:00:00+0000',
};
const mockOrder2 = {
  entries: [
    {
      product: {
        code: 'SRV_01',
        name: 'SRV_01',
        productTypes: 'SERVICE',
      },
    },
  ],
};
class MockOrderDetailsService {
  getOrderDetails() {
    return of(mockOrder);
  }
}
class MockRescheduleServiceOrderFacade {
  rescheduleService(_orderCode: string, _scheduledAt: ServiceDateTime) {}
}
class MockRoutingService {
  go = createSpy().and.callThrough();
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy().and.callThrough();
}
class MockCheckoutServiceSchedulePickerService {
  getMinDateForService = createSpy().and.returnValue(
    of('2024-07-06T11:00:00+0000')
  );
  getScheduledServiceTimes = createSpy().and.returnValue(
    of(['08:00', '14:30', '16:00'])
  );
  convertDateTimeToReadableString =
    createSpy().and.returnValue('11/07/2024, 14:30');
  getServiceDetailsFromDateTime = createSpy().and.returnValue({
    date: '11/07/2024',
    time: '14:30',
  });
  convertToDateTime = createSpy().and.returnValue('2024-06-27T14:30:00±HH:MM');
}

describe('RescheduleServiceOrderComponent', () => {
  let component: RescheduleServiceOrderComponent;
  let fixture: ComponentFixture<RescheduleServiceOrderComponent>;
  let rescheduleServiceOrderFacade: RescheduleServiceOrderFacade;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let checkoutServiceSchedulePickerService: CheckoutServiceSchedulePickerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, UrlTestingModule],
      declarations: [RescheduleServiceOrderComponent],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        {
          provide: RescheduleServiceOrderFacade,
          useClass: MockRescheduleServiceOrderFacade,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        {
          provide: CheckoutServiceSchedulePickerService,
          useClass: MockCheckoutServiceSchedulePickerService,
        },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RescheduleServiceOrderComponent);
    component = fixture.componentInstance;
    rescheduleServiceOrderFacade = TestBed.inject(RescheduleServiceOrderFacade);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    checkoutServiceSchedulePickerService = TestBed.inject(
      CheckoutServiceSchedulePickerService
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form with date and time of the selected order', () => {
    component.ngOnInit();
    expect(component.form?.get('scheduleDate')?.value).toEqual('11/07/2024');
    expect(component.form?.get('scheduleTime')?.value).toEqual('14:30');
    expect(
      checkoutServiceSchedulePickerService.getServiceDetailsFromDateTime
    ).toHaveBeenCalled();
  });
  it('should initialize the form with minimum date and time if order details are not available', async () => {
    component.initializeForm(mockOrder2);
    expect(component.form?.get('scheduleDate')?.value).toEqual(
      '2024-07-06T11:00:00+0000'
    );
    expect(component.form?.get('scheduleTime')?.value).toEqual('08:00');
    expect(
      checkoutServiceSchedulePickerService.getServiceDetailsFromDateTime
    ).toHaveBeenCalled();
  });
  it('should set schedule time', () => {
    component.setScheduleTime({
      target: { value: '16:00' },
    } as unknown as Event);
    expect(component.form?.get('scheduleTime')?.value).toEqual('16:00');
  });
  it('should show redirect to order details page with success message when successfully rescheduled', () => {
    spyOn(rescheduleServiceOrderFacade, 'rescheduleService').and.returnValue(
      of(200)
    );
    component.rescheduleServiceOrder();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderDetails',
      params: { code: '0005004001' },
    });
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'rescheduleService.rescheduleSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });
  it('should show error message if any error thrown', () => {
    spyOn(rescheduleServiceOrderFacade, 'rescheduleService').and.returnValue(
      throwError('Throwing Error message')
    );
    component.rescheduleServiceOrder();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'rescheduleService.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
