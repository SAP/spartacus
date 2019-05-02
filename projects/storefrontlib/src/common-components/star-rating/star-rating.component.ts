import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class StarRatingComponent implements OnInit {
  /**
   * The rating component can be used in disabled mode,
   * so that the interation is not provided.
   */
  @Input() @HostBinding('attr.disabled') disabled = false;

  /**
   * The rating will be used to render some colorful stars in the UI.
   */
  @Input() rating: number;

  /**
   * Emits the given rating when the user clicks on a star.
   */
  @Output() change = new EventEmitter<number>();

  private initialRate = 0;

  iconTypes = ICON_TYPES;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setRate(this.rating, true);
  }

  setRate(value: number, force?: boolean): void {
    if (!this.disabled || force) {
      this.el.nativeElement.style.setProperty(
        '--star-fill',
        value || this.initialRate
      );
    }
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
