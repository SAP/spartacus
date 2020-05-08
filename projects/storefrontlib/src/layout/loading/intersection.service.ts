import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, first, flatMap, map } from 'rxjs/operators';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionOptions } from './intersection.model';

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
   *  depends on whether the element appears in the view port.
   */
  isIntersected(
    element: HTMLElement,
    options?: IntersectionOptions
  ): Observable<boolean> {
    return this.intersects(element, options).pipe(first((v) => v === true));
  }

  /**
   * Indicates whenever the element intersects the view port. An optional margin
   * is used to intersects before the element shows up in the viewport.
   * A value is emitted each time the element intersects.
   *
   * This is private for now, but could be exposed as a public API
   * to introduce additional (css) render effects to the UI.
   */
  private intersects(
    element: HTMLElement,
    options: IntersectionOptions = {}
  ): Observable<boolean> {
    const elementVisible$ = new Observable((observer) => {
      const rootMargin = this.getRootMargin(options);
      const intersectOptions = { rootMargin, threshold: options.threshold };
      const intersectionObserver = new IntersectionObserver((entries) => {
        observer.next(entries);
      }, intersectOptions);
      intersectionObserver.observe(element);
      return () => {
        intersectionObserver.disconnect();
      };
    }).pipe(
      flatMap((entries: IntersectionObserverEntry[]) => entries),
      map((entry: IntersectionObserverEntry) => entry.isIntersecting),
      distinctUntilChanged()
    );

    return elementVisible$;
  }

  private getRootMargin(options: IntersectionOptions = {}): string {
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
