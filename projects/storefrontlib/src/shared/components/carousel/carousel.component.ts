import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  isDevMode,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, shareReplay, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { CarouselNavigation } from './carousel.model';
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
   * provides a configuration to add accessibility control to the carousel.
   * The default configuration adds the following:
   * - the first item is auto-focused (if it is focusable) is selected.
   *
   * Additionally, a named focus _group_ could be added to refocus the last selected element
   * if the carousel is focussed again.
   */
  @Input() focusConfig: FocusConfig = {
    autofocus: true,
    // focusOnScroll: true,
  };

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
   * view can be given by the component that uses the `CarouselComponent`.
   */
  @Input() template: TemplateRef<any>;

  /**
   * Specifies the minimum size of the carousel item, either in px or %.
   * This value is used for the calculation of numbers per carousel, so that
   * the number of carousel items is dynamic. The calculation uses the `itemWidth`
   * and the host element `clientWidth`, so that the carousel is reusable in
   * different layouts (for example in a 50% grid).
   *
   * @deprecated
   */
  @Input() itemWidth: string; // = '300px';

  /**
   * Emits the visible carousel items in a numbered array.
   *
   * A value of `[3,4]` means that the 3rd adn 4th items are visible.
   */
  protected readonly visible$ = new BehaviorSubject<number[]>([]);

  readonly navigation$: Observable<CarouselNavigation> = this.visible$.pipe(
    debounceTime(100),
    map((visibleItems) =>
      this.service.build(this.carouselHost, visibleItems, this.itemRefs.length)
    ),
    shareReplay()
  );

  /**
   * Indicates whether the visual indicators should be added in the UI.
   *
   * Defaults to `false`.
   */
  @Input() hideIndicators = false;

  @Input() indicatorIcon = ICON_TYPE.CIRCLE;
  @Input() previousIcon = ICON_TYPE.CARET_LEFT;
  @Input() nextIcon = ICON_TYPE.CARET_RIGHT;

  /**
   * @deprecated
   */
  activeSlide: number;

  /**
   * @deprecated
   */
  size$: Observable<number>;

  @ViewChild('carousel', { read: ElementRef }) carousel: ElementRef<
    HTMLElement
  >;

  @ViewChildren('item', { read: ElementRef }) itemRefs!: QueryList<
    ElementRef<HTMLElement>
  >;

  /**
   * Maintains the prefetched carousel items.
   */
  prefetchCount = 0;

  constructor(protected el: ElementRef, protected service: CarouselService) {}

  ngOnInit() {
    if (!this.template) {
      this.renderDxMessage();
      return;
    }
    this.size$ = this.service
      .getItemsPerSlide(this.el.nativeElement, this.itemWidth)
      .pipe(
        tap(() => {
          if (this.itemWidth) {
            this.activeSlide = 0;
          }
        }),
        map((items) => {
          return this.itemWidth ? items : this.items?.length || 0;
        })
      );
  }

  /**
   * Returns the tabindex for the given carousel item index.
   *
   * The tabindex is supposed to be dynamic to avoid keyboard users to leave
   * the current slide. They should explicitly use the prev/next buttons.
   */
  getTabIndex(itemNum: number): number {
    return this.visible$.value.includes(itemNum) ? 0 : -1;
  }

  /**
   * Will prefetch the next carousel item(s).
   *
   * The calculated prefetchCount is passed to the template. so that
   * the template can decide whether to lazy load the items based on
   * the prefetch flag, or load them regardless.
   */
  prefetch(factor = 1) {
    const next =
      this.visible$.value[this.visible$.value.length - 1] +
      1 +
      this.visible$.value.length * factor;

    if (next > this.prefetchCount) {
      this.prefetchCount = next;
    }
  }

  /**
   * Handles previous button.
   */
  handlePrevious() {
    this.carouselHost.scrollBy({
      left: -this.carouselHost.clientWidth,
    });
  }

  /**
   * Handles next button.
   */
  handleNext() {
    this.carouselHost.scrollBy({
      left: this.carouselHost.clientWidth,
    });
  }

  /**
   * Handles indicator button.
   */
  scroll(index: number) {
    this.carouselHost.scrollTo({
      left: this.carouselHost.clientWidth * index,
    });
  }

  /**
   * Maintains an subject with an array of visible item refs (index)
   */
  intersect(intersected: boolean, ref: HTMLElement): void {
    const refIndex = this.itemRefs
      .toArray()
      .findIndex((item) => item.nativeElement === ref);

    const visible: number[] = this.visible$.value;
    if (intersected) {
      visible.push(refIndex);
    } else {
      if (visible.indexOf(refIndex) > -1) {
        visible.splice(visible.indexOf(refIndex), 1);
      }
    }
    this.visible$.next([...visible.sort()]);
  }

  /**
   * Returns the carousel native host element.
   */
  private get carouselHost(): HTMLElement {
    return this.carousel.nativeElement;
  }

  private renderDxMessage(): void {
    if (isDevMode()) {
      console.error(
        'No template reference provided to render the carousel items for the `cx-carousel`'
      );
    }
  }

  /**
   * @deprecated this is used temporarily to distinguish streams from objects.
   */
  isObservable(item: Observable<any> | any): boolean {
    return item instanceof Observable;
  }
}
