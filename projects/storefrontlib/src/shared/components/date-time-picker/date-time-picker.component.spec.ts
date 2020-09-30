import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTimePickerFormatterService } from './date-time-picker-formatter.service';
import { DateTimePickerComponent } from './date-time-picker.component';

import createSpy = jasmine.createSpy;

const nativeValue = '2010-06-01T00:00';
const modelValue = '2010-06-01T00:00:00+0000';

class MockDateTimePickerFormatterService
  implements Partial<DateTimePickerFormatterService> {
  toModel = createSpy('toModel').and.returnValue(modelValue);
  toNative = createSpy('toNative').and.returnValue(nativeValue);
}

describe('Date Time Picker Component', () => {
  let component: DateTimePickerComponent;
  let fixture: ComponentFixture<DateTimePickerComponent>;
  let service: DateTimePickerFormatterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimePickerComponent],
      providers: [
        {
          provide: DateTimePickerFormatterService,
          useClass: MockDateTimePickerFormatterService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimePickerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DateTimePickerFormatterService);
  });

  describe('component tests', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    describe('onInput', () => {
      it('should setup nativeValue and value', () => {
        component.onInput({ target: { value: nativeValue } });
        expect(service.toModel).toHaveBeenCalledWith(nativeValue);
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
        component.getMin = createSpy('getMin').and.returnValue(
          '2010-05-01T00:00'
        );
        component.getMax = createSpy('getMax').and.returnValue(
          '2010-07-01T00:00'
        );
        fixture.detectChanges();
        expect(component.validate()).toEqual(undefined);
      });

      it('should return cxDateMax', () => {
        component.value = modelValue;
        component.nativeValue = nativeValue;
        component.getMin = createSpy('getMin').and.returnValue(
          '2010-04-01T00:00'
        );
        component.getMax = createSpy('getMax').and.returnValue(
          '2010-05-01T00:00'
        );
        fixture.detectChanges();
        expect(component.validate()).toEqual({ cxDateMax: true });
      });

      it('should return cxDateMin', () => {
        component.value = modelValue;
        component.nativeValue = nativeValue;
        component.getMin = createSpy('getMin').and.returnValue(
          '2010-07-01T00:00'
        );
        component.getMax = createSpy('getMax').and.returnValue(
          '2010-08-01T00:00'
        );
        fixture.detectChanges();
        expect(component.validate()).toEqual({ cxDateMin: true });
      });
    });
  });
});
