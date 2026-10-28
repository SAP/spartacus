/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, isDevMode, OnDestroy } from '@angular/core';
import {
  CmsService,
  isNotUndefined,
  LoggerService,
  Page,
  PageTemplateService,
  UnifiedInjector,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { BreakpointService } from '../../../layout/breakpoint/breakpoint.service';
import {
  BREAKPOINT,
  LayoutConfig,
  LayoutSlotConfig,
  SlotConfig,
} from '../../../layout/config/layout-config';
import { PAGE_LAYOUT_HANDLER, PageLayoutHandler } from './page-layout-handler';

const SHELL_TEMPLATE_SECTIONS = ['header', 'navigation', 'footer'] as string[];

@Injectable({
  providedIn: 'root',
})
export class PageLayoutService implements OnDestroy {
  protected handlers: PageLayoutHandler[];
  protected subscription = new Subscription();

  protected logger = inject(LoggerService);
  protected pageTemplateService = inject(PageTemplateService);

  constructor(
    private readonly cms: CmsService,
    private readonly config: LayoutConfig,
    private readonly breakpointService: BreakpointService,
    private readonly unifiedInjector: UnifiedInjector
  ) {
    this.subscription.add(
      this.unifiedInjector
        .getMulti(PAGE_LAYOUT_HANDLER)
        .subscribe((handlers) => (this.handlers = handlers))
    );
  }

  // Prints warn messages for missing layout configs.
  // The warnings are only printed once per config
  // to not pollute the console log.
  private warnLogMessages: any = {};
  private logSlots: any = {};

  get page$(): Observable<Page> {
    return this.cms.getCurrentPage().pipe(filter((page) => !!page));
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(
      map((page: Page) => page.template),
      filter(isNotUndefined)
    );
  }

  /**
   * Observable that emits true if the current page uses a custom template,
   * false if it uses a predefined template.
   */
  get isCustomTemplate$(): Observable<boolean> {
    return this.page$.pipe(
      map((page: Page) => page.templateOrigin === 'CUSTOM')
    );
  }

  // Shared shell template fetch — one request per page, result cached and
  // replayed to all section subscribers.
  private get shellTemplate$(): Observable<string> {
    return this.page$.pipe(
      distinctUntilChanged(
        (a, b) =>
          a.templateId === b.templateId &&
          a.templateOrigin === b.templateOrigin
      ),
      switchMap((page) =>
        page.templateOrigin === 'CUSTOM' && page.templateId
          ? this.pageTemplateService.getShellTemplate(page.templateId)
          : of('')
      ),
      shareReplay(1)
    );
  }

  getSlots(section?: string): Observable<string[]> {
    return this.page$.pipe(
      switchMap((page) =>
        this.getOverrideTemplate(page, section).pipe(
          switchMap((overrideTemplate) =>
            this.breakpointService.breakpoint$.pipe(
              map((breakpoint) => ({ page, breakpoint, overrideTemplate }))
            )
          )
        )
      ),
      map(({ page, breakpoint, overrideTemplate }) => {
        const slots = this.resolveSlots(page, section, breakpoint, overrideTemplate);
        const pageTemplate = overrideTemplate ?? page.template;
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
  getPageFoldSlot(pageTemplate: string): Observable<string | undefined> {
    return this.breakpointService.breakpoint$.pipe(
      map((breakpoint) => {
        if (!this.config.layoutSlots) {
          // no layout config available
          return undefined;
        }
        const pageTemplateConfig = this.config.layoutSlots[pageTemplate];
        const config = this.getResponsiveSlotConfig(
          <LayoutSlotConfig>pageTemplateConfig,
          'pageFold',
          breakpoint
        );
        return config ? config.pageFold : undefined;
      })
    );
  }

  /**
   * Resolves the template used to read slot configuration for the current section.
   * Custom pages reuse the shell template for header/navigation/footer sections
   * so they inherit the configured slots, while other sections use the page template.
   */
  private getOverrideTemplate(
    page: Page,
    section: string | undefined
  ): Observable<string | undefined> {
    if (
      page.templateOrigin === 'CUSTOM' &&
      SHELL_TEMPLATE_SECTIONS.includes(section || '')
    ) {
      return this.shellTemplate$;
    }
    return of(page.template);
  }

  private resolveSlots(
    page: Page,
    section: string | undefined,
    breakpoint: BREAKPOINT,
    templateOverride?: string
  ): string[] {
    const templateToUse = templateOverride ?? page.template ?? '';
    const config = this.getSlotConfig(
      templateToUse,
      'slots',
      section,
      breakpoint
    );
    if (config?.slots) {
      const pageSlots = page.slots ? Object.keys(page.slots) : [];
      return config.slots.filter((slot: string) => pageSlots.includes(slot));
    } else if (!section) {
      this.logMissingLayoutConfig(page);
      return page.slots ? Object.keys(page.slots) : [];
    } else if (page.templateOrigin === 'CUSTOM') {
      return [];
    } else {
      this.logMissingLayoutConfig(page, section);
      return [];
    }
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
  ): SlotConfig | undefined {
    if (!this.config.layoutSlots) {
      return undefined;
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
  ): SlotConfig | undefined {
    const pageTemplateConfig: any = this.config.layoutSlots?.[templateUid];

    if (!pageTemplateConfig || !section) {
      return undefined;
    }

    // if there's no section config on the page layout
    // we fall back to the global section config
    const sectionConfig = pageTemplateConfig[section]
      ? pageTemplateConfig[section]
      : this.config.layoutSlots?.[section];

    if (!sectionConfig) {
      return undefined;
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
    } else if (this.config.layoutSlots?.[section]) {
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
    if (layoutSlotConfig[breakpoint]?.hasOwnProperty(configAttribute)) {
      return <SlotConfig>layoutSlotConfig[breakpoint];
    }

    // find closest config
    const all = this.breakpointService.breakpoints;

    for (const br of all.slice(0, all.indexOf(breakpoint))) {
      if (layoutSlotConfig[br]?.hasOwnProperty(configAttribute)) {
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
    if (page.template && !this.logSlots[page.template]) {
      // the info log is not printed in production
      this.logger.info(
        `Available CMS page slots: '${(page.slots
          ? Object.keys(page.slots)
          : []
        ).join("','")}'`
      );
      this.logSlots[page.template] = true;
    }

    const cacheKey = section || page.template;
    if (cacheKey && !this.warnLogMessages[cacheKey]) {
      this.logger.warn(
        `No layout config found for ${cacheKey}, you can configure a 'LayoutConfig' to control the rendering of page slots.`
      );
      this.warnLogMessages[cacheKey] = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
