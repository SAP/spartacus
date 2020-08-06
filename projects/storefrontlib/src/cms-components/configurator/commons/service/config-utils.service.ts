import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigUtilsService {
  constructor(
    protected configuratorGroupsService: ConfiguratorGroupsService,
    @Inject(PLATFORM_ID) protected platformId: any
  ) {}

  isCartEntryOrGroupVisited(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<boolean> {
    return this.configuratorGroupsService.isGroupVisited(owner, groupId).pipe(
      take(1),
      map((result) => {
        if (owner.type === GenericConfigurator.OwnerType.CART_ENTRY || result) {
          return true;
        }
        return false;
      })
    );
  }

  scrollToConfigurationElement(selectors: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // we don't want to run this logic when doing SSR
      const theElement = document.querySelector(selectors);
      let topOffset = 0;
      if (theElement instanceof HTMLElement) {
        topOffset = theElement.offsetTop;
      }
      window.scroll(0, topOffset);
    }
  }
}
