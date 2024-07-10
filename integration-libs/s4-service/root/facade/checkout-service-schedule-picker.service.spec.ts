import { TestBed } from '@angular/core/testing';
import { CheckoutServiceSchedulePickerService } from './checkout-service-schedule-picker.service';
import {
  BaseSiteService,
  CxDatePipe,
  I18nTestingModule,
  LanguageService,
  TimeUtils,
  TranslationService,
} from '@spartacus/core';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
const mockLanguageService = {
  getActive: () => {},
};
const mockBaseSite = {
  baseStore: {
    serviceOrderConfiguration: {
      leadDays: 3,
      serviceScheduleTimes: ['08:00', '12:00', '16:00'],
    },
  },
};

const translationServiceMock = {
  translate: jasmine
    .createSpy('translate')
    .and.returnValue(of('Delivery Date')),
};

class MockBaseSiteService implements Partial<BaseSiteService> {
  get = createSpy().and.returnValue(of(mockBaseSite));
}
class MockCxDatePipe {
  transform(value: any, format?: string): string | null {
    return value instanceof Date && format === 'yyyy-MM-dd'
      ? '2024-07-11'
      : null;
  }
}
describe('CheckoutServiceSchedulePickerService', () => {
  let service: CheckoutServiceSchedulePickerService;
  let pipe: CxDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        CheckoutServiceSchedulePickerService,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: TranslationService, useValue: translationServiceMock },
      ],
    });

    service = TestBed.inject(CheckoutServiceSchedulePickerService);
    pipe = TestBed.inject(CxDatePipe);
  });

  it('should return minimum date for service scheduling', () => {
    spyOn(service, 'getServiceOrderConfiguration').and.callThrough();
    spyOn(pipe, 'transform').and.callThrough();
    let expectedDate = new Date();
    expectedDate.setDate(
      expectedDate.getDate() +
        (mockBaseSite.baseStore.serviceOrderConfiguration.leadDays + 1)
    );
    const result2 = service.getMinDateForService();
    expect(service.getServiceOrderConfiguration).toHaveBeenCalled();
    expect(pipe.transform).toHaveBeenCalled();
    expect(result2).toEqual('2024-07-11');
  });

  it('should return the scheduled service times from the configuration', () => {
    spyOn(service, 'getServiceOrderConfiguration').and.callThrough();
    const result = service.getScheduledServiceTimes();
    expect(service.getServiceOrderConfiguration).toHaveBeenCalled();
    expect(result).toEqual(
      mockBaseSite.baseStore.serviceOrderConfiguration.serviceScheduleTimes
    );
  });

  it('should convert date and time to a DateTime string with timezone offset', () => {
    spyOn(TimeUtils, 'getLocalTimezoneOffset').and.returnValue('+05:30');
    const result = service.convertToDateTime('2024-07-11', '14:30');
    expect(result).toEqual('2024-07-11T14:30:00+05:30');
  });

  it('should convert dateTime string to a readable string', () => {
    const dateTime = '2024-07-11T14:30:00+05:30';
    const date = new Date(dateTime);
    const result = service.convertDateTimeToReadableString(dateTime);
    expect(result).toEqual(date.toLocaleString().slice(0, -3));
  });

  it('should convert dateTime string to an object with separate date and time properties', () => {
    spyOn(pipe, 'transform').and.callThrough();
    const result = service.getServiceDetailsFromDateTime('11/07/2024, 14:30');
    expect(result).toEqual({ date: '2024-07-11', time: '14:30' });
  });
  it('should return service order configuration', () => {
    const result = service.getServiceOrderConfiguration();
    expect(result).toEqual(mockBaseSite.baseStore.serviceOrderConfiguration);
  });
});
