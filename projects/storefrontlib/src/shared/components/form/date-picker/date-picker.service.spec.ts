import { TestBed } from '@angular/core/testing';
import { DatePickerService } from './date-picker.service';

describe('DatePickerService', () => {
  let service: DatePickerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePickerService],
    });
    service = TestBed.inject(DatePickerService);
  });

  it('should inject DatePickerService', () => {
    expect(service).toBeTruthy();
  });

  describe('default date format', () => {
    it('should return date pattern', () => {
      expect(service.pattern).toEqual('\\d{4}-\\d{1,2}-\\d{1,2}');
    });
    it('should return date', () => {
      expect(service.getDate('2020-12-1')).toEqual(new Date(2020, 11, 1));
    });
  });

  describe('yyyy/mm/dd', () => {
    beforeEach(() => {
      spyOnProperty(service, 'placeholder').and.returnValue('yyyy/mm/dd');
    });
    it('should return date pattern', () => {
      expect(service.pattern).toEqual('\\d{4}/\\d{1,2}/\\d{1,2}');
    });
    it('should return date', () => {
      expect(service.getDate('2020/12/1')).toEqual(new Date(2020, 11, 1));
    });
  });

  describe('dd.mm.yyyy', () => {
    beforeEach(() => {
      spyOnProperty(service, 'placeholder').and.returnValue('dd.mm.yyyy');
    });
    it('should return date pattern ', () => {
      expect(service.pattern).toEqual('\\d{1,2}.\\d{1,2}.\\d{4}');
    });
    it('should return date', () => {
      expect(service.getDate('1.12.2020')).toEqual(new Date(2020, 11, 1));
    });
  });

  describe('dd-mm-yyyy', () => {
    beforeEach(() => {
      spyOnProperty(service, 'placeholder').and.returnValue('dd-mm-yyyy');
    });
    it('should return date pattern ', () => {
      expect(service.pattern).toEqual('\\d{1,2}-\\d{1,2}-\\d{4}');
    });
    it('should return date', () => {
      expect(service.getDate('1-12-2020')).toEqual(new Date(2020, 11, 1));
    });
  });

  describe('dd mm yyyy', () => {
    beforeEach(() => {
      spyOnProperty(service, 'placeholder').and.returnValue('dd mm yyyy');
    });
    it('should return date pattern ', () => {
      expect(service.pattern).toEqual('\\d{1,2} \\d{1,2} \\d{4}');
    });
    it('should return date', () => {
      expect(service.getDate('1 12 2020')).toEqual(new Date(2020, 11, 1));
    });
  });
});
