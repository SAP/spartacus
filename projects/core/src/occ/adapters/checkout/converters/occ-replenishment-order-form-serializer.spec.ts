import { TestBed, waitForAsync } from '@angular/core/testing';
import { OccReplenishmentOrderFormSerializer } from './occ-replenishment-order-form-serializer';

const mockTime = '10:00';
const mockDate = '2021-06-01';
const mockModelValue = `${mockDate}T${mockTime}:00+02:00`;

function fakeToLocalTimeString(callback: Function): any {
  const original = Date.prototype.toLocaleTimeString;
  Date.prototype.toLocaleTimeString = () => mockTime;
  callback();
  Date.prototype.toLocaleTimeString = original;
}

function fakeDateTimezoneOffset(offset: number, callback: Function): any {
  const original = Date.prototype.getTimezoneOffset;
  Date.prototype.getTimezoneOffset = () => offset;
  callback();
  Date.prototype.getTimezoneOffset = original;
}

describe('OccReplenishmentOrderFormSerializer', () => {
  let serializer: OccReplenishmentOrderFormSerializer;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [OccReplenishmentOrderFormSerializer],
      });
    })
  );

  beforeEach(() => {
    serializer = TestBed.inject(OccReplenishmentOrderFormSerializer);
  });

  it('should convert', () => {
    const result = serializer.convert({});
    expect(result).toEqual({});
  });

  it('should convert with replenishment start date', () => {
    fakeToLocalTimeString(() => {
      fakeDateTimezoneOffset(-120, () => {
        const result = serializer.convert({
          replenishmentStartDate: mockDate,
        });

        expect(result.replenishmentStartDate).toEqual(mockModelValue);
      });
    });
  });
});
