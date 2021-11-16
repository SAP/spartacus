import { Injectable } from '@angular/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  BREAKPOINT,
  BreakpointService,
  PageLayoutHandler,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CpqConfiguratorPageLayoutHandler implements PageLayoutHandler {
  constructor(
    protected configuratorRouterExtractorService: ConfiguratorRouterExtractorService,
    protected breakpointService: BreakpointService
  ) {}
  handle(
    slots$: Observable<string[]>,
    pageTemplate?: string,
    section?: string
  ) {
    if (pageTemplate === 'CpqConfigurationTemplate' && section === 'header') {
      this.configuratorRouterExtractorService
        .extractRouterData()
        .pipe(
          switchMap((routerData) =>
            this.breakpointService
              .isUp(BREAKPOINT.lg)
              .pipe(
                map((isLargeResolution) => ({
                  isLargeResolution: isLargeResolution,
                  routerData,
                }))
              )
          ),
          take(1)
        )
        .subscribe((cont) => {
          slots$ = slots$.pipe(
            map((slots) => {
              if (
                cont.routerData.pageType ===
                ConfiguratorRouter.PageType.CONFIGURATION
              ) {
                const extendedSlots = ['PreHeader'];
                extendedSlots.push(...slots);
                return extendedSlots;
              } else if (cont.routerData.displayOnly) {
                if (cont.isLargeResolution) {
                  return [
                    'PreHeader',
                    'SiteContext',
                    'SiteLinks',
                    'SiteLogo',
                    'SearchBox',
                    'SiteLogin',
                    'MiniCart',
                    'NavigationBar',
                  ];
                } else {
                  return ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'];
                }
              } else return slots;
            })
          );
        });
    }

    return slots$;
  }
}
