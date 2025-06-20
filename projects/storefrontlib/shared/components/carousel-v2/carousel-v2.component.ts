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
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { disableTabbingForTick } from '../../../layout/a11y';

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
  selector: 'cx-carousel-v2',
  templateUrl: './carousel-v2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CarouselV2Component implements OnInit {
  @Output() keybordEvent = new BehaviorSubject<KeyboardEvent | null>(null);
  /**
   * The title is rendered as the carousel heading.
   */
  @Input() title: string | undefined | null;

  /**
   * The items$ represent the carousel items. The items$ are
   * observables so that the items can be loaded on demand.
   */
  @Input('items')
  items: Observable<any>[];

  /**
   * The template is rendered for each item, so that the actual
   * view can be given by the compoent that uses the `CarouselV2Component`.
   */
  @Input() template: TemplateRef<any>;

  protected logger = inject(LoggerService);
  protected el = inject(ElementRef);

  ngOnInit() {
    if (!this.template && isDevMode()) {
      this.logger.error(
        'No template reference provided to render the carousel items for the `cx-carousel-v2`'
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
}
