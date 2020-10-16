import { async, TestBed } from '@angular/core/testing';
import { OccReplenishmentOrderFormSerializer } from './occ-replenishment-order-form-serializer';

describe('OccReplenishmentOrderFormSerializer', () => {
  let serializer: OccReplenishmentOrderFormSerializer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [OccReplenishmentOrderFormSerializer],
    });
  }));

  beforeEach(() => {
    serializer = TestBed.inject(OccReplenishmentOrderFormSerializer);
  });

  it('should create', () => {
    expect(serializer).toBeTruthy();
  });

  it('should convert the date string of schedule replenishment form to ISO 8601 format', () => {
    const mockDate = '1994-01-11';
    const currentLocalTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const ISODateFormat = mockDate + 'T' + currentLocalTime + '-05:00';

    const result = serializer['convertDate'](mockDate);

    expect(result).toEqual(ISODateFormat);
  });
});
