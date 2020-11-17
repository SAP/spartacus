import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from '.';

const value = '2010-06-01';
const e1: ElementRef = new ElementRef({
  setAttribute() {},
  removeAttribute() {},
});

describe('Date Picker Component', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
  });

  describe('component tests', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    describe('onInput', () => {
      it('should setup nativeValue and value', () => {
        component.onInput({ target: { value: value } });
        expect(component.value).toEqual(value);
      });
    });

    describe('writeValue', () => {
      it('should setup nativeValue and value', () => {
        component.writeValue(value);
        expect(component.value).toEqual(value);
      });
    });

    describe('validate', () => {
      it('should pass', () => {
        component.value = value;
        component.min = '2010-05-01';
        component.max = '2010-07-01';
        fixture.detectChanges();
        expect(component.validate()).toEqual(undefined);
      });

      it('should return cxDateMax', () => {
        component.value = value;
        component.min = '2010-04-01';
        component.max = '2010-05-01';
        fixture.detectChanges();
        expect(component.validate()).toEqual({ cxDateMax: true });
      });

      it('should return cxDateMin', () => {
        component.value = value;
        component.min = '2010-07-01';
        component.max = '2010-08-01';
        fixture.detectChanges();
        expect(component.validate()).toEqual({ cxDateMin: true });
      });
    });
  });

  describe('setDisabledState', () => {
    beforeEach(() => {
      component.input = e1;
    });

    it('should disable when isDisabled is true', () => {
      spyOn(e1.nativeElement, 'setAttribute');

      component.setDisabledState(true);
      fixture.detectChanges();

      expect(e1.nativeElement.setAttribute).toHaveBeenCalledWith(
        'disabled',
        true
      );
    });

    it('should not disable when isDisabled is false', () => {
      spyOn(e1.nativeElement, 'removeAttribute');

      component.setDisabledState(false);
      fixture.detectChanges();

      expect(e1.nativeElement.removeAttribute).toHaveBeenCalledWith('disabled');
    });
  });
});
