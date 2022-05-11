import { TestBed, waitForAsync } from '@angular/core/testing';
import { TestingTimeUtils, TimeUtils } from '@spartacus/core';
import { OccScheduledReplenishmentOrderFormSerializer } from './occ-scheduled-replenishment-order-form-serializer';

const mockTime = '10:00';
const mockDate = '2021-06-01';

describe('OccScheduledReplenishmentOrderFormSerializer', () => {
  let serializer: OccScheduledReplenishmentOrderFormSerializer;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [OccScheduledReplenishmentOrderFormSerializer],
      });
    })
  );

  beforeEach(() => {
    serializer = TestBed.inject(OccScheduledReplenishmentOrderFormSerializer);
  });

  it('should convert', () => {
    const result = serializer.convert({});
    expect(result).toEqual({});
  });

  it('should convert with replenishment start date', () => {
    TestingTimeUtils.fakeToLocaleTimeString(mockTime, () => {
      TestingTimeUtils.fakeDateTimezoneOffset(-120, () => {
        const mockModelValue = `${mockDate}T${mockTime}:00${TimeUtils.getLocalTimezoneOffset()}`;
        const result = serializer.convert({
          replenishmentStartDate: mockDate,
        });

        expect(result.replenishmentStartDate).toEqual(mockModelValue);
      });
    });
  });
});
