/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { distinctUntilChanged, first, map, mergeMap } from 'rxjs/operators';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionOptions } from './intersection.model';

export type IntersectingCondition = (
  entry: IntersectionObserverEntry
) => boolean;

/**
 * The IntersectionService uses the native IntersectionObserver (v2), which
 * can be used to implement pre-loading and deferred loading of DOM content.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class IntersectionService {
  constructor(protected config: LayoutConfig) {}

  /**
   * Returns an Observable that emits only once a boolean value whenever
   * the given element has shown in the view port.
   *
   * The returned observable will only emit the first value. The
   * observable must be cleaned up either way, since the value might never emit; it
   * depends on whether the element appears in the view port.
   *
   * @param element - HTML element
   * @param options - Allows to specify an optional root margin, in order to fire before the element shows up in the viewport
   * @param intersectingCondition - Allows to specify an intersecting condition.
   * If this parameter is not set, then the transition state of the element will be verified whenever the element intersects the view port.
   * @returns Element intersects?
   */
  isIntersected(
    element: HTMLElement,
    options?: IntersectionOptions,
    intersectingCondition?: IntersectingCondition
  ): Observable<boolean> {
    return this.intersects(element, options, intersectingCondition).pipe(
      first((v) => v === true)
    );
  }

  /**
   * Returns an observable that emits for every change of intersection of a given element.
   *
   * @param element - HTML element
   * @param options - Allows to specify an optional root margin, in order to fire before the element shows up in the viewport
   * @param intersectingCondition - Allows to specify an intersecting condition.
   * If this parameter is not set, then the transition state of the element will be verified whenever the element intersects the view port.
   * @returns Element intersects?
   */
  isIntersecting(
    element: HTMLElement,
    options?: IntersectionOptions,
    intersectingCondition?: IntersectingCondition
  ): Observable<boolean> {
    return this.intersects(element, options, intersectingCondition);
  }

  /**
   * Indicates whenever the element intersects the view port. An optional margin
   * is used to intersects before the element shows up in the viewport.
   * A value is emitted each time the element intersects.
   */
  private intersects(
    element: HTMLElement,
    options: IntersectionOptions = {},
    intersectingCondition?: IntersectingCondition
  ): Observable<boolean> {
    return this.createIntersectionObservable(element, options).pipe(
      mergeMap((entries: IntersectionObserverEntry[]) => entries),
      map((entry: IntersectionObserverEntry) =>
        intersectingCondition
          ? intersectingCondition(entry)
          : entry.isIntersecting
      ),
      distinctUntilChanged()
    );
  }

  private createIntersectionObservable(
    element: HTMLElement,
    options: IntersectionOptions
  ): Observable<IntersectionObserverEntry[]> {
    return new Observable((observer: Observer<IntersectionObserverEntry[]>) => {
      const rootMargin = this.getRootMargin(options);
      const intersectOptions = { rootMargin, threshold: options.threshold };
      const intersectionObserver = new IntersectionObserver((entries) => {
        observer.next(entries);
      }, intersectOptions);
      intersectionObserver.observe(element);
      return () => {
        intersectionObserver.disconnect();
      };
    });
  }

  private getRootMargin(options: IntersectionOptions = {}): string | undefined {
    if (options.rootMargin) {
      return options.rootMargin;
    }
    const layoutConfig = this.config as LayoutConfig;
    if (
      layoutConfig.deferredLoading &&
      layoutConfig.deferredLoading.intersectionMargin
    ) {
      return layoutConfig.deferredLoading.intersectionMargin;
    }
  }
}
