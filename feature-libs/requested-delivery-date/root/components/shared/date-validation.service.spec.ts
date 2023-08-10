import { TestBed } from '@angular/core/testing';
import { DateValidationService } from './date-validation.service';

const mockValidDate = '15-09-2023';
const mockInvalidDate1 = '32-09-2023';
const mockInvalidDate2 = '29-02-rddo';
const mockInvalidDate3 = '';
const mockInvalidDate4 = 'abcd';

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
