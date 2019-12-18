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
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    protected config: LayoutConfig,
    protected intersectionService: IntersectionService
  ) {}

  /**
   * Defer loading till the element intersects the viewport.
   *
   * We evalutes whether we instantly load the element for different reasons:
   * - we run in SSR mode
   * - the global loading strategy is set to INSTANT loading,
   *   and the loading strategy in the given is not set to DEFER
   * - the loading strategy in the given options is set to INSTANT
   */
  load(
    element: HTMLElement,
    options?: IntersectionOptions
  ): Observable<boolean> {
    if (this.useInstantLoading(options.deferLoading)) {
      return of(true);
    } else {
      return this.intersectionService.isIntersected(element, options);
    }
  }

  private useInstantLoading(loadingStrategy: DeferLoadingStrategy): boolean {
    return (
      isPlatformServer(this.platformId) ||
      (this.config.deferredLoading &&
        this.config.deferredLoading.strategy === DeferLoadingStrategy.INSTANT &&
        loadingStrategy !== DeferLoadingStrategy.DEFER) ||
      loadingStrategy === DeferLoadingStrategy.INSTANT
    );
  }
}
