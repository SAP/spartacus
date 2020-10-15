import { DatePickerFormatterService } from './date-picker-formatter.service';

describe('DatePickerFormatter Service', () => {
  let service: DatePickerFormatterService;

  beforeEach(() => {
    service = new DatePickerFormatterService();
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
      expect(service.toModel(undefined, false)).toEqual(undefined);
      expect(service.toModel(null, true)).toEqual(undefined);
      expect(service.toModel('', false)).toEqual(undefined);
    });

    it('should convert value to format supported by occ', () => {
      expect(service.toModel('2010-01-01', false)).toEqual(
        '2010-01-01T00:00:00+0000'
      );
    });

    it('should convert value (endDate) to format supported by occ', () => {
      expect(service.toModel('2034-07-12', true)).toEqual(
        '2034-07-12T23:59:59+0000'
      );
    });
  });

  describe('toISOString', () => {
    it('should return null if value is empty', () => {
      expect(service.toOccString(undefined)).toEqual(null);
      expect(service.toOccString(null)).toEqual(null);
      expect(service.toOccString('')).toEqual(null);
    });

    it('should convert value to expected OCC date with offset', () => {
      const mockDate = '2010-01-01';
      const expectedDate = '2010-01-01THH:mm:ss+xxxx';

      expect(service.toOccString(mockDate)).toEqual(expectedDate);
    });
  });
});
