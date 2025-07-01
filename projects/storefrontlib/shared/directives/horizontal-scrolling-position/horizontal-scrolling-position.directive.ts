/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { LoggerService, WindowRef } from '@spartacus/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
} from 'rxjs';

/**
 * Allows for observing the events of user reaching the horizontal scroll position
 * start or end.
 * Moreover, it exposes methods for scrolling left and right programmatically.
 *
 * @usage
 * ```html
 * <ng-container cxHorizontalScrollingPosition
 *   #cxHorizontalScrollingPosition="cxHorizontalScrollingPosition"
 *   [scrollingArea]="scrollingArea"
 *   [scrollingAreaStart]="scrollingAreaStart"
 *   [scrollingAreaEnd]="scrollingAreaEnd">
 *
 *   <button
 *     (click)="cxHorizontalScrollingPosition.scrollBackward()"
 *     [disabled]="cxHorizontalScrollingPosition.isScrollStart$ | async">
 *     (Icon arrow backward)
 *   </button>
 *
 *   <div #scrollingArea>
 *     <div #scrollingAreaStart></div>
 *     <div *ngFor="let item of items" class="item">{{ item }}</div>
 *     <div #scrollingAreaEnd></div>
 *   </div>
 *
 *   <button
 *     (click)="cxHorizontalScrollingPosition.scrollForward()"
 *     [disabled]="cxHorizontalScrollingPosition.isScrollEnd$ | async">
 *     (Icon arrow forward)
 *   </button>
 * </ng-container>
 */
@Directive({
  selector: '[cxHorizontalScrollingPosition]',
  exportAs: 'cxHorizontalScrollingPosition',
  standalone: false,
})
export class HorizontalScrollingPositionDirective
  implements OnDestroy, OnChanges
{
  protected logger = inject(LoggerService);
  protected windowRef = inject(WindowRef);

  protected windowResizeSubscription: Subscription;
  protected _scrollingAreaWidth$ = new BehaviorSubject<number>(0);

  public readonly scrollingAreaWidth$ =
    this._scrollingAreaWidth$.asObservable();

  /**
   * The scrolling area is the element that contains the carousel items.
   * It is used to scroll the carousel items horizontally and to detect when the user
   * scrolls to the start or end of the carousel.
   */
  @Input() scrollingArea: HTMLElement;

  /**
   * Dummy element to detect when the user scrolls to the start of the carousel.
   * It is used to enable/disable the backward scroll button.
   */
  @Input() scrollingAreaStart: HTMLElement;

  /**
   * Dummy element to detect when the user scrolls to the end of the carousel.
   * It is used to enable/disable the forward scroll button.
   */
  @Input() scrollingAreaEnd: HTMLElement;

  /**
   * Tells whether the carousel is at the start of the scrolling area.
   */
  readonly isScrollStart$ = new BehaviorSubject(true);

  /**
   * Tells whether the carousel is at the end of the scrolling area.
   */
  readonly isScrollEnd$ = new BehaviorSubject(false);

  /**
   * Tells whether the carousel needs to be scrolled (i.e. whether the
   * all items are visible in the scrollable area).
   */
  readonly isScrollNeeded$: Observable<boolean> = combineLatest([
    this.isScrollStart$,
    this.isScrollEnd$,
  ]).pipe(
    map(([isScrollStart, isScrollEnd]) => isScrollStart && isScrollEnd),
    distinctUntilChanged()
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.scrollingArea) {
      return;
    }

    if (this.scrollingArea) {
      this.subscribeScrollingArea();
    } else {
      this.unsubscribeScrollingArea();
    }
  }

  ngOnDestroy() {
    this.unsubscribeScrollingArea();
  }

  /**
   * Scrolls the carousel forward by a width of the carousel's visible area.
   */
  scrollForward(options?: {
    distance?: number;
    behavior?: 'auto' | 'instant' | 'smooth';
  }) {
    const distance = options?.distance ?? this._scrollingAreaWidth$.value;
    const behavior = options?.behavior ?? 'smooth';

    this.scrollingArea.scrollBy({
      left: distance,
      behavior,
    });
  }

  /**
   * Scrolls the carousel backward by a width of the carousel's visible area.
   */
  scrollBackward(options?: {
    distance?: number;
    behavior?: 'auto' | 'instant' | 'smooth';
  }) {
    const distance = options?.distance ?? this._scrollingAreaWidth$.value;
    const behavior = options?.behavior ?? 'smooth';

    this.scrollingArea.scrollBy({
      left: -distance,
      behavior,
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
  protected subscribeScrollingArea() {
    if (!this.windowRef.isBrowser()) {
      return;
    }
    this.windowResizeSubscription = this.windowRef.resize$.subscribe(() => {
      // We don't want to read `.clientWidth` of the `scrollingArea` on every
      // call of `scrollForward()` and `scrollBackward()` methods for performance reasons.
      // Instead, we read it only when the window is resized.
      if (this.scrollingArea) {
        this._scrollingAreaWidth$.next(this.scrollingArea.clientWidth);
      }
    });

    // Observe when user scrolls to the start or end of the carousel
    // and then enable/disable the backward or forward scroll buttons accordingly.
    this.scrollingAreaIntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === this.scrollingAreaStart) {
            this.isScrollStart$.next(entry.isIntersecting);
          } else if (entry.target === this.scrollingAreaEnd) {
            this.isScrollEnd$.next(entry.isIntersecting);
          }
        });
      },
      { root: this.scrollingArea, threshold: 1 }
    );

    if (!this.scrollingAreaStart || !this.scrollingAreaEnd) {
      this.logger.error(
        'scrollingAreaStart/End element is not available in the <cx-scrolling-carousel>.'
      );
      return;
    }
    this.scrollingAreaIntersectionObserver.observe(this.scrollingAreaStart);
    this.scrollingAreaIntersectionObserver.observe(this.scrollingAreaEnd);
  }

  /**
   * Stops observing the width of the scrolling area and
   * whether the user has scrolled to the start or end of the carousel.
   */
  protected unsubscribeScrollingArea() {
    if (!this.windowRef.isBrowser()) {
      return;
    }

    this.windowResizeSubscription?.unsubscribe();

    this.scrollingAreaIntersectionObserver?.disconnect();
    this.scrollingAreaIntersectionObserver = undefined;
  }
}
