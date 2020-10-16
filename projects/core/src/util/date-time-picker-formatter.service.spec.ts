import { DateTimePickerFormatterService } from './date-time-picker-formatter.service';

describe('DateTimePickerFormatter Service', () => {
  let service: DateTimePickerFormatterService;

  beforeEach(() => {
    service = new DateTimePickerFormatterService();
  });

  function fakeDateTimezoneOffset(offset: number, callback: Function): any {
    const original = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = () => offset;
    callback();
    Date.prototype.getTimezoneOffset = original;
  }

  function fakeLocalTime(): any {
    const currentLocalTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return currentLocalTime;
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toNative', () => {
    it('should return null if value is empty', () => {
      expect(service.toNative(undefined)).toEqual(null);
      expect(service.toNative(null)).toEqual(null);
      expect(service.toNative('')).toEqual(null);
    });

    describe('should convert value to HTML native datetime-local format', () => {
      it('should return utc-0 offset string', () => {
        fakeDateTimezoneOffset(0, () => {
          expect(service.toNative('2010-01-01T00:00+0000')).toEqual(
            '2010-01-01T00:00'
          );
          expect(service.toNative('2034-07-12T23:59+0000')).toEqual(
            '2034-07-12T23:59'
          );
        });
      });

      it('should return past offset string (using local offset)', () => {
        fakeDateTimezoneOffset(120, () => {
          expect(service.toNative('2010-01-01T00:00+0000')).toEqual(
            '2009-12-31T22:00'
          );
          expect(service.toNative('2034-07-12T23:59+0000')).toEqual(
            '2034-07-12T21:59'
          );
        });
      });

      it('should return past offset string (using string offset)', () => {
        fakeDateTimezoneOffset(0, () => {
          expect(service.toNative('2010-01-01T00:00+02:00')).toEqual(
            '2009-12-31T22:00'
          );
          expect(service.toNative('2034-07-12T23:59+02:00')).toEqual(
            '2034-07-12T21:59'
          );
        });
      });

      it('should return future offset string (using local offset)', () => {
        fakeDateTimezoneOffset(-180, () => {
          expect(service.toNative('2010-01-01T00:00+0000')).toEqual(
            '2010-01-01T03:00'
          );
          expect(service.toNative('2034-07-12T23:59+0000')).toEqual(
            '2034-07-13T02:59'
          );
        });
      });

      it('should return future offset string (using string offset)', () => {
        fakeDateTimezoneOffset(0, () => {
          expect(service.toNative('2010-01-01T00:00-03:00')).toEqual(
            '2010-01-01T03:00'
          );
          expect(service.toNative('2034-07-12T23:59-03:00')).toEqual(
            '2034-07-13T02:59'
          );
        });
      });
    });
  });

  describe('toModel', () => {
    it('should return null if value is empty', () => {
      expect(service.toModel(undefined)).toEqual(null);
      expect(service.toModel(null)).toEqual(null);
      expect(service.toModel('')).toEqual(null);
    });

    describe('should convert value to format supported by occ', () => {
      it('should return utc-0 offset string', () => {
        fakeDateTimezoneOffset(0, () => {
          expect(service.toModel('2010-01-01T00:00')).toEqual(
            '2010-01-01T00:00:00+00:00'
          );
          expect(service.toModel('2010-01-01T23:59')).toEqual(
            '2010-01-01T23:59:00+00:00'
          );
        });
      });

      it('should return past offset string', () => {
        fakeDateTimezoneOffset(120, () => {
          expect(service.toModel('2010-01-01T00:00')).toEqual(
            '2010-01-01T00:00:00-02:00'
          );
          expect(service.toModel('2010-01-01T23:59')).toEqual(
            '2010-01-01T23:59:00-02:00'
          );
        });
      });

      it('should return future offset string', () => {
        fakeDateTimezoneOffset(-180, () => {
          expect(service.toModel('2010-01-01T00:00')).toEqual(
            '2010-01-01T00:00:00+03:00'
          );
          expect(service.toModel('2010-01-01T23:59')).toEqual(
            '2010-01-01T23:59:00+03:00'
          );
        });
      });
    });
  });

  describe('toModelWithTime', () => {
    it('should return null if value is empty', () => {
      expect(service.toModelWithTime(undefined)).toEqual(null);
      expect(service.toModelWithTime(null)).toEqual(null);
      expect(service.toModelWithTime('')).toEqual(null);
    });

    describe('should convert value to format supported by occ', () => {
      it('should return utc-0 offset string', () => {
        fakeDateTimezoneOffset(0, () => {
          expect(service.toModelWithTime('2010-01-01')).toEqual(
            '2010-01-01T' + fakeLocalTime() + '+00:00'
          );
        });
      });
    });
  });
});
