import { Injectable } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
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
export class VariantConfiguratorPageLayoutHandler implements PageLayoutHandler {
  constructor(
    protected configuratorRouterExtractorService: ConfiguratorRouterExtractorService,
    protected breakpointService: BreakpointService
  ) {}
  handle(
    slots$: Observable<string[]>,
    pageTemplate?: string,
    section?: string
  ) {
    if (
      pageTemplate === 'VariantConfigurationOverviewTemplate' &&
      section === 'header'
    ) {
      this.configuratorRouterExtractorService
        .extractRouterData()
        .pipe(take(1))
        .subscribe((routerData) => {
          if (routerData.displayOnly) {
            slots$ = slots$.pipe(
              switchMap(() => this.breakpointService.isUp(BREAKPOINT.lg)),
              map((isLargeResolution) => {
                if (isLargeResolution) {
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
              })
            );
          } else {
            return slots$;
          }
        });
    }

    return slots$;
  }
}
