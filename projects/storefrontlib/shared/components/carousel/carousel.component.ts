/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AsyncPipe,
  NgClass,
  NgFor,
  NgIf,
  NgTemplateOutlet,
  SlicePipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  isDevMode,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import {
  LoggerService,
  TranslatePipe,
  useFeatureStyles,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IconComponent } from '../../../cms-components/misc/icon/icon.component';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { disableTabbingForTick } from '../../../layout/a11y';
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
 *
 * Hydration is disabled for this component (`ngSkipHydration: 'true'`) due to inconsistencies between
 * client-side rendering (CSR) and server-side rendering (SSR). The differences in rendered output
 * can cause issues during the hydration process, so this component is excluded from Angular hydration.
 */
@Component({
  selector: 'cx-carousel',
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
  imports: [
    NgIf,
    NgClass,
    IconComponent,
    NgFor,
    NgTemplateOutlet,
    AsyncPipe,
    SlicePipe,
    TranslatePipe,
  ],
})
export class CarouselComponent implements OnInit, OnChanges {
  @Output() keybordEvent = new BehaviorSubject<KeyboardEvent | null>(null);
  /**
   * The title is rendered as the carousel heading.
   */
  @Input() title: string | undefined | null;

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

  /**
   * When true, prevents default mousedown behavior on navigation buttons to avoid
   * unwanted blur events (e.g., in Safari when carousel is used inside modals or search boxes).
   * Defaults to false to maintain backward compatibility.
   */
  @Input() preventNavigationFocus = false;

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

  activeSlide: number;
  size$: Observable<number>;

  protected logger = inject(LoggerService);

  constructor(
    protected el: ElementRef,
    protected service: CarouselService
  ) {
    useFeatureStyles('a11yAddPaddingToCarouselPanel');
  }

  ngOnInit() {
    if (!this.template && isDevMode()) {
      this.logger.error(
        'No template reference provided to render the carousel items for the `cx-carousel`'
      );
    }
  }
  ngOnChanges() {
    this.size$ = this.service
      .getItemsPerSlide(this.el.nativeElement, this.itemWidth)
      .pipe(tap(() => (this.activeSlide = 0)));
  }
  /**
   * Prevents default mousedown behavior on navigation buttons when enabled
   * to avoid unwanted blur events (e.g., in Safari when carousel is used inside modals or search boxes).
   */
  onNavigationMouseDown(event: MouseEvent): void {
    if (this.preventNavigationFocus) {
      event.preventDefault();
    }
  }

  /**
   * Handler for the "next" button click.
   */
  onNextClick(event: MouseEvent, size: number): void {
    event.stopPropagation();

    const itemsLength = this.items?.length ?? 0;
    const canMove = this.activeSlide <= itemsLength - size - 1;

    if (canMove) {
      this.activeSlide = this.activeSlide + size;
    }
  }

  /**
   * Handler for the "previous" button click.
   */
  onPreviousClick(event: MouseEvent, size: number): void {
    event.stopPropagation();
    if (this.activeSlide !== 0) {
      this.activeSlide = this.activeSlide - size;
    }
  }

  onItemKeydown(event: KeyboardEvent, size: number): void {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
        event.preventDefault();
        this.focusNextPrevItem(
          event.target,
          event.key === 'ArrowRight' ? 1 : -1,
          size
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
    direction: number,
    size: number
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
    const shouldChangeSlide =
      nextIndex < this.activeSlide || nextIndex >= this.activeSlide + size;
    if (shouldChangeSlide) {
      this.activeSlide = nextIndex - (nextIndex % size);
      // After changing slides carousel items has CSS transition,
      // which prevents them from being focused
      targetElement.addEventListener(
        'transitionend',
        () => {
          targetElement.focus();
        },
        { once: true }
      );
    } else {
      targetElement.focus();
    }
  }

  getSlideNumber(size: number, currentIndex: number): number {
    const normalizedCurrentIndex = currentIndex + 1;
    return Math.ceil(normalizedCurrentIndex / size);
  }

  shareEvent(event: KeyboardEvent) {
    if (!event) {
      throw new Error('Missing Event');
    }
    this.keybordEvent.next(event);
  }
}
