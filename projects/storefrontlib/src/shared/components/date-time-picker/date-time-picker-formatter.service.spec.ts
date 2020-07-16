import { DateTimePickerFormatterService } from './date-time-picker-formatter.service';

describe('DateTimePickerFormatter Service', () => {
  let service: DateTimePickerFormatterService;

  beforeEach(() => {
    service = new DateTimePickerFormatterService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toNative', () => {
    it('should return null if value is empty', () => {
      expect(service.toNative(undefined)).toEqual(null);
      expect(service.toNative(null)).toEqual(null);
      expect(service.toNative('')).toEqual(null);
    });

    it('should convert value to HTML native date format', () => {
      expect(service.toNative('2010-01-01T00:00:00+0000')).toEqual(
        '2010-01-01'
      );
      expect(service.toNative('2034-07-12T23:59:59+0000')).toEqual(
        '2034-07-12'
      );
    });
  });

  describe('toModel', () => {
    it('should return undefined if value is empty', () => {
      expect(service.toModel(undefined)).toEqual(undefined);
      expect(service.toModel(null)).toEqual(undefined);
      expect(service.toModel('')).toEqual(undefined);
    });

    it('should convert value to format supported by occ', () => {
      expect(service.toModel('2010-01-01')).toEqual('2010-01-01T00:00:00+0000');
    });
  });

  describe('getLocalTimezoneOffset()', () => {
    function fakeDateTimezoneOffset(offset: number, callback: Function): any {
      const original = Date.prototype.getTimezoneOffset;
      Date.prototype.getTimezoneOffset = () => offset;
      callback();
      Date.prototype.getTimezoneOffset = original;
    }

    it('should return utc-0 offset string', () =>
      fakeDateTimezoneOffset(0, () => {
        expect(service.getLocalTimezoneOffset()).toEqual('+00:00');
      }));

    it('should return past offset string', () => {
      fakeDateTimezoneOffset(120, () => {
        expect(service.getLocalTimezoneOffset()).toEqual('-02:00');
      });
    });

    it('should return future offset string', () => {
      fakeDateTimezoneOffset(-180, () => {
        expect(service.getLocalTimezoneOffset()).toEqual('+03:00');
      });
    });

    it('should invert past offset string', () => {
      fakeDateTimezoneOffset(120, () => {
        expect(service.getLocalTimezoneOffset(true)).toEqual('+02:00');
      });
    });

    it('should invert future offset string', () => {
      fakeDateTimezoneOffset(-180, () => {
        expect(service.getLocalTimezoneOffset(true)).toEqual('-03:00');
      });
    });
  });
});
