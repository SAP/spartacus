import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { CmsService, Page } from '@spartacus/core';
import { BreakpointService } from '../../ui/layout/breakpoint/breakpoint.service';
import {
  BREAKPOINT,
  LayoutConfig,
  LayoutSlotConfig
} from '../../ui/layout/config/layout-config';

@Injectable()
export class PageLayoutService {
  constructor(
    private cms: CmsService,
    private config: LayoutConfig,
    private breakpointService: BreakpointService
  ) {}

  // we track warn messages on missing layout configs
  //  to not polute the console log
  private warnLogMessages = {};

  getSlots(section?: string): Observable<string[]> {
    return this.breakpointService.breakpoint$.pipe(
      switchMap(breakpoint =>
        this.page$.pipe(
          map(page => {
            return this.getSlotConfig(page.template, section, breakpoint);
          })
        )
      ),
      distinctUntilChanged()
    );
  }

  get page$(): Observable<Page> {
    return this.cms.getCurrentPage().pipe(filter(Boolean));
  }

  get templateName$(): Observable<string> {
    return this.page$.pipe(map((page: Page) => page.template));
  }

  /**
   * load slots from the layout configuration. The breakpoint is used
   * to load a specific configuration for the given breakpoint. If there's
   * no configuration available for the given breakpoint the default slot
   * configuration is returned.
   */
  protected getSlotConfig(
    templateUid: string,
    section?: string,
    breakpoint?: BREAKPOINT
  ): string[] {
    let slotConfig = this.config.layoutSlots[templateUid];
    if (!slotConfig) {
      return this.noConfigFound(templateUid);
    }
    if (section) {
      // if there's no section config on the page layout
      // we fall back to the global section config
      slotConfig = slotConfig[section]
        ? slotConfig[section]
        : this.config.layoutSlots[section];

      if (!slotConfig) {
        return this.noConfigFound(templateUid, section);
      }
    }

    return this.getResponsiveSlotConfig(
      <LayoutSlotConfig>slotConfig,
      breakpoint
    );
  }

  /**
   * Returns a list of slots for a breakpoint specific configuratoin
   * If there's no specific configuration for the breakpoint,
   * the closest available configuration will be returned.
   */
  protected getResponsiveSlotConfig(
    layoutSlotConfig: LayoutSlotConfig,
    breakpoint?: BREAKPOINT
  ): string[] {
    let config = <string[]>(layoutSlotConfig.slots || layoutSlotConfig.xs);

    // fallback to default slot config
    if (!breakpoint) {
      return config;
    }

    // we have a config for the specific breakpoint
    if (layoutSlotConfig[breakpoint]) {
      return <string[]>layoutSlotConfig[breakpoint];
    }

    // find closest config
    const all = this.breakpointService.breakpoints;

    for (const br of all.splice(0, all.indexOf(breakpoint) + 1)) {
      if (layoutSlotConfig[br]) {
        config = <string[]>layoutSlotConfig[br];
      }
    }
    return config;
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
    return [];
  }
}
