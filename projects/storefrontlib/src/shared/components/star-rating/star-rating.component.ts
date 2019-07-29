import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ICON_TYPE } from '../../../cms-components/misc/index';

@Component({
  selector: 'cx-star-rating',
  templateUrl: './star-rating.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  iconTypes = ICON_TYPE;

  /**
   * @deprecated since version 1.0.2
   */
  constructor(el: ElementRef);
  constructor(el: ElementRef, renderer: Renderer2); // tslint:disable-line
  constructor(private el: ElementRef, private renderer?: Renderer2) {}

  ngOnInit(): void {
    this.setRate(this.rating, true);
  }

  setRate(value: number, force?: boolean): void {
    if (!this.disabled || force) {
      // deprecate after v1.0.2 / ticket: #xxxx
      // replace with:
      /* 
          this.renderer.setAttribute(
            this.el.nativeElement,
            'style',
            `--star-fill:${value || this.initialRate};`
          );
      */
      // replace block start
      if (this.renderer) {
        this.renderer.setAttribute(
          this.el.nativeElement,
          'style',
          `--star-fill:${value || this.initialRate};`
        );
      } else {
        this.el.nativeElement.style.setProperty(
          '--star-fill',
          value || this.initialRate
        );
      }
      // replace block end
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
