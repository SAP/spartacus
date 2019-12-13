import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { DateFormatterService } from './date-formatter.service';

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true,
};

@Directive({
  selector: '[cxUseValueAsDate]',
  providers: [DATE_VALUE_ACCESSOR],
})
export class DateValueAccessorDirective implements ControlValueAccessor {
  @HostListener('input', ['$event.target.valueAsDate']) onChange = (
    _: any
  ) => {};
  @HostListener('blur', []) onTouched = () => {};

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    // protected dateFormatterService: DateFormatterService
  ) {}

  writeValue(value: string): void {
    if (!value) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', null);
      return;
    }
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'valueAsDate',
      new Date(value)
    );
    // this.renderer.setProperty(
    //   this.elementRef.nativeElement,
    //   'valueAsCustomDate',
    //   this.dateFormatterService.transform(value)
    // );
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
