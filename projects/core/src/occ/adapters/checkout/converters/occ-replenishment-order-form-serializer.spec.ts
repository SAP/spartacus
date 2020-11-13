import { TestBed, waitForAsync } from '@angular/core/testing';
import { TimeUtils } from '@spartacus/core';
import { OccReplenishmentOrderFormSerializer } from './occ-replenishment-order-form-serializer';

const mockTime = '10:00';
const mockDate = '2021-06-01';

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
    TimeUtils.fakeToLocalTimeString(mockTime, () => {
      TimeUtils.fakeDateTimezoneOffset(-120, () => {
        const mockModelValue = `${mockDate}T${mockTime}:00${TimeUtils.getLocalTimezoneOffset()}`;
        const result = serializer.convert({
          replenishmentStartDate: mockDate,
        });

        expect(result.replenishmentStartDate).toEqual(mockModelValue);
      });
    });
  });
});
