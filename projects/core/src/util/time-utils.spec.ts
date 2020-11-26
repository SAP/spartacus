import { TestingTimeUtils } from './testing-time-utils';
import { TimeUtils } from './time-utils';

describe('TimeUtils', () => {
  describe('getLocalTimezoneOffset', () => {
    it('should get local timezone offset', () => {
      const offset = -120;
      TestingTimeUtils.fakeDateTimezoneOffset(offset, () => {
        const result = TimeUtils.getLocalTimezoneOffset();
        expect(result).toEqual('+02:00');
      });
    });

    it('should get inverted local timezone offset', () => {
      const offset = -120;
      TestingTimeUtils.fakeDateTimezoneOffset(offset, () => {
        const result = TimeUtils.getLocalTimezoneOffset(true);
        expect(result).toEqual('-02:00');
      });
    });
  });

  describe('convertDateToDatetime', () => {
    const mockDate = '2021-06-01';
    const startOfDayTime = '00:00:00';
    const endOfDayTime = '23:59:59';

    it('should convert to start of day', () => {
      const result = TimeUtils.convertDateToDatetime(mockDate);
      expect(result).toEqual(
        `${mockDate}T${startOfDayTime}${TimeUtils.getLocalTimezoneOffset()}`
      );
    });

    it('should convert to end of day', () => {
      const result = TimeUtils.convertDateToDatetime(mockDate, true);
      expect(result).toEqual(
        `${mockDate}T${endOfDayTime}${TimeUtils.getLocalTimezoneOffset()}`
      );
    });
  });

  describe('convertDatetimeToDate', () => {
    it('should convert to today', () => {
      const mockDateTime = '2021-06-01T00:00:00';
      const offset = 0;

      TestingTimeUtils.fakeDateTimezoneOffset(offset, () => {
        const result = TimeUtils.convertDatetimeToDate(mockDateTime);
        expect(result).toEqual('2021-06-01');
      });
    });

    it('should convert to yesterday', () => {
      const mockDateTime = '2021-06-01T00:00:00';
      const offset = 120;

      TestingTimeUtils.fakeDateTimezoneOffset(offset, () => {
        const result = TimeUtils.convertDatetimeToDate(mockDateTime);
        expect(result).toEqual('2021-05-31');
      });
    });

    it('should convert to tomorrow', () => {
      const mockDateTime = '2021-06-01T23:00:00';
      const offset = -120;

      TestingTimeUtils.fakeDateTimezoneOffset(offset, () => {
        const result = TimeUtils.convertDatetimeToDate(mockDateTime);
        expect(result).toEqual('2021-06-02');
      });
    });
  });
});
