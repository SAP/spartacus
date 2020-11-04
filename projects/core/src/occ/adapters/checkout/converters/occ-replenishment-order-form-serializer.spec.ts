import { TestBed, waitForAsync } from '@angular/core/testing';
import { OccReplenishmentOrderFormSerializer } from './occ-replenishment-order-form-serializer';
import {
  DateTimePickerFormatterService,
  DATETIME_PICKER_INPUT_TYPE,
} from '../../../../util/date-time-picker-formatter.service';

const mockTime = '10:00:00';
const mockDate = '2021-06-01';
const mockModelValue = `${mockDate}T${mockTime}+4000`;

function fakeToLocalTimeString(callback: Function): any {
  const original = Date.prototype.toLocaleTimeString;
  Date.prototype.toLocaleTimeString = () => mockTime;
  callback();
  Date.prototype.toLocaleTimeString = original;
}

class MockDateTimePickerFormatterService {
  toModel = jasmine.createSpy('toModel').and.returnValue(mockModelValue);
}

describe('OccReplenishmentOrderFormSerializer', () => {
  let serializer: OccReplenishmentOrderFormSerializer;
  let service: DateTimePickerFormatterService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          OccReplenishmentOrderFormSerializer,
          {
            provide: DateTimePickerFormatterService,
            useClass: MockDateTimePickerFormatterService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    serializer = TestBed.inject(OccReplenishmentOrderFormSerializer);
    service = TestBed.inject(DateTimePickerFormatterService);
  });

  it('should convert', () => {
    const result = serializer.convert({});
    expect(result).toEqual({});
  });

  it('should convert with replenishment start date', () => {
    const mockParamDate = `${mockDate}T${mockTime}`;

    fakeToLocalTimeString(() => {
      const result = serializer.convert({
        replenishmentStartDate: mockDate,
      });

      expect(service.toModel).toHaveBeenCalledWith(
        mockParamDate,
        DATETIME_PICKER_INPUT_TYPE.DATETIME_LOCAL
      );
      expect(result.replenishmentStartDate).toEqual(mockModelValue);
    });
  });
});
