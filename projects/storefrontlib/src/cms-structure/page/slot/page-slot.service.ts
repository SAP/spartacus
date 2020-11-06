import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PageSlotService {
  protected instantSsrSlots: string[] | undefined;

  constructor(
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
        .map((el: Element) => el.classList[0]);
    }
  }

  shouldNotDefer(slot: string): boolean {
    if (this.instantSsrSlots?.includes(slot)) {
      this.instantSsrSlots.splice(this.instantSsrSlots.indexOf(slot), 1);
      return true;
    }
    return false;
  }
}
