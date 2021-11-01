import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { Observable } from 'rxjs';
/**
 * Generic carousel component that can be used to render any carousel items,
 * such as products, images, banners, or any component in a vertical orientation.
 * VerticalCarousel items are
 * rendered in so-called carousel slides, and the previous/next buttons as well as
 * the indicator-buttons can used to navigate the slides.
 *
 * To allow for flexible rendering of items, the rendering is delegated to the
 * given `template` and `headerTemplate`.
 */
@Component({
  selector: 'cx-vertical-carousel',
  templateUrl: './vertical-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalCarouselComponent implements OnInit {
  /**
   * The title is rendered as the carousel heading.
   */
  @Input() title: string;

  /**
   * The items$ represent the carousel items.
   */
  @Input() items: Observable<any>[];

  /**
   * The headerTemplate is rendered above the item rows.
   */
  @Input() headerTemplate: TemplateRef<any>;

  /**
   * The template is rendered for each item, so that the actual
   * view can be given by the component that uses the `VerticalCarouselComponent`.
   */
  @Input() template: TemplateRef<any>;

  /**
   * The maximum number of items per slide
   */
  @Input() itemsPerSlide = 10;

  /**
   * Indicates whether the visual indicators are used.
   */
  @Input() hideIndicators = false;

  @Input() indicatorIcon = ICON_TYPE.CIRCLE;
  @Input() previousIcon = ICON_TYPE.CARET_LEFT;
  @Input() nextIcon = ICON_TYPE.CARET_RIGHT;

  @Input() activeSlideStartIndex = 0;
  @Output() activeSlideStartIndexChange = new EventEmitter<number>();

  setActiveSlideStartIndex(activeSlideStartIndex: number) {
    this.activeSlideStartIndex = activeSlideStartIndex;
    this.activeSlideStartIndexChange.emit(activeSlideStartIndex);
  }

  constructor(protected el: ElementRef) {}

  ngOnInit() {
    if (!this.headerTemplate) {
      console.error(
        'No template reference provided to render the header for the `cx-vertical-carousel`'
      );
      return;
    }

    if (!this.template) {
      console.error(
        'No template reference provided to render the items for the `cx-vertical-carousel`'
      );
      return;
    }
  }
}
