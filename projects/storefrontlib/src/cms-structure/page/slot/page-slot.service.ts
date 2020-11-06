import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PageSlotService {
  protected instantSsrSlots: string[] | undefined;

  constructor(
    @Inject(PLATFORM_ID) platformId: any,
    @Inject(DOCUMENT) document
  ) {
    if (isPlatformBrowser(platformId)) {
      // Find all slots visible in the SSR pre-rendered DOM
      this.instantSsrSlots = Array.from(
        document.querySelectorAll('cx-page-slot')
      )
        .filter(
          (el: Element) =>
            el.getBoundingClientRect().top <
            document.documentElement.clientHeight
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
