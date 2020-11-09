import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { IntersectionOptions } from '../../../layout/loading/intersection.model';
import { DeferLoadingStrategy } from '@spartacus/core';
import { CmsComponentsService } from '../../services/cms-components.service';

@Injectable({
  providedIn: 'root',
})
export class PageSlotService {
  protected instantSsrSlots: string[] | undefined;

  constructor(
    protected cmsComponentsService: CmsComponentsService,
    @Inject(PLATFORM_ID) protected platformId: any,
    @Inject(DOCUMENT) protected document
  ) {
    this.discoverInstantSsrSlots();
  }

  /**
   * Finds all slots visible in the SSR pre-rendered DOM
   */
  protected discoverInstantSsrSlots() {
    if (isPlatformBrowser(this.platformId)) {
      this.instantSsrSlots = Array.from(
        this.document.querySelectorAll('cx-page-slot')
      )
        .filter(
          (el: Element) =>
            el.getBoundingClientRect().top <
            this.document.documentElement.clientHeight
        )
        .map((el: Element) => el.getAttribute('page-slot'));
    }
  }

  /**
   * Indicates if certain slot should be rendered instantly.
   *
   * It's especially useful when transitioning from SSR to CSR application,
   * where we don't want to apply deferring logic to slots that are visible
   * to avoid unnecessary flickering.
   */
  shouldNotDefer(slot: string): boolean {
    if (this.instantSsrSlots?.includes(slot)) {
      this.instantSsrSlots.splice(this.instantSsrSlots.indexOf(slot), 1);
      return true;
    }
    return false;
  }

  getComponentDeferOptions(
    slot: string,
    componentType: string
  ): IntersectionOptions {
    if (this.shouldNotDefer(slot)) {
      return { deferLoading: DeferLoadingStrategy.INSTANT };
    }
    const deferLoading = this.cmsComponentsService.getDeferLoadingStrategy(
      componentType
    );
    return { deferLoading };
  }
}
