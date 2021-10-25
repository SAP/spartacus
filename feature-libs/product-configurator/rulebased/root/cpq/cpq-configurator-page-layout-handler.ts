import { Injectable } from '@angular/core';
import { PageLayoutHandler } from '@spartacus/storefront';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CpqConfiguratorPageLayoutHandler implements PageLayoutHandler {
  constructor(
    protected configuratorRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}
  handle(
    slots$: Observable<string[]>,
    pageTemplate?: string,
    section?: string
  ) {
    if (pageTemplate === 'CpqConfigurationTemplate' && section === 'header') {
      this.configuratorRouterExtractorService
        .extractRouterData()
        .pipe(take(1))
        .subscribe((routerData) => {
          if (
            routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION
          ) {
            slots$ = slots$.pipe(
              map((slots) => {
                const extendedSlots = ['PreHeader'];
                extendedSlots.push(...slots);
                return extendedSlots;
              })
            );
          }
        });
    }

    return slots$;
  }
}
