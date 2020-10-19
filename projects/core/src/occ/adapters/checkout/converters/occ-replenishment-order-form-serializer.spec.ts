import { async, TestBed } from '@angular/core/testing';
import { OccReplenishmentOrderFormSerializer } from './occ-replenishment-order-form-serializer';
import { DateTimePickerFormatterService } from '../../../../util/date-time-picker-formatter.service';

import createSpy = jasmine.createSpy;

const nativeValue = '2010-06-01T00:00';
const modelValue = '2010-06-01T00:00:00+0000';

class MockDateTimePickerFormatterService
  implements Partial<DateTimePickerFormatterService> {
  toModel = createSpy('toModel').and.returnValue(modelValue);
  toNative = createSpy('toNative').and.returnValue(nativeValue);
}

fdescribe('OccReplenishmentOrderFormSerializer', () => {
  let serializer: OccReplenishmentOrderFormSerializer;
  let service: DateTimePickerFormatterService; // is this even being tested?

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OccReplenishmentOrderFormSerializer,
          DateTimePickerFormatterService,
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

  it('should convert the date string of schedule replenishment form to ISO 8601 format', () => {
    const mockDate = '1994-01-11:01:02:03';

    const ISODateFormat = mockDate + '-05:00';

    const result = serializer['convertDate'](mockDate);

    expect(result).toEqual(ISODateFormat);
  });
});
