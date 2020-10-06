import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from '.';
import { DatePickerFormatterService } from '../../../../../core/src/util/date-picker-formatter.service';

import createSpy = jasmine.createSpy;

const nativeValue = '2010-06-01';
const modelValue = '2010-06-01T00:00:00+0000';

class MockDatePickerFormatterService
  implements Partial<DatePickerFormatterService> {
  toModel = createSpy('toModel').and.returnValue(modelValue);
  toNative = createSpy('toNative').and.returnValue(nativeValue);
}

describe('Date Picker Component', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let service: DatePickerFormatterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
      providers: [
        {
          provide: DatePickerFormatterService,
          useClass: MockDatePickerFormatterService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DatePickerFormatterService);
  });

  describe('component tests', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    describe('onInput', () => {
      it('should setup nativeValue and value', () => {
        component.endOfDay = false;
        component.onInput({ target: { value: nativeValue } });
        expect(service.toModel).toHaveBeenCalledWith(nativeValue, false);
        expect(component.nativeValue).toEqual(nativeValue);
        expect(component.value).toEqual(modelValue);
      });

      it('should setup nativeValue and value with end of day flag', () => {
        component.endOfDay = true;
        component.onInput({ target: { value: nativeValue } });
        expect(service.toModel).toHaveBeenCalledWith(nativeValue, true);
        expect(component.nativeValue).toEqual(nativeValue);
        expect(component.value).toEqual(modelValue);
      });
    });

    describe('writeValue', () => {
      it('should setup nativeValue and value', () => {
        component.writeValue(modelValue);
        expect(service.toNative).toHaveBeenCalledWith(modelValue);
        expect(component.nativeValue).toEqual(nativeValue);
        expect(component.value).toEqual(modelValue);
      });
    });

    describe('getMin', () => {
      it('should return min value in native format', () => {
        component.min = modelValue;
        expect(component.getMin()).toEqual(nativeValue);
        expect(service.toNative).toHaveBeenCalledWith(modelValue);
      });
    });

    describe('getMax', () => {
      it('should return max value in native format', () => {
        component.max = modelValue;
        expect(component.getMax()).toEqual(nativeValue);
        expect(service.toNative).toHaveBeenCalledWith(modelValue);
      });
    });

    describe('validate', () => {
      it('should pass', () => {
        component.value = modelValue;
        component.nativeValue = nativeValue;
        component.getMin = createSpy('getMin').and.returnValue('2010-05-01');
        component.getMax = createSpy('getMax').and.returnValue('2010-07-01');
        fixture.detectChanges();
        expect(component.validate()).toEqual(undefined);
      });

      it('should return cxDateMax', () => {
        component.value = modelValue;
        component.nativeValue = nativeValue;
        component.getMin = createSpy('getMin').and.returnValue('2010-04-01');
        component.getMax = createSpy('getMax').and.returnValue('2010-05-01');
        fixture.detectChanges();
        expect(component.validate()).toEqual({ cxDateMax: true });
      });

      it('should return cxDateMin', () => {
        component.value = modelValue;
        component.nativeValue = nativeValue;
        component.getMin = createSpy('getMin').and.returnValue('2010-07-01');
        component.getMax = createSpy('getMax').and.returnValue('2010-08-01');
        fixture.detectChanges();
        expect(component.validate()).toEqual({ cxDateMin: true });
      });
    });
  });
});
