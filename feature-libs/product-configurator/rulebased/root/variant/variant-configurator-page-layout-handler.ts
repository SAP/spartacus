import { Injectable } from '@angular/core';
import {
  CommonConfiguratorUtilsService,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  BREAKPOINT,
  BreakpointService,
  LayoutConfig,
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
    protected breakpointService: BreakpointService,
    protected layoutConfig: LayoutConfig,
    protected commonConfiguratorUtilsService: CommonConfiguratorUtilsService
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
              switchMap(() => this.breakpointService.isUp(BREAKPOINT.md)),
              map((isLargeResolution) => {
                if (isLargeResolution) {
                  return this.commonConfiguratorUtilsService.getSlotsFromConfiguration(
                    this.layoutConfig,
                    'VariantConfigurationOverviewTemplate',
                    'headerReadOnly',
                    BREAKPOINT.lg
                  );
                } else {
                  return ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'];
                }
              })
            );
          }
        });
    }

    return slots$;
  }
}
