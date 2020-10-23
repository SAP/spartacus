import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
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

  @HostBinding('class.freeze') _freeze = false;

  /**
   * Emits the visible carousel items in a numbered array.
   *
   * A value of `[3,4]` means that the 3rd adn 4th items are visible.
   */
  protected readonly visible$ = new BehaviorSubject<number[]>([]);

  readonly navigation$: Observable<CarouselNavigation> = this.visible$.pipe(
    debounceTime(100),
    map((visible) =>
      this.service.build(this.carouselHost, visible, this.itemRefs.length)
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
  getTabIndex(itemNum: number): Observable<number> {
    return this.visible$.pipe(
      map((intersectMap) => (intersectMap.includes(itemNum) ? 0 : -1))
    );
  }

  /**
   * Will calculate the prefetched carousel item(s) for the next slide.
   *
   * The calculated prefetchCount is passed to the item template. so that
   * the template can decide whether to lazy load the items based on
   * the prefetch flag, or load them regardless.
   */
  prefetch(factor = 1) {
    const value = this.visible$.value;
    const next = value[value.length - 1] + 1 + value.length * factor;
    if (next > this.prefetchCount) {
      this.prefetchCount = next;
    }
  }

  /**
   * Navigates to the previous (virtual) slide of items.
   *
   * The previous slide is calculated by the help of the scrollable width.
   */
  handlePrevious() {
    this.carouselHost.scrollTo({
      left:
        (Math.round(
          this.carouselHost.scrollLeft / this.carouselHost.clientWidth
        ) -
          1) *
        this.carouselHost.clientWidth,
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
    this.freeze();
    this.carouselHost.scrollTo({
      left: this.carouselHost.clientWidth * index,
    });
  }

  /**
   * Set's the freeze class on the host element. This class is used in CSS to block
   * interaction (`pointer-event: none`) with the panel, as otherwise a mouse hover
   * would destroy the scroll animation.
   */
  protected freeze() {
    this._freeze = true;
    window.setTimeout(() => {
      this._freeze = false;
    }, 500);
  }

  /**
   * Maintains an subject with an array of visible item refs (index).
   *
   * The intersected elements are listed in the visible subject.
   */
  intersect(intersected: boolean, ref: HTMLElement): void {
    const refIndex = this.itemRefs
      .toArray()
      .findIndex((item) => item.nativeElement === ref);

    const visible = [...this.visible$.value];
    if (intersected && !visible.includes(refIndex)) {
      visible.push(refIndex);
    } else if (visible.indexOf(refIndex) > -1) {
      visible.splice(visible.indexOf(refIndex), 1);
    }
    visible.sort((a, b) => (a > b ? 1 : -1));
    if (visible.join() !== this.visible$.value.join()) {
      this.visible$.next(visible);
    }
  }

  /**
   * Returns the carousel native host element.
   */
  private get carouselHost(): HTMLElement {
    return this.carousel.nativeElement;
  }

  /**
   * Render a warning in development mode when there's no carousel
   * item template provided.
   */
  private renderDxMessage(): void {
    if (isDevMode()) {
      console.error(
        'No template reference provided to render the carousel items for the `cx-carousel`'
      );
    }
  }

  /**
   * Indicates whether the given item is an observable.
   *
   * @deprecated this is used temporarily to distinguish streams from objects.
   */
  isObservable(item: Observable<any> | any): boolean {
    return item instanceof Observable;
  }
}
