import { Injectable } from '@angular/core';
import {
  CommonConfiguratorUtilsService,
  ConfiguratorRouter,
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
export class CpqConfiguratorPageLayoutHandler implements PageLayoutHandler {
  protected static templateName = 'CpqConfigurationTemplate';
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
      pageTemplate === CpqConfiguratorPageLayoutHandler.templateName &&
      section === 'header'
    ) {
      this.configuratorRouterExtractorService
        .extractRouterData()
        .pipe(
          switchMap((routerData) =>
            this.breakpointService.isUp(BREAKPOINT.lg).pipe(
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
                  return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(
                    this.layoutConfig,
                    CpqConfiguratorPageLayoutHandler.templateName,
                    CpqConfiguratorPageLayoutHandler.sectionDisplayOnlyName,
                    BREAKPOINT.lg
                  );
                } else {
                  return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(
                    this.layoutConfig,
                    CpqConfiguratorPageLayoutHandler.templateName,
                    CpqConfiguratorPageLayoutHandler.sectionDisplayOnlyName,
                    BREAKPOINT.xs
                  );
                }
              } else return slots;
            })
          );
        });
    }

    return slots$;
  }
}
