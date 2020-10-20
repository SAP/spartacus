import { async, TestBed } from '@angular/core/testing';
import { OccReplenishmentOrderFormSerializer } from './occ-replenishment-order-form-serializer';
import { DateTimePickerFormatterService } from '../../../../util/date-time-picker-formatter.service';

import createSpy = jasmine.createSpy;

const modelValue = '2010-06-01T00:00:00+0000';

class MockDateTimePickerFormatterService {
  toModel = createSpy('toModel').and.returnValue(modelValue);
}

describe('OccReplenishmentOrderFormSerializer', () => {
  let serializer: OccReplenishmentOrderFormSerializer;
  let service: DateTimePickerFormatterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        OccReplenishmentOrderFormSerializer,
        {
          provide: DateTimePickerFormatterService,
          useClass: MockDateTimePickerFormatterService,
        },
      ],
    });
  }));

  beforeEach(() => {
    serializer = TestBed.inject(OccReplenishmentOrderFormSerializer);
    service = TestBed.inject(DateTimePickerFormatterService);
  });

  it('should create', () => {
    expect(serializer).toBeTruthy();
  });

  it('should convert the date string with time', () => {
    const mockDateWithTime = '1994-01-11:01:02:03.456Z';
    const result = serializer['convertDate'](mockDateWithTime);
    const ISODateFormat = service.toModel('1994-01-11:01:02:00');

    expect(service.toModel).toHaveBeenCalledWith('1994-01-11:01:02:00');
    expect(result).toEqual(ISODateFormat);
  });

  it('should convert the date string without time', () => {
    const mockDateWithoutTime = '1994-01-11';
    const result = serializer['convertDate'](mockDateWithoutTime);
    const ISODateFormat = service.toModel('1994-01-11:01:02:00');

    expect(service.toModel).toHaveBeenCalledWith('1994-01-11:01:02:00');
    expect(result).toEqual(ISODateFormat);
  });
});
