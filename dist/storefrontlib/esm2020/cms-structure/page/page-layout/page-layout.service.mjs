/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable, isDevMode } from '@angular/core';
import { isNotUndefined, LoggerService, } from '@spartacus/core';
import { combineLatest, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { PAGE_LAYOUT_HANDLER } from './page-layout-handler';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../../layout/config/layout-config";
import * as i3 from "../../../layout/breakpoint/breakpoint.service";
export class PageLayoutService {
    constructor(cms, config, breakpointService, unifiedInjector) {
        this.cms = cms;
        this.config = config;
        this.breakpointService = breakpointService;
        this.unifiedInjector = unifiedInjector;
        this.subscription = new Subscription();
        this.logger = inject(LoggerService);
        // Prints warn messages for missing layout configs.
        // The warnings are only printed once per config
        // to not pollute the console log.
        this.warnLogMessages = {};
        this.logSlots = {};
        this.subscription.add(this.unifiedInjector
            .getMulti(PAGE_LAYOUT_HANDLER)
            .subscribe((handlers) => (this.handlers = handlers)));
    }
    getSlots(section) {
        return combineLatest([this.page$, this.breakpointService.breakpoint$]).pipe(map(([page, breakpoint]) => {
            const pageTemplate = page.template;
            const slots = this.resolveSlots(page, section, breakpoint);
            return { slots, pageTemplate, breakpoint };
        }), switchMap(({ slots, pageTemplate, breakpoint }) => {
            let result = of(slots);
            for (const handler of this.handlers || []) {
                result = handler.handle(result, pageTemplate, section, breakpoint);
            }
            return result;
        }), distinctUntilChanged((a, b) => {
            if (a.length !== b.length) {
                return false;
            }
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }));
    }
    /**
     * Returns an observable with the last page slot above-the-fold
     * for the given pageTemplate / breakpoint.
     *
     * The page fold is configurable in the `LayoutConfig` for each page layout.
     */
    getPageFoldSlot(pageTemplate) {
        return this.breakpointService.breakpoint$.pipe(map((breakpoint) => {
            if (!this.config.layoutSlots) {
                // no layout config available
                return undefined;
            }
            const pageTemplateConfig = this.config.layoutSlots[pageTemplate];
            const config = this.getResponsiveSlotConfig(pageTemplateConfig, 'pageFold', breakpoint);
            return config ? config.pageFold : undefined;
        }));
    }
    resolveSlots(page, section, breakpoint) {
        const config = this.getSlotConfig(page.template ?? '', 'slots', section, breakpoint);
        if (config && config.slots) {
            const pageSlots = page.slots ? Object.keys(page.slots) : [];
            return config.slots.filter((slot) => pageSlots.includes(slot));
        }
        else if (!section) {
            this.logMissingLayoutConfig(page);
            return page.slots ? Object.keys(page.slots) : [];
        }
        else {
            this.logMissingLayoutConfig(page, section);
            return [];
        }
    }
    get page$() {
        return this.cms.getCurrentPage().pipe(filter((page) => !!page));
    }
    get templateName$() {
        return this.page$.pipe(map((page) => page.template), filter(isNotUndefined));
    }
    /**
     * load slots from the layout configuration. The breakpoint is used
     * to load a specific configuration for the given breakpoint. If there's
     * no configuration available for the given breakpoint the default slot
     * configuration is returned.
     */
    getSlotConfig(templateUid, configAttribute, section, breakpoint) {
        if (!this.config.layoutSlots) {
            return undefined;
        }
        const pageTemplateConfig = this.config.layoutSlots[templateUid];
        if (section) {
            return this.getSlotConfigForSection(templateUid, configAttribute, section, breakpoint);
        }
        if (pageTemplateConfig) {
            return this.getResponsiveSlotConfig(pageTemplateConfig, configAttribute, breakpoint);
        }
    }
    getSlotConfigForSection(templateUid, configAttribute, section, breakpoint) {
        const pageTemplateConfig = this.config.layoutSlots?.[templateUid];
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
        const responsiveConfig = this.getResponsiveSlotConfig(sectionConfig, configAttribute, breakpoint);
        if (responsiveConfig.hasOwnProperty(configAttribute)) {
            return responsiveConfig;
        }
        else if (pageTemplateConfig[section].hasOwnProperty(configAttribute)) {
            return pageTemplateConfig[section];
        }
        else if (this.config.layoutSlots?.[section]) {
            return this.config.layoutSlots[section];
        }
    }
    /**
     * Returns a list of slots for a breakpoint specific configuration
     * If there's no specific configuration for the breakpoint,
     * the closest available configuration will be returned.
     */
    getResponsiveSlotConfig(layoutSlotConfig, configAttribute, breakpoint) {
        let slotConfig = layoutSlotConfig;
        // fallback to default slot config
        if (!layoutSlotConfig || !breakpoint) {
            return slotConfig;
        }
        // we have a config for the specific breakpoint
        if (layoutSlotConfig[breakpoint] &&
            layoutSlotConfig[breakpoint].hasOwnProperty(configAttribute)) {
            return layoutSlotConfig[breakpoint];
        }
        // find closest config
        const all = this.breakpointService.breakpoints;
        for (const br of all.slice(0, all.indexOf(breakpoint))) {
            if (layoutSlotConfig[br] &&
                layoutSlotConfig[br].hasOwnProperty(configAttribute)) {
                slotConfig = layoutSlotConfig[br];
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
    logMissingLayoutConfig(page, section) {
        if (!isDevMode()) {
            return;
        }
        if (page.template && !this.logSlots[page.template]) {
            // the info log is not printed in production
            this.logger.info(`Available CMS page slots: '${(page.slots
                ? Object.keys(page.slots)
                : []).join(`','`)}'`);
            this.logSlots[page.template] = true;
        }
        const cacheKey = section || page.template;
        if (cacheKey && !this.warnLogMessages[cacheKey]) {
            this.logger.warn(`No layout config found for ${cacheKey}, you can configure a 'LayoutConfig' to control the rendering of page slots.`);
            this.warnLogMessages[cacheKey] = true;
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
PageLayoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageLayoutService, deps: [{ token: i1.CmsService }, { token: i2.LayoutConfig }, { token: i3.BreakpointService }, { token: i1.UnifiedInjector }], target: i0.ɵɵFactoryTarget.Injectable });
PageLayoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageLayoutService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageLayoutService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i2.LayoutConfig }, { type: i3.BreakpointService }, { type: i1.UnifiedInjector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1sYXlvdXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL3BhZ2UtbGF5b3V0L3BhZ2UtbGF5b3V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBRUwsY0FBYyxFQUNkLGFBQWEsR0FHZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVE5RSxPQUFPLEVBQUUsbUJBQW1CLEVBQXFCLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBSy9FLE1BQU0sT0FBTyxpQkFBaUI7SUFNNUIsWUFDVSxHQUFlLEVBQ2YsTUFBb0IsRUFDcEIsaUJBQW9DLEVBQ3BDLGVBQWdDO1FBSGhDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUmhDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsQyxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBZXpDLG1EQUFtRDtRQUNuRCxnREFBZ0Q7UUFDaEQsa0NBQWtDO1FBQzFCLG9CQUFlLEdBQVEsRUFBRSxDQUFDO1FBQzFCLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFYekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElB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aWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgaW5qZWN0LCBJbmplY3RhYmxlLCBpc0Rldk1vZGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zU2VydmljZSxcbiAgaXNOb3RVbmRlZmluZWQsXG4gIExvZ2dlclNlcnZpY2UsXG4gIFBhZ2UsXG4gIFVuaWZpZWRJbmplY3Rvcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQnJlYWtwb2ludFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9sYXlvdXQvYnJlYWtwb2ludC9icmVha3BvaW50LnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQlJFQUtQT0lOVCxcbiAgTGF5b3V0Q29uZmlnLFxuICBMYXlvdXRTbG90Q29uZmlnLFxuICBTbG90Q29uZmlnLFxufSBmcm9tICcuLi8uLi8uLi9sYXlvdXQvY29uZmlnL2xheW91dC1jb25maWcnO1xuaW1wb3J0IHsgUEFHRV9MQVlPVVRfSEFORExFUiwgUGFnZUxheW91dEhhbmRsZXIgfSBmcm9tICcuL3BhZ2UtbGF5b3V0LWhhbmRsZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGFnZUxheW91dFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgaGFuZGxlcnM6IFBhZ2VMYXlvdXRIYW5kbGVyW107XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNtczogQ21zU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZzogTGF5b3V0Q29uZmlnLFxuICAgIHByaXZhdGUgYnJlYWtwb2ludFNlcnZpY2U6IEJyZWFrcG9pbnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgdW5pZmllZEluamVjdG9yOiBVbmlmaWVkSW5qZWN0b3JcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy51bmlmaWVkSW5qZWN0b3JcbiAgICAgICAgLmdldE11bHRpKFBBR0VfTEFZT1VUX0hBTkRMRVIpXG4gICAgICAgIC5zdWJzY3JpYmUoKGhhbmRsZXJzKSA9PiAodGhpcy5oYW5kbGVycyA9IGhhbmRsZXJzKSlcbiAgICApO1xuICB9XG5cbiAgLy8gUHJpbnRzIHdhcm4gbWVzc2FnZXMgZm9yIG1pc3NpbmcgbGF5b3V0IGNvbmZpZ3MuXG4gIC8vIFRoZSB3YXJuaW5ncyBhcmUgb25seSBwcmludGVkIG9uY2UgcGVyIGNvbmZpZ1xuICAvLyB0byBub3QgcG9sbHV0ZSB0aGUgY29uc29sZSBsb2cuXG4gIHByaXZhdGUgd2FybkxvZ01lc3NhZ2VzOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBsb2dTbG90czogYW55ID0ge307XG5cbiAgZ2V0U2xvdHMoc2VjdGlvbj86IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbdGhpcy5wYWdlJCwgdGhpcy5icmVha3BvaW50U2VydmljZS5icmVha3BvaW50JF0pLnBpcGUoXG4gICAgICBtYXAoKFtwYWdlLCBicmVha3BvaW50XSkgPT4ge1xuICAgICAgICBjb25zdCBwYWdlVGVtcGxhdGUgPSBwYWdlLnRlbXBsYXRlO1xuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMucmVzb2x2ZVNsb3RzKHBhZ2UsIHNlY3Rpb24sIGJyZWFrcG9pbnQpO1xuICAgICAgICByZXR1cm4geyBzbG90cywgcGFnZVRlbXBsYXRlLCBicmVha3BvaW50IH07XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcCgoeyBzbG90cywgcGFnZVRlbXBsYXRlLCBicmVha3BvaW50IH0pID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG9mKHNsb3RzKTtcbiAgICAgICAgZm9yIChjb25zdCBoYW5kbGVyIG9mIHRoaXMuaGFuZGxlcnMgfHwgW10pIHtcbiAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyLmhhbmRsZShyZXN1bHQsIHBhZ2VUZW1wbGF0ZSwgc2VjdGlvbiwgYnJlYWtwb2ludCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgd2l0aCB0aGUgbGFzdCBwYWdlIHNsb3QgYWJvdmUtdGhlLWZvbGRcbiAgICogZm9yIHRoZSBnaXZlbiBwYWdlVGVtcGxhdGUgLyBicmVha3BvaW50LlxuICAgKlxuICAgKiBUaGUgcGFnZSBmb2xkIGlzIGNvbmZpZ3VyYWJsZSBpbiB0aGUgYExheW91dENvbmZpZ2AgZm9yIGVhY2ggcGFnZSBsYXlvdXQuXG4gICAqL1xuICBnZXRQYWdlRm9sZFNsb3QocGFnZVRlbXBsYXRlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmJyZWFrcG9pbnRTZXJ2aWNlLmJyZWFrcG9pbnQkLnBpcGUoXG4gICAgICBtYXAoKGJyZWFrcG9pbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5sYXlvdXRTbG90cykge1xuICAgICAgICAgIC8vIG5vIGxheW91dCBjb25maWcgYXZhaWxhYmxlXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWdlVGVtcGxhdGVDb25maWcgPSB0aGlzLmNvbmZpZy5sYXlvdXRTbG90c1twYWdlVGVtcGxhdGVdO1xuICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFJlc3BvbnNpdmVTbG90Q29uZmlnKFxuICAgICAgICAgIDxMYXlvdXRTbG90Q29uZmlnPnBhZ2VUZW1wbGF0ZUNvbmZpZyxcbiAgICAgICAgICAncGFnZUZvbGQnLFxuICAgICAgICAgIGJyZWFrcG9pbnRcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZyA/IGNvbmZpZy5wYWdlRm9sZCA6IHVuZGVmaW5lZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZVNsb3RzKFxuICAgIHBhZ2U6IFBhZ2UsXG4gICAgc2VjdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGJyZWFrcG9pbnQ6IEJSRUFLUE9JTlRcbiAgKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0U2xvdENvbmZpZyhcbiAgICAgIHBhZ2UudGVtcGxhdGUgPz8gJycsXG4gICAgICAnc2xvdHMnLFxuICAgICAgc2VjdGlvbixcbiAgICAgIGJyZWFrcG9pbnRcbiAgICApO1xuICAgIGlmIChjb25maWcgJiYgY29uZmlnLnNsb3RzKSB7XG4gICAgICBjb25zdCBwYWdlU2xvdHMgPSBwYWdlLnNsb3RzID8gT2JqZWN0LmtleXMocGFnZS5zbG90cykgOiBbXTtcbiAgICAgIHJldHVybiBjb25maWcuc2xvdHMuZmlsdGVyKChzbG90KSA9PiBwYWdlU2xvdHMuaW5jbHVkZXMoc2xvdCkpO1xuICAgIH0gZWxzZSBpZiAoIXNlY3Rpb24pIHtcbiAgICAgIHRoaXMubG9nTWlzc2luZ0xheW91dENvbmZpZyhwYWdlKTtcbiAgICAgIHJldHVybiBwYWdlLnNsb3RzID8gT2JqZWN0LmtleXMocGFnZS5zbG90cykgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dNaXNzaW5nTGF5b3V0Q29uZmlnKHBhZ2UsIHNlY3Rpb24pO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwYWdlJCgpOiBPYnNlcnZhYmxlPFBhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5jbXMuZ2V0Q3VycmVudFBhZ2UoKS5waXBlKGZpbHRlcigocGFnZSkgPT4gISFwYWdlKSk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGVOYW1lJCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2UkLnBpcGUoXG4gICAgICBtYXAoKHBhZ2U6IFBhZ2UpID0+IHBhZ2UudGVtcGxhdGUpLFxuICAgICAgZmlsdGVyKGlzTm90VW5kZWZpbmVkKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogbG9hZCBzbG90cyBmcm9tIHRoZSBsYXlvdXQgY29uZmlndXJhdGlvbi4gVGhlIGJyZWFrcG9pbnQgaXMgdXNlZFxuICAgKiB0byBsb2FkIGEgc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmb3IgdGhlIGdpdmVuIGJyZWFrcG9pbnQuIElmIHRoZXJlJ3NcbiAgICogbm8gY29uZmlndXJhdGlvbiBhdmFpbGFibGUgZm9yIHRoZSBnaXZlbiBicmVha3BvaW50IHRoZSBkZWZhdWx0IHNsb3RcbiAgICogY29uZmlndXJhdGlvbiBpcyByZXR1cm5lZC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRTbG90Q29uZmlnKFxuICAgIHRlbXBsYXRlVWlkOiBzdHJpbmcsXG4gICAgY29uZmlnQXR0cmlidXRlOiBzdHJpbmcsXG4gICAgc2VjdGlvbj86IHN0cmluZyxcbiAgICBicmVha3BvaW50PzogQlJFQUtQT0lOVFxuICApOiBTbG90Q29uZmlnIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmxheW91dFNsb3RzKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBwYWdlVGVtcGxhdGVDb25maWcgPSB0aGlzLmNvbmZpZy5sYXlvdXRTbG90c1t0ZW1wbGF0ZVVpZF07XG5cbiAgICBpZiAoc2VjdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U2xvdENvbmZpZ0ZvclNlY3Rpb24oXG4gICAgICAgIHRlbXBsYXRlVWlkLFxuICAgICAgICBjb25maWdBdHRyaWJ1dGUsXG4gICAgICAgIHNlY3Rpb24sXG4gICAgICAgIGJyZWFrcG9pbnRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHBhZ2VUZW1wbGF0ZUNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzcG9uc2l2ZVNsb3RDb25maWcoXG4gICAgICAgIDxMYXlvdXRTbG90Q29uZmlnPnBhZ2VUZW1wbGF0ZUNvbmZpZyxcbiAgICAgICAgY29uZmlnQXR0cmlidXRlLFxuICAgICAgICBicmVha3BvaW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTbG90Q29uZmlnRm9yU2VjdGlvbihcbiAgICB0ZW1wbGF0ZVVpZDogc3RyaW5nLFxuICAgIGNvbmZpZ0F0dHJpYnV0ZTogc3RyaW5nLFxuICAgIHNlY3Rpb24/OiBzdHJpbmcsXG4gICAgYnJlYWtwb2ludD86IEJSRUFLUE9JTlRcbiAgKTogU2xvdENvbmZpZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGFnZVRlbXBsYXRlQ29uZmlnOiBhbnkgPSB0aGlzLmNvbmZpZy5sYXlvdXRTbG90cz8uW3RlbXBsYXRlVWlkXTtcblxuICAgIGlmICghcGFnZVRlbXBsYXRlQ29uZmlnIHx8ICFzZWN0aW9uKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlJ3Mgbm8gc2VjdGlvbiBjb25maWcgb24gdGhlIHBhZ2UgbGF5b3V0XG4gICAgLy8gd2UgZmFsbCBiYWNrIHRvIHRoZSBnbG9iYWwgc2VjdGlvbiBjb25maWdcbiAgICBjb25zdCBzZWN0aW9uQ29uZmlnID0gcGFnZVRlbXBsYXRlQ29uZmlnW3NlY3Rpb25dXG4gICAgICA/IHBhZ2VUZW1wbGF0ZUNvbmZpZ1tzZWN0aW9uXVxuICAgICAgOiB0aGlzLmNvbmZpZy5sYXlvdXRTbG90cz8uW3NlY3Rpb25dO1xuXG4gICAgaWYgKCFzZWN0aW9uQ29uZmlnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNpdmVDb25maWcgPSB0aGlzLmdldFJlc3BvbnNpdmVTbG90Q29uZmlnKFxuICAgICAgPExheW91dFNsb3RDb25maWc+c2VjdGlvbkNvbmZpZyxcbiAgICAgIGNvbmZpZ0F0dHJpYnV0ZSxcbiAgICAgIGJyZWFrcG9pbnRcbiAgICApO1xuXG4gICAgaWYgKHJlc3BvbnNpdmVDb25maWcuaGFzT3duUHJvcGVydHkoY29uZmlnQXR0cmlidXRlKSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNpdmVDb25maWc7XG4gICAgfSBlbHNlIGlmIChwYWdlVGVtcGxhdGVDb25maWdbc2VjdGlvbl0uaGFzT3duUHJvcGVydHkoY29uZmlnQXR0cmlidXRlKSkge1xuICAgICAgcmV0dXJuIHBhZ2VUZW1wbGF0ZUNvbmZpZ1tzZWN0aW9uXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmxheW91dFNsb3RzPy5bc2VjdGlvbl0pIHtcbiAgICAgIHJldHVybiA8U2xvdENvbmZpZz50aGlzLmNvbmZpZy5sYXlvdXRTbG90c1tzZWN0aW9uXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2Ygc2xvdHMgZm9yIGEgYnJlYWtwb2ludCBzcGVjaWZpYyBjb25maWd1cmF0aW9uXG4gICAqIElmIHRoZXJlJ3Mgbm8gc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmb3IgdGhlIGJyZWFrcG9pbnQsXG4gICAqIHRoZSBjbG9zZXN0IGF2YWlsYWJsZSBjb25maWd1cmF0aW9uIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UmVzcG9uc2l2ZVNsb3RDb25maWcoXG4gICAgbGF5b3V0U2xvdENvbmZpZzogTGF5b3V0U2xvdENvbmZpZyxcbiAgICBjb25maWdBdHRyaWJ1dGU6IHN0cmluZyxcbiAgICBicmVha3BvaW50PzogQlJFQUtQT0lOVFxuICApOiBTbG90Q29uZmlnIHtcbiAgICBsZXQgc2xvdENvbmZpZyA9IDxTbG90Q29uZmlnPmxheW91dFNsb3RDb25maWc7XG5cbiAgICAvLyBmYWxsYmFjayB0byBkZWZhdWx0IHNsb3QgY29uZmlnXG4gICAgaWYgKCFsYXlvdXRTbG90Q29uZmlnIHx8ICFicmVha3BvaW50KSB7XG4gICAgICByZXR1cm4gc2xvdENvbmZpZztcbiAgICB9XG5cbiAgICAvLyB3ZSBoYXZlIGEgY29uZmlnIGZvciB0aGUgc3BlY2lmaWMgYnJlYWtwb2ludFxuICAgIGlmIChcbiAgICAgIGxheW91dFNsb3RDb25maWdbYnJlYWtwb2ludF0gJiZcbiAgICAgIGxheW91dFNsb3RDb25maWdbYnJlYWtwb2ludF0uaGFzT3duUHJvcGVydHkoY29uZmlnQXR0cmlidXRlKVxuICAgICkge1xuICAgICAgcmV0dXJuIDxTbG90Q29uZmlnPmxheW91dFNsb3RDb25maWdbYnJlYWtwb2ludF07XG4gICAgfVxuXG4gICAgLy8gZmluZCBjbG9zZXN0IGNvbmZpZ1xuICAgIGNvbnN0IGFsbCA9IHRoaXMuYnJlYWtwb2ludFNlcnZpY2UuYnJlYWtwb2ludHM7XG5cbiAgICBmb3IgKGNvbnN0IGJyIG9mIGFsbC5zbGljZSgwLCBhbGwuaW5kZXhPZihicmVha3BvaW50KSkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGF5b3V0U2xvdENvbmZpZ1ticl0gJiZcbiAgICAgICAgbGF5b3V0U2xvdENvbmZpZ1ticl0uaGFzT3duUHJvcGVydHkoY29uZmlnQXR0cmlidXRlKVxuICAgICAgKSB7XG4gICAgICAgIHNsb3RDb25maWcgPSA8U2xvdENvbmZpZz5sYXlvdXRTbG90Q29uZmlnW2JyXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNsb3RDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogSW4gb3JkZXIgdG8gaGVscCBkZXZlbG9wZXJzLCB3ZSBwcmludCBzb21lIGRldGFpbGVkIGxvZyBpbmZvcm1hdGlvbiBpblxuICAgKiBjYXNlIHRoZXJlJ3Mgbm8gbGF5b3V0IGNvbmZpZ3VyYXRpb24gYXZhaWxhYmxlIGZvciB0aGUgZ2l2ZW4gcGFnZSB0ZW1wbGF0ZVxuICAgKiBvciBzZWN0aW9uLiBBZGRpdGlvbmFsbHksIHRoZSBzbG90IHBvc2l0aW9ucyBhcmUgcHJpbnRlZCBpbiB0aGUgY29uc29sZVxuICAgKiBpbiBhIGZvcm1hdCB0aGF0IGNhbiBiZSBjb3BpZWQgLyBwYXN0ZSB0byB0aGUgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgbG9nTWlzc2luZ0xheW91dENvbmZpZyhwYWdlOiBQYWdlLCBzZWN0aW9uPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCFpc0Rldk1vZGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGFnZS50ZW1wbGF0ZSAmJiAhdGhpcy5sb2dTbG90c1twYWdlLnRlbXBsYXRlXSkge1xuICAgICAgLy8gdGhlIGluZm8gbG9nIGlzIG5vdCBwcmludGVkIGluIHByb2R1Y3Rpb25cbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICAgIGBBdmFpbGFibGUgQ01TIHBhZ2Ugc2xvdHM6ICckeyhwYWdlLnNsb3RzXG4gICAgICAgICAgPyBPYmplY3Qua2V5cyhwYWdlLnNsb3RzKVxuICAgICAgICAgIDogW11cbiAgICAgICAgKS5qb2luKGAnLCdgKX0nYFxuICAgICAgKTtcbiAgICAgIHRoaXMubG9nU2xvdHNbcGFnZS50ZW1wbGF0ZV0gPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlS2V5ID0gc2VjdGlvbiB8fCBwYWdlLnRlbXBsYXRlO1xuICAgIGlmIChjYWNoZUtleSAmJiAhdGhpcy53YXJuTG9nTWVzc2FnZXNbY2FjaGVLZXldKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFxuICAgICAgICBgTm8gbGF5b3V0IGNvbmZpZyBmb3VuZCBmb3IgJHtjYWNoZUtleX0sIHlvdSBjYW4gY29uZmlndXJlIGEgJ0xheW91dENvbmZpZycgdG8gY29udHJvbCB0aGUgcmVuZGVyaW5nIG9mIHBhZ2Ugc2xvdHMuYFxuICAgICAgKTtcbiAgICAgIHRoaXMud2FybkxvZ01lc3NhZ2VzW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19