import { TestBed } from '@angular/core/testing';
import { DateValidationService } from './date-validation.service';

const mockValidDate = '15-09-2023';
const mockInvalidDate1 = '32-09-2023';
const mockInvalidDate2 = '29-02-rddo';
const mockInvalidDate3 = '';
const mockInvalidDate4 = 'abcd';
const mockValidGreaterDate = '31-12-2023';
const mockValidLesserDate = '01-01-2023';

describe('DateValidationService', () => {
  let service: DateValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateValidationService],
    });

    service = TestBed.inject(DateValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isDateStringValid', () => {
    it('should validate correct Dates', () => {
      expect(service.isDateStringValid(mockValidDate)).toBeTruthy();
    });

    it('should invalidate wrong Dates', () => {
      expect(service.isDateStringValid(mockInvalidDate1)).toBeFalsy();
      expect(service.isDateStringValid(mockInvalidDate2)).toBeFalsy();
      expect(service.isDateStringValid(mockInvalidDate3)).toBeFalsy();
      expect(service.isDateStringValid(mockInvalidDate4)).toBeFalsy();
    });
  });

  describe('isDateGreaterOrEqual', () => {
    it('should return false for invalid dates', () => {
      expect(service.isDateGreaterOrEqual(mockValidDate, '')).toBeFalsy();
    });

    it('should return false when source date is less than target', () => {
      expect(
        service.isDateGreaterOrEqual(mockValidLesserDate, mockValidDate)
      ).toBeFalsy();
    });

    it('should return true for equal dates', () => {
      expect(
        service.isDateGreaterOrEqual(mockValidDate, mockValidDate)
      ).toBeTruthy();
    });

    it('should return true when source date is greater than target', () => {
      expect(
        service.isDateGreaterOrEqual(mockValidGreaterDate, mockValidDate)
      ).toBeTruthy();
    });
  });
});
