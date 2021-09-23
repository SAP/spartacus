import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ICON_TYPE } from '../../../cms-components/misc/index';

/**
 * Star rating component can be used to view existing ratings as well
 * as create new ratings. The component can be used for any ratings.
 */
@Component({
  selector: 'cx-star-rating',
  templateUrl: './star-rating.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent {
  protected initialRate = 0;

  icon = ICON_TYPE.STAR;

  /**
   * The rating component can be used in disabled mode,
   * so that the interaction is not provided.
   *
   * Defaults to true.
   */
  @Input() @HostBinding('attr.disabled') disabled = true;

  /**
   * The rating is used to color the rating stars. It can have a
   * precise number. The rating number is used for a CSS custom property
   * (AKA css variable) value. The actually coloring is done in CSS.
   */
  @Input()
  @HostBinding('style.--star-fill')
  rating: number = this.initialRate;

  /**
   * Emits the given rating when the user clicks on a star.
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<number>();

  setRate(value: number): void {
    if (this.disabled) {
      return;
    }
    this.rating = value;
  }

  @HostListener('mouseout')
  reset() {
    if (this.disabled) {
      return;
    }
    this.rating = this.initialRate ?? 0;
  }

  saveRate(rating: number): void {
    if (this.disabled) {
      return;
    }
    this.initialRate = rating;
    this.setRate(rating);
    this.change.emit(rating);
  }
}
