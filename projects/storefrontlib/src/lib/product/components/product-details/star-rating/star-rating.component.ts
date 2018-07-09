import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  forwardRef
} from '@angular/core';

@Component({
  selector: 'y-star-rating',
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
  @Input() rating;
  @Input() disabled = false;

  onChange = (rating: number) => {};
  onTouched = () => {};

  getStar(index) {
    let icon;
    if (index <= this.rating) {
      icon = 'star';
    } else if (index < this.rating + 0.5) {
      icon = 'star_half';
    } else {
      icon = 'star_outline';
    }
    return icon;
  }

  get value() {
    return this.rating;
  }

  setRating(rating: number) {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
