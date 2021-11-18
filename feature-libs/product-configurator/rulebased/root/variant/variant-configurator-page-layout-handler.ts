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
  protected static templateName = 'VariantConfigurationOverviewTemplate';
  protected static sectionDisplayOnlyName = 'headerDisplayOnly';
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
      pageTemplate === VariantConfiguratorPageLayoutHandler.templateName &&
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
                  return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(
                    this.layoutConfig,
                    VariantConfiguratorPageLayoutHandler.templateName,
                    VariantConfiguratorPageLayoutHandler.sectionDisplayOnlyName,
                    BREAKPOINT.lg
                  );
                } else {
                  return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(
                    this.layoutConfig,
                    VariantConfiguratorPageLayoutHandler.templateName,
                    VariantConfiguratorPageLayoutHandler.sectionDisplayOnlyName,
                    BREAKPOINT.xs
                  );
                }
              })
            );
          }
        });
    }

    return slots$;
  }
}
