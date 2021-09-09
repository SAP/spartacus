import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DeferLoadingStrategy } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionOptions } from './intersection.model';
import { IntersectionService } from './intersection.service';

/**
 * The defer loading serivce is used to defer loading of DOM elements
 * until the elements are required for the user experience.
 */
@Injectable({
  providedIn: 'root',
})
export class DeferLoaderService {
  globalLoadStrategy: DeferLoadingStrategy;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    protected config: LayoutConfig,
    protected intersectionService: IntersectionService
  ) {
    this.globalLoadStrategy = config.deferredLoading
      ? config.deferredLoading.strategy
      : DeferLoadingStrategy.INSTANT;
  }

  /**
   * Defer loading till the element intersects the viewport.
   *
   * We evaluate whether we instantly load the element for different reasons:
   * - we run in SSR mode
   * - there's no global strategy given
   * - the global loading strategy is set to INSTANT loading,
   *   and the loading strategy in the given is not set to DEFER
   * - the loading strategy in the given options is set to INSTANT
   */
  load(
    element: HTMLElement,
    options?: IntersectionOptions
  ): Observable<boolean> {
    if (this.shouldLoadInstantly((options || {}).deferLoading)) {
      return of(true);
    } else {
      return this.intersectionService.isIntersected(element, options);
    }
  }

  private shouldLoadInstantly(
    elementLoadingStrategy: DeferLoadingStrategy
  ): boolean {
    return (
      isPlatformServer(this.platformId) ||
      elementLoadingStrategy === DeferLoadingStrategy.INSTANT ||
      (elementLoadingStrategy !== DeferLoadingStrategy.DEFER &&
        this.globalLoadStrategy === DeferLoadingStrategy.INSTANT)
    );
  }
}
