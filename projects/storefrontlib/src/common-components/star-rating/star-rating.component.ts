import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICON_TYPES } from '../../cms-components/misc/index';

@Component({
  selector: 'cx-star-rating',
  templateUrl: './star-rating.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StarRatingComponent),
    },
  ],
})
export class StarRatingComponent implements ControlValueAccessor {
  iconTypes = ICON_TYPES;
  rating;

  constructor(private el: ElementRef) {}

  @Input('rating')
  set allowDay(value: string) {
    this.rating = value;
    this.el.nativeElement.style.setProperty('--star-fill', value || 0);
  }

  @Input() disabled = false;
  @Input() steps = 1;

  onChange = (_rating: number) => {};
  onTouched = () => {};

  get value(): number {
    return this.rating;
  }

  setRating(rating: number): void {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

  // ControlvalueAccessor interface

  writeValue(rating: number): void {
    this.rating = rating;
    this.onChange(this.rating);
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
