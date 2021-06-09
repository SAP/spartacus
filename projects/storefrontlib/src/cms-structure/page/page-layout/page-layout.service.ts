import { Inject, Injectable, isDevMode, Optional } from '@angular/core';
import { CmsService, Page } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { BreakpointService } from '../../../layout/breakpoint/breakpoint.service';
import {
  BREAKPOINT,
  LayoutConfig,
  LayoutSlotConfig,
  SlotConfig,
} from '../../../layout/config/layout-config';
import { PageLayoutHandler, PAGE_LAYOUT_HANDLER } from './page-layout-handler';

@Injectable({
  providedIn: 'root',
})
export class PageLayoutService {
  constructor(
    private cms: CmsService,
    private config: LayoutConfig,
    private breakpointService: BreakpointService,
    @Optional()
    @Inject(PAGE_LAYOUT_HANDLER)
    private handlers: PageLayoutHandler[]
  ) {}

  // Prints warn messages for missing layout configs.
  // The warnings are only printed once per config
  // to not pollute the console log.
  private warnLogMessages = {};
  private logSlots = {};

  getSlots(section?: string): Observable<string[]> {
    return combineLatest([this.page$, this.breakpointService.breakpoint$]).pipe(
      map(([page, breakpoint]) => {
        const pageTemplate = page.template;
        const slots = this.resolveSlots(page, section, breakpoint);
        return { slots, pageTemplate, breakpoint };
      }),
      switchMap(({ slots, pageTemplate, breakpoint }) => {
        let result = of(slots);
        for (const handler of this.handlers || []) {
          result = handler.handle(result, pageTemplate, section, breakpoint);
        }
        return result;
      }),
      distinctUntilChanged((a, b) => {
        if (a.length !== b.length) {
          return false;
        }
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
        return true;
      })
    );
  }

  /**
   * Returns an observable with the last page slot above-the-fold
   * for the given pageTemplate / breakpoint.
   *
   * The page fold is configurable in the `LayoutConfig` for each page layout.
   */
  getPageFoldSlot(pageTemplate: string): Observable<string> {
    return this.breakpointService.breakpoint$.pipe(
      map((breakpoint) => {
        if (!this.config.layoutSlots) {
          // no layout config available
          return null;
        }
        const pageTemplateConfig = this.config.layoutSlots[pageTemplate];
        const config = this.getResponsiveSlotConfig(
          <LayoutSlotConfig>pageTemplateConfig,
          'pageFold',
          breakpoint
        );
        return config ? config.pageFold : null;
      })
    );
  }

  private resolveSlots(page, section, breakpoint): string[] {
    const config = this.getSlotConfig(
      page.template,
      'slots',
      section,
      breakpoint
    );
    if (config && config.slots) {
      const pageSlots = Object.keys(page.slots);
      return config.slots.filter((slot) => pageSlots.includes(slot));
    } else if (!section) {
      this.logMissingLayoutConfig(page);
      return Object.keys(page.slots);
    } else {
      this.logMissingLayoutConfig(page, section);
      return [];
    }
  }

  get page$(): Observable<Page> {
    return this.cms.getCurrentPage().pipe(filter((page) => !!page));
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(
      filter((page) => !!page.template),
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
    if (!this.config.layoutSlots) {
      return null;
    }
    const pageTemplateConfig = this.config.layoutSlots[templateUid];

    if (section) {
      return this.getSlotConfigForSection(
        templateUid,
        configAttribute,
        section,
        breakpoint
      );
    }

    if (pageTemplateConfig) {
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

    if (!pageTemplateConfig) {
      return null;
    }

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
   * Returns a list of slots for a breakpoint specific configuration
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
    if (!layoutSlotConfig || !breakpoint) {
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

    for (const br of all.slice(0, all.indexOf(breakpoint))) {
      if (
        layoutSlotConfig[br] &&
        layoutSlotConfig[br].hasOwnProperty(configAttribute)
      ) {
        slotConfig = <SlotConfig>layoutSlotConfig[br];
      }
    }
    return slotConfig;
  }

  /**
   * In order to help developers, we print some detailed log information in
   * case there's no layout configuration available for the given page template
   * or section. Additionally, the slot positions are printed in the console
   * in a format that can be copied / paste to the configuration.
   */
  private logMissingLayoutConfig(page: Page, section?: string): void {
    if (!isDevMode()) {
      return;
    }
    if (!this.logSlots[page.template]) {
      // the info log is not printed in production
      // eslint-disable-next-line no-console
      console.info(
        `Available CMS page slots: '${Object.keys(page.slots).join(`','`)}'`
      );
      this.logSlots[page.template] = true;
    }

    const cacheKey = section || page.template;
    if (!this.warnLogMessages[cacheKey]) {
      console.warn(
        `No layout config found for ${cacheKey}, you can configure a 'LayoutConfig' to control the rendering of page slots.`
      );
      this.warnLogMessages[cacheKey] = true;
    }
  }
}
