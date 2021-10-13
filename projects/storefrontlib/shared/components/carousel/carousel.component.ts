import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  isDevMode,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { CarouselService } from './carousel.service';

/**
 * Generic carousel component that can be used to render any carousel items,
 * such as products, images, banners, or any component. Carousel items are
 * rendered in so-called carousel slides, and the previous/next buttons as well as
 * the indicator-buttons can used to navigate the slides.
 *
 * The component uses an array of Observables (`items$`) as an input, to allow
 * for lazy loading of items.
 *
 * The number of items per slide is calculated with the `itemWidth`, which can given
 * in pixels or percentage.
 *
 * To allow for flexible rendering of items, the rendering is delegated to the
 * given `template`. This allows for maximum flexibility.
 */
@Component({
  selector: 'cx-carousel',
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
  /**
   * The title is rendered as the carousel heading.
   */
  @Input() title: string;

  /**
   * The items$ represent the carousel items. The items$ are
   * observables so that the items can be loaded on demand.
   */
  items: Observable<any>[];
  @Input('items')
  set setItems(inputItems: Observable<any>[]) {
    this.items = inputItems;
    //Reset slider when changing products
    this.activeSlide = 0;
  }

  /**
   * The template is rendered for each item, so that the actual
   * view can be given by the compoent that uses the `CarouselComponent`.
   */
  @Input() template: TemplateRef<any>;

  /**
   * Specifies the minimum size of the carousel item, either in px or %.
   * This value is used for the calculation of numbers per carousel, so that
   * the number of carousel items is dynamic. The calculation uses the `itemWidth`
   * and the host element `clientWidth`, so that the carousel is reusable in
   * different layouts (for example in a 50% grid).
   */
  @Input() itemWidth = '300px';

  /**
   * Indicates whether the visual indicators are used.
   */
  @Input() hideIndicators = false;

  @Input() indicatorIcon = ICON_TYPE.CIRCLE;
  @Input() previousIcon = ICON_TYPE.CARET_LEFT;
  @Input() nextIcon = ICON_TYPE.CARET_RIGHT;

  activeSlide: number;
  size$: Observable<number>;

  constructor(protected el: ElementRef, protected service: CarouselService) {}

  ngOnInit() {
    if (!this.template && isDevMode()) {
      console.error(
        'No template reference provided to render the carousel items for the `cx-carousel`'
      );
      return;
    }
    this.size$ = this.service
      .getItemsPerSlide(this.el.nativeElement, this.itemWidth)
      .pipe(tap(() => (this.activeSlide = 0)));
  }

  getSlideNumber(size: number, currentIndex: number): number {
    let normalizedCurrentIndex = currentIndex + 1;
    return Math.ceil(normalizedCurrentIndex / size);
  }
}
