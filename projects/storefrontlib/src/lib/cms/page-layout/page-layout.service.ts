import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { CmsService, Page } from '@spartacus/core';
import { BreakpointService } from '../../ui/layout/breakpoint/breakpoint.service';
import {
  BREAKPOINT,
  LayoutConfig,
  LayoutSlotConfig,
  SlotConfig
} from '../../ui/layout/config/layout-config';

@Injectable()
export class PageLayoutService {
  constructor(
    private cms: CmsService,
    private config: LayoutConfig,
    private breakpointService: BreakpointService
  ) {}

  // we print warn messages on missing layout configs
  // only once to not polute the console log
  private warnLogMessages = {};

  // TODO:
  // distinctUntilChanged is not enough here, probably because
  // we use the startWith operator in the breakpoint service which
  // doesn't seem to work well with distinctUntilChanged, see
  // https://github.com/ReactiveX/rxjs/issues/4030
  getSlots(section?: string): Observable<string[]> {
    return this.breakpointService.breakpoint$.pipe(
      switchMap(breakpoint =>
        this.page$.pipe(
          map(page =>
            this.getSlotConfig(page.template, 'slots', section, breakpoint)
          ),
          filter(Boolean),
          map(config => config.slots)
        )
      ),
      distinctUntilChanged()
    );
  }

  private showTitle(section?: string): Observable<boolean> {
    return this.breakpointService.breakpoint$.pipe(
      switchMap(breakpoint =>
        this.page$.pipe(
          map(page => {
            return this.getSlotConfig(
              page.template,
              'showTitle',
              section,
              breakpoint
            );
          }),
          filter(Boolean),
          map(config => config.showTitle)
        )
      ),
      distinctUntilChanged()
    );
  }

  get page$(): Observable<Page> {
    return this.cms.getCurrentPage().pipe(filter(Boolean));
  }

  get pageTitle$(): Observable<string> {
    return this.showTitle().pipe(
      switchMap(show =>
        show ? this.page$.pipe(map((page: Page) => page.title)) : of()
      )
    );
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(
      filter(page => !!page.template),
      map((page: Page) => page.template)
    );
  }

  /**
   * load slots from the layout configuration. The breakpoint is used
   * to load a specific configuration for the given breakpoint. If there's
   * no configuration available for the given breakpoint the default slot
   * configuration is returned.
   */
  protected getSlotConfig(
    templateUid: string,
    configAttribute: string,
    section?: string,
    breakpoint?: BREAKPOINT
  ): SlotConfig {
    const pageTemplateConfig = this.config.layoutSlots[templateUid];

    if (section) {
      return this.getSlotConfigForSection(
        templateUid,
        configAttribute,
        section,
        breakpoint
      );
    }

    if (!pageTemplateConfig) {
      return this.noConfigFound(templateUid);
    } else {
      return this.getResponsiveSlotConfig(
        <LayoutSlotConfig>pageTemplateConfig,
        configAttribute,
        breakpoint
      );
    }
  }

  protected getSlotConfigForSection(
    templateUid: string,
    configAttribute: string,
    section?: string,
    breakpoint?: BREAKPOINT
  ): SlotConfig {
    const pageTemplateConfig = this.config.layoutSlots[templateUid];
    // if there's no section config on the page layout
    // we fall back to the global section config
    const sectionConfig = pageTemplateConfig[section]
      ? pageTemplateConfig[section]
      : this.config.layoutSlots[section];

    if (!sectionConfig) {
      return null;
    }

    const responsiveConfig = this.getResponsiveSlotConfig(
      <LayoutSlotConfig>sectionConfig,
      configAttribute,
      breakpoint
    );

    if (responsiveConfig.hasOwnProperty(configAttribute)) {
      return responsiveConfig;
    } else if (pageTemplateConfig[section].hasOwnProperty(configAttribute)) {
      return pageTemplateConfig[section];
    } else if (this.config.layoutSlots[section]) {
      return <SlotConfig>this.config.layoutSlots[section];
    }
  }

  /**
   * Returns a list of slots for a breakpoint specific configuratoin
   * If there's no specific configuration for the breakpoint,
   * the closest available configuration will be returned.
   */
  protected getResponsiveSlotConfig(
    layoutSlotConfig: LayoutSlotConfig,
    configAttribute: string,
    breakpoint?: BREAKPOINT
  ): SlotConfig {
    let slotConfig = <SlotConfig>layoutSlotConfig;

    // fallback to default slot config
    if (!breakpoint) {
      return slotConfig;
    }

    // we have a config for the specific breakpoint
    if (
      layoutSlotConfig[breakpoint] &&
      layoutSlotConfig[breakpoint].hasOwnProperty(configAttribute)
    ) {
      return <SlotConfig>layoutSlotConfig[breakpoint];
    }

    // find closest config
    const all = this.breakpointService.breakpoints;

    for (const br of all.splice(0, all.indexOf(breakpoint))) {
      if (
        layoutSlotConfig[br] &&
        layoutSlotConfig[br].hasOwnProperty(configAttribute)
      ) {
        slotConfig = <SlotConfig>layoutSlotConfig[br];
      }
    }
    return slotConfig;
  }

  private noConfigFound(template: string, section?: string) {
    if (section) {
      if (!this.warnLogMessages[section + ':' + template]) {
        console.warn(
          `no layout config found for section ${section} of template ${template}`
        );
        this.warnLogMessages[section + ':' + template] = true;
      }
    } else if (!this.warnLogMessages[template]) {
      console.warn(`no layout config found for ${template}`);
      this.warnLogMessages[template] = true;
    }
    return null;
  }
}
