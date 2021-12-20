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

interface RouterResolution {
  isLargeResolution: boolean;
  routerData: ConfiguratorRouter.Data;
}

@Injectable({
  providedIn: 'root',
})
export class CpqConfiguratorPageLayoutHandler implements PageLayoutHandler {
  protected static templateName = 'CpqConfigurationTemplate';
  protected static sectionHeaderDisplayOnly = 'headerDisplayOnly';
  protected static sectionNavigationDisplayOnly = 'navigationDisplayOnly';
  protected static sectionHeader = 'header';
  protected static sectionNavigation = 'navigation';
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
      section === CpqConfiguratorPageLayoutHandler.sectionHeader
    ) {
      this.compileRouterAndResolution()
        .pipe(take(1))
        .subscribe((cont) => {
          slots$ = slots$.pipe(
            map((slots) => this.getHeaderSlots(slots, cont))
          );
        });
    } else if (
      pageTemplate === CpqConfiguratorPageLayoutHandler.templateName &&
      section === CpqConfiguratorPageLayoutHandler.sectionNavigation
    ) {
      this.compileRouterAndResolution()
        .pipe(take(1))
        .subscribe((cont) => {
          slots$ = slots$.pipe(
            map((slots) => this.getNavigationSlots(slots, cont))
          );
        });
    }
    return slots$;
  }

  protected compileRouterAndResolution(): Observable<RouterResolution> {
    return this.configuratorRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.breakpointService.isUp(BREAKPOINT.lg).pipe(
          map((isLargeResolution) => ({
            isLargeResolution: isLargeResolution,
            routerData,
          }))
        )
      )
    );
  }

  protected getHeaderSlots(slots: string[], cont: RouterResolution): string[] {
    if (
      cont.routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION
    ) {
      const extendedSlots = ['PreHeader'];
      extendedSlots.push(...slots);
      return extendedSlots;
    } else if (cont.routerData.displayOnly) {
      if (cont.isLargeResolution) {
        return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(
          this.layoutConfig,
          CpqConfiguratorPageLayoutHandler.templateName,
          CpqConfiguratorPageLayoutHandler.sectionHeaderDisplayOnly,
          BREAKPOINT.lg
        );
      } else {
        return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(
          this.layoutConfig,
          CpqConfiguratorPageLayoutHandler.templateName,
          CpqConfiguratorPageLayoutHandler.sectionHeaderDisplayOnly,
          BREAKPOINT.xs
        );
      }
    } else return slots;
  }

  protected getNavigationSlots(
    slots: string[],
    cont: RouterResolution
  ): string[] {
    if (
      cont.routerData.pageType === ConfiguratorRouter.PageType.OVERVIEW &&
      cont.routerData.displayOnly
    ) {
      if (cont.isLargeResolution) {
        return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(
          this.layoutConfig,
          CpqConfiguratorPageLayoutHandler.templateName,
          CpqConfiguratorPageLayoutHandler.sectionNavigationDisplayOnly,
          BREAKPOINT.lg
        );
      } else {
        return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(
          this.layoutConfig,
          CpqConfiguratorPageLayoutHandler.templateName,
          CpqConfiguratorPageLayoutHandler.sectionNavigationDisplayOnly,
          BREAKPOINT.xs
        );
      }
    } else return slots;
  }
}
