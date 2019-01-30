import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  forwardRef
} from '@angular/core';

@Component({
  selector: 'cx-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StarRatingComponent)
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input()
  rating = 1;
  @Input()
  disabled = false;
  @Input()
  steps = 1;

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
