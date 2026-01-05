/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { LoggerService, WindowRef } from '@spartacus/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
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
 * <ng-container
 *   cxHorizontalScrollingPosition
 *   #cxHorizontalScrollingPosition="cxHorizontalScrollingPosition"
 *   [scrollingArea]="scrollingArea"
 *   [scrollingAreaStart]="scrollingAreaStart"
 *   [scrollingAreaEnd]="scrollingAreaEnd">
 *
 *   <button
 *     (click)="cxHorizontalScrollingPosition.scrollBackward()"
 *     [disabled]="cxHorizontalScrollingPosition._isScrollStart$ | async">
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
 *     [disabled]="cxHorizontalScrollingPosition._isScrollEnd$ | async">
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

  protected windowResizeSubscription: Subscription | undefined;
  protected _scrollingAreaWidth$ = new BehaviorSubject<number>(0);

  /**
   * Width of the scrolling area, debounced every 300ms in case of continuous resizing.
   */
  public readonly scrollingAreaWidth$ = this._scrollingAreaWidth$.pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  /**
   * The scrolling area is the element that contains all of those in the following order:
   * - the dummy item at the start of the scrolling area (`scrollingAreaStart`),
   * - the list of items to scroll through,
   * - the dummy item at the end of the scrolling area (`scrollingAreaEnd`).
   *
   * It is used to scroll the carousel items horizontally and to detect when the user
   * scrolls to the start or end of the carousel.
   */
  @Input() scrollingArea: HTMLElement | undefined;

  /**
   * Dummy element to detect when the user scrolls to the start of the carousel.
   */
  @Input() scrollingAreaStart: HTMLElement | undefined;

  /**
   * Dummy element to detect when the user scrolls to the end of the carousel.
   */
  @Input() scrollingAreaEnd: HTMLElement | undefined;

  protected readonly _isScrollStart$ = new BehaviorSubject(true);
  /**
   * Tells whether the start of the scrolling area is visible.
   */
  readonly isScrollStart$ = this._isScrollStart$.asObservable();

  protected readonly _isScrollEnd$ = new BehaviorSubject(false);
  /**
   * Tells whether the end of the scrolling area is visible.
   */
  readonly isScrollEnd$ = this._isScrollEnd$.asObservable();

  /**
   * Tells whether the carousel needs scrolling
   * (i.e. whether the all items are visible in the scrollable area).
   */
  readonly isScrollNeeded$: Observable<boolean> = combineLatest([
    this._isScrollStart$,
    this._isScrollEnd$,
  ]).pipe(
    map(([isScrollStart, isScrollEnd]) => !isScrollStart || !isScrollEnd),
    distinctUntilChanged()
  );

  /**
   * When the scrolling area is appearing (or disappearing),
   * it subscribes (or unsubscribes) to the scrolling position.
   */
  ngOnChanges(): void {
    if (!this.windowRef.isBrowser()) {
      return;
    }

    this.unsubscribeScrollingArea();

    if (
      this.scrollingArea &&
      this.scrollingAreaStart &&
      this.scrollingAreaEnd
    ) {
      this.subscribeScrollingArea();
    }
  }

  ngOnDestroy() {
    this.unsubscribeScrollingArea();

    this._isScrollStart$.complete();
    this._isScrollEnd$.complete();
    this._scrollingAreaWidth$.complete();
  }

  /**
   * Scrolls the carousel forward by a width of the carousel's visible area.
   */
  scrollForward(options?: {
    distance?: number;
    behavior?: 'auto' | 'instant' | 'smooth';
  }) {
    if (this._isScrollEnd$.value === true) {
      return;
    }

    const distance = options?.distance ?? this._scrollingAreaWidth$.value;
    const behavior = options?.behavior ?? 'smooth';

    this.scrollingArea?.scrollBy({
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
    if (this._isScrollStart$.value === true) {
      return;
    }

    const distance = options?.distance ?? this._scrollingAreaWidth$.value;
    const behavior = options?.behavior ?? 'smooth';

    this.scrollingArea?.scrollBy({
      left: -distance,
      behavior,
    });
  }

  /**
   * Intersection Observer used to detect when the scrolling area start or end
   * is visible in the viewport.
   * It is used to enable/disable the backward or forward scroll buttons accordingly.
   */
  protected scrollingAreaIntersectionObserver: IntersectionObserver | undefined;

  /**
   * Resize Observer used to observe the width of the scrolling area.
   * It is used to emit the width of the scrolling area when it changes.
   */
  protected scrollingAreaResizeObserver: ResizeObserver | undefined;

  /**
   * Starts observing the width of the scrolling area and
   * whether the user has scrolled to the start or end of the carousel.
   */
  protected subscribeScrollingArea() {
    if (this.scrollingArea) {
      this.scrollingAreaResizeObserver = new ResizeObserver(() => {
        if (this.scrollingArea) {
          this._scrollingAreaWidth$.next(this.scrollingArea.clientWidth);
        }
      });
      this.scrollingAreaResizeObserver.observe(this.scrollingArea);
      this._scrollingAreaWidth$.next(this.scrollingArea.clientWidth);
    }

    // Observe when user scrolls to the start or end of the carousel
    // and then enable/disable the backward or forward scroll buttons accordingly.
    this.scrollingAreaIntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === this.scrollingAreaStart) {
            this._isScrollStart$.next(entry.isIntersecting);
          } else if (entry.target === this.scrollingAreaEnd) {
            this._isScrollEnd$.next(entry.isIntersecting);
          }
        });
      },
      {
        root: this.scrollingArea,
        threshold: 0,
        // In highly zoomed-out viewports (e.g., 25% zoom), the `scrollingAreaStart`
        // and `scrollingAreaEnd` elements that have 0px width might not be detected
        // by the IntersectionObserver. To workaround this, we add an arbitrary 2px
        // margin to improve the detection in such cases.
        rootMargin: '2px',
      }
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
    this.windowResizeSubscription?.unsubscribe();
    this.windowResizeSubscription = undefined;

    this.scrollingAreaResizeObserver?.disconnect();
    this.scrollingAreaResizeObserver = undefined;

    this.scrollingAreaIntersectionObserver?.disconnect();
    this.scrollingAreaIntersectionObserver = undefined;
  }
}
