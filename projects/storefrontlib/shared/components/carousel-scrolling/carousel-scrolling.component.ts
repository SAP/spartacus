/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { LoggerService, useFeatureStyles, WindowRef } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { disableTabbingForTick } from '../../../layout/a11y';

/**
 * Context passed to the `template` for each carousel item.
 */
export interface CarouselScrollingTemplateContext<TItem> {
  item: TItem;
  itemIndex: number;
}

/**
 * Generic carousel component that can be used to render any carousel items,
 * such as products, images, banners, or any component. Carousel items are
 * rendered in a horizontal list which can be scrolled horizontally with
 * a touch screen or touch pad or the forward/backward buttons a the edges
 * of the carousel.
 *
 * The component uses an array of Observables (`items$`) as an input, to allow
 * for lazy loading of items.
 *
 * To allow for flexible rendering of items, the rendering is delegated to the
 * given `template`. This allows for maximum flexibility.
 */
@Component({
  selector: 'cx-carousel-scrolling',
  templateUrl: './carousel-scrolling.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CarouselScrollingComponent<TItem = any>
  implements OnInit, OnDestroy
{
  protected logger = inject(LoggerService);
  protected el = inject(ElementRef);

  constructor() {
    useFeatureStyles('productCarouselScrolling');
  }

  @Output() keyboardEvent = new BehaviorSubject<KeyboardEvent | null>(null);

  /**
   * The title is rendered as the carousel heading.
   */
  @Input() title: string | undefined | null;

  /**
   * The items represent the carousel items. The items are
   * observables so that the items can be loaded on demand.
   */
  @Input()
  items: Observable<TItem>[];

  /**
   * The template is rendered for each item, so that the actual
   * view can be given by the component that uses the `CarouselScrollingComponent`.
   */
  @Input() template: TemplateRef<CarouselScrollingTemplateContext<TItem>>;

  @Input() backwardIcon = ICON_TYPE.CARET_LEFT;
  @Input() forwardIcon = ICON_TYPE.CARET_RIGHT;

  /**
   * Angular's trackBy function for iterating over carousel items.
   *
   * For a given item it should return an unique identifier.
   * If not provided, it will fallback to returning the item directly
   * (like Angular's naive default trackBy).
   *
   * If the returned value is not unique, it may lead to unexpected behavior,
   * such as unwanted destroying and re-creating child templates on items array changes.
   */
  @Input() trackByFn: TrackByFunction<any> = (_index, item) => item;

  ngOnInit() {
    if (!this.template && isDevMode()) {
      this.logger.error(
        'No template reference provided to render the carousel items for the `cx-carousel-scrolling`'
      );
    }
  }

  onItemKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
        event.preventDefault();
        this.focusNextPrevItem(
          event.target,
          event.key === 'ArrowRight' ? 1 : -1
        );
        break;
      case 'Tab':
        this.skipTabForCarouselItems();
        break;
    }
  }

  /**
   * Handles Tab key on carousel items. If the carousel items have `ArrowRight`/`ArrowLeft`
   * navigation enabled, it temporarily disables tab navigation for these items.
   * The `cxFocusableCarouselItem` selector is used because it identifies carousel
   * items that have `ArrowRight`/`ArrowLeft` navigation enabled. These items should not
   * use tab navigation according to a11y requirements.
   */
  protected skipTabForCarouselItems(): void {
    const carouselElements: HTMLElement[] = Array.from(
      this.el.nativeElement.querySelectorAll('[cxFocusableCarouselItem]')
    );
    if (!carouselElements.length) {
      return;
    }
    disableTabbingForTick(carouselElements);
  }

  /**
   * Focuses the next or previous item in the carousel based on keyboard navigation.
   *
   * This method determines the next focusable carousel item, identified by the
   * `cxFocusableCarouselItem` directive, based on the current focus and the direction
   * given. It adjusts the carousel's active slide if the next focusable item is
   * outside the currently visible items.
   *
   * @param currentItem - The currently focused carousel item.
   * @param direction - The navigation direction (1 for right, -1 for left).
   * @param size - The number of items per slide, used to determine slide change is needed
   */
  protected focusNextPrevItem(
    currentItem: EventTarget | null,
    direction: number
  ): void {
    const focusableElements = this.el.nativeElement.querySelectorAll(
      '[cxFocusableCarouselItem]'
    );
    const currentIndex = Array.from(focusableElements).indexOf(currentItem);
    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= focusableElements.length) {
      return;
    }

    const targetElement = focusableElements[nextIndex] as HTMLElement;
    targetElement.focus();
  }

  /**
   * When a carousel item receives focus (e.g. via Tab key), it scrolls it fully into view
   * if partially visible. Improves accessibility by ensuring the focused item is not clipped or hidden.
   */
  onItemFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    try {
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
          behavior: 'smooth',
        });
      }
    } catch (error) {
      this.logger.error('Failed to scroll carousel item into view', error);
    }
  }

  //////////////////////////////////////////

  /**
   * Tells whether the carousel is at the start of the scrolling area.
   */
  protected isScrollStart$ = new BehaviorSubject(true);

  /**
   * Tells whether the carousel is at the end of the scrolling area.
   */
  protected isScrollEnd$ = new BehaviorSubject(false);

  /**
   * Tells whether the carousel needs to be scrolled (i.e. whether the
   * all items are visible in the scrollable area).
   */
  protected needsScroll$: Observable<boolean> = combineLatest([
    this.isScrollStart$,
    this.isScrollEnd$,
  ]).pipe(map(([isScrollStart, isScrollEnd]) => isScrollStart && !isScrollEnd));

  /**
   * Dummy element to detect when the user scrolls to the start of the carousel.
   * It is used to enable/disable the backward scroll button.
   */
  @ViewChild('scrollingAreaStart') scrollingAreaStart: ElementRef;

  /**
   * Dummy element to detect when the user scrolls to the end of the carousel.
   * It is used to enable/disable the forward scroll button.
   */
  @ViewChild('scrollingAreaEnd') scrollingAreaEnd: ElementRef;

  /**
   * The scrolling area is the element that contains the carousel items.
   * It is used to scroll the carousel items horizontally and to detect when the user
   * scrolls to the start or end of the carousel.
   */
  scrollingArea: ElementRef;
  // IMPORTANT: The `@ViewChild('scrollingArea')` has to be defined after
  //   the `@ViewChild('scrollingAreaStart')` and `@ViewChild('scrollingAreaEnd')`,
  //   so their values can be used in the setter's logic of `@ViewChild('scrollingArea')`
  @ViewChild('scrollingArea')
  set scrollingAreaSetter(element: ElementRef) {
    this.scrollingArea = element;
    if (element) {
      this.subscribeScrollingArea();
    } else {
      this.unsubscribeScrollingArea();
    }
  }

  protected scrollingAreaWidth: number;
  protected windowRef = inject(WindowRef);
  protected scrollingAreaWidthSubscription: Subscription;

  ngOnDestroy() {
    this.unsubscribeScrollingArea();
  }

  /**
   * Scrolls the carousel forward by a width of the carousel's visible area.
   */
  scrollForward() {
    this.scrollingArea.nativeElement.scrollBy({
      left: this.scrollingAreaWidth,
      behavior: 'smooth',
    });
  }

  /**
   * Scrolls the carousel backward by a width of the carousel's visible area.
   */
  scrollBackward() {
    this.scrollingArea.nativeElement.scrollBy({
      left: -this.scrollingAreaWidth,
      behavior: 'smooth',
    });
  }

  /**
   * Intersection Observer used to detect when the scrolling area start or end
   * is visible in the viewport.
   * It is used to enable/disable the backward or forward scroll buttons accordingly.
   */
  protected scrollingAreaIntersectionObserver?: IntersectionObserver;

  /**
   * Starts observing the width of the scrolling area and
   * whether the user has scrolled to the start or end of the carousel.
   */
  subscribeScrollingArea() {
    if (!this.windowRef.isBrowser()) {
      return;
    }
    this.scrollingAreaWidthSubscription = this.windowRef.resize$.subscribe(
      () => {
        // For performance reasons (to avoid browser layout trashing), we don't want
        // to read `.clientWidth` of the scrollingArea on every scroll event.
        // Instead, we read it only on window resize and store it for later use.
        // It will be used by scrollForward() and scrollBackward() methods.
        if (this.scrollingArea?.nativeElement) {
          this.scrollingAreaWidth =
            this.scrollingArea.nativeElement.clientWidth;
        }
      }
    );

    // Observe when user scrolls to the start or end of the carousel
    // and then enable/disable the backward or forward scroll buttons accordingly.
    this.scrollingAreaIntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === this.scrollingAreaStart.nativeElement) {
            this.isScrollStart$.next(entry.isIntersecting);
          } else if (entry.target === this.scrollingAreaEnd.nativeElement) {
            this.isScrollEnd$.next(entry.isIntersecting);
          }
        });
      },
      { root: this.scrollingArea.nativeElement, threshold: 1 }
    );

    if (!this.scrollingAreaStart || !this.scrollingAreaEnd) {
      this.logger.error(
        'scrollingAreaStart/End element is not available in the <cx-scrolling-carousel>.'
      );
      return;
    }
    this.scrollingAreaIntersectionObserver.observe(
      this.scrollingAreaStart.nativeElement
    );
    this.scrollingAreaIntersectionObserver.observe(
      this.scrollingAreaEnd.nativeElement
    );
  }

  /**
   * Stops observing the width of the scrolling area and
   * whether the user has scrolled to the start or end of the carousel.
   */
  unsubscribeScrollingArea() {
    if (!this.windowRef.isBrowser()) {
      return;
    }

    this.scrollingAreaWidthSubscription?.unsubscribe();

    this.scrollingAreaIntersectionObserver?.disconnect();
    this.scrollingAreaIntersectionObserver = undefined;
  }
}
