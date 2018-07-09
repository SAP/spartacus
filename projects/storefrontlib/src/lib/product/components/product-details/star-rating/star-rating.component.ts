import { ControlValueAccessor } from '@angular/forms';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'y-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() rating;
  private propagateChange = (_: any) => {};

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

  setRating(rating: number) {
    this.rating = rating;
    this.propagateChange(this.rating);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.rating = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    console.log('touched');
  }
}
