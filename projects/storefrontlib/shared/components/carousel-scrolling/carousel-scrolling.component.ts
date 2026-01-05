/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { disableTabbingForTick } from '../../../layout/a11y';

/**
 * Context passed to the `template` for each carousel item.
 */
export interface CarouselScrollingTemplateContext<Item> {
  item: Item;
  itemIndex: number;
}

enum KeyboardEventKeys {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  TAB = 'Tab',
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
export class CarouselScrollingComponent<Item = any> implements OnInit {
  protected logger = inject(LoggerService);
  protected el = inject(ElementRef);

  /**
   * The title is rendered as the carousel heading.
   */
  @Input() title: string | undefined | null;

  /**
   * The items represent the carousel items. The items are
   * observables so that the items can be loaded on demand.
   */
  @Input() items: Observable<Item>[];

  /**
   * The template rendered for each carousel item
   */
  @Input() template: TemplateRef<CarouselScrollingTemplateContext<Item>>;

  @Input() previousIcon = ICON_TYPE.CARET_LEFT;
  @Input() nextIcon = ICON_TYPE.CARET_RIGHT;

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
      case KeyboardEventKeys.ARROW_RIGHT:
      case KeyboardEventKeys.ARROW_LEFT:
        event.preventDefault();
        this.focusNextPrevItem(
          event.target,
          event.key === KeyboardEventKeys.ARROW_RIGHT ? 1 : -1
        );
        break;
      case KeyboardEventKeys.TAB:
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
   * When a carousel item receives focus (e.g. via keyboard navigation),
   * but it's only partially visible in the viewport (not fully scrolled into),
   * this method ensures the item is scrolled into view.
   */
  onItemFocusIn(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    try {
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
          behavior: 'instant',
        });
      }
    } catch (error) {
      this.logger.error('Failed to scroll carousel item into view', error);
    }
  }
}
