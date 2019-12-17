import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DeferLoadingStrategy } from '@spartacus/core';
import { Observable, of } from 'rxjs';
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
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    protected config: LayoutConfig
  ) {}

  /**
   * Returns an Observable that emits only once a boolean value whenever
   * the given element has shown in the view port.
   *
   * In SSR mode we'll return a boolean observable anyway to ensure all
   * content is rendered for crawlers.
   */
  isIntersected(
    element: HTMLElement,
    options?: IntersectionOptions
  ): Observable<boolean> {
    if (isPlatformServer(this.platformId) || this.useInstantLoading()) {
      return of(true);
    } else {
      return this.intersects(element, options).pipe(first(v => v === true));
    }
  }

  /**
   * Indicates whenever the element has intersected the view port.
   *
   * This is private for now, but could be exposed as a public API
   * to introduce additional (css) render effects to the UI.
   */
  private intersects(
    element: HTMLElement,
    options?: IntersectionOptions
  ): Observable<boolean> {
    const elementVisible$ = new Observable(observer => {
      const rootMargin = this.getRootMargin(options);
      const intersectOptions = { rootMargin };
      const intersectionObserver = new IntersectionObserver(entries => {
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

  /**
   * Evaluates the global deferred loading strategy.
   */
  private useInstantLoading(): boolean {
    return (
      this.config.deferredLoading &&
      this.config.deferredLoading.strategy === DeferLoadingStrategy.INSTANT
    );
  }

  private getRootMargin(options?: IntersectionOptions) {
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
