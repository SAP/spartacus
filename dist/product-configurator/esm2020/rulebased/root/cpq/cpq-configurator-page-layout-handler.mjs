/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConfiguratorRouter, } from '@spartacus/product-configurator/common';
import { BREAKPOINT, } from '@spartacus/storefront';
import { map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/product-configurator/common";
import * as i2 from "@spartacus/storefront";
export class CpqConfiguratorPageLayoutHandler {
    constructor(configuratorRouterExtractorService, breakpointService, layoutConfig, commonConfiguratorUtilsService) {
        this.configuratorRouterExtractorService = configuratorRouterExtractorService;
        this.breakpointService = breakpointService;
        this.layoutConfig = layoutConfig;
        this.commonConfiguratorUtilsService = commonConfiguratorUtilsService;
    }
    handle(slots$, pageTemplate, section) {
        if (pageTemplate === CpqConfiguratorPageLayoutHandler.templateName &&
            section === CpqConfiguratorPageLayoutHandler.sectionHeader) {
            this.compileRouterAndResolution()
                .pipe(take(1))
                .subscribe((cont) => {
                slots$ = slots$.pipe(map((slots) => this.getHeaderSlots(slots, cont)));
            });
        }
        else if (pageTemplate === CpqConfiguratorPageLayoutHandler.templateName &&
            section === CpqConfiguratorPageLayoutHandler.sectionNavigation) {
            this.compileRouterAndResolution()
                .pipe(take(1))
                .subscribe((cont) => {
                slots$ = slots$.pipe(map((slots) => this.getNavigationSlots(slots, cont)));
            });
        }
        return slots$;
    }
    compileRouterAndResolution() {
        return this.configuratorRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.breakpointService.isUp(BREAKPOINT.lg).pipe(map((isLargeResolution) => ({
            isLargeResolution: isLargeResolution,
            routerData,
        })))));
    }
    getHeaderSlots(slots, cont) {
        if (cont.routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION) {
            const extendedSlots = ['PreHeader'];
            extendedSlots.push(...slots);
            return extendedSlots;
        }
        else if (cont.routerData.displayOnly) {
            if (cont.isLargeResolution) {
                return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, CpqConfiguratorPageLayoutHandler.templateName, CpqConfiguratorPageLayoutHandler.sectionHeaderDisplayOnly, BREAKPOINT.lg);
            }
            else {
                return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, CpqConfiguratorPageLayoutHandler.templateName, CpqConfiguratorPageLayoutHandler.sectionHeaderDisplayOnly, BREAKPOINT.xs);
            }
        }
        else {
            return slots;
        }
    }
    getNavigationSlots(slots, cont) {
        if (cont.routerData.pageType === ConfiguratorRouter.PageType.OVERVIEW &&
            cont.routerData.displayOnly) {
            if (cont.isLargeResolution) {
                return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, CpqConfiguratorPageLayoutHandler.templateName, CpqConfiguratorPageLayoutHandler.sectionNavigationDisplayOnly, BREAKPOINT.lg);
            }
            else {
                return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, CpqConfiguratorPageLayoutHandler.templateName, CpqConfiguratorPageLayoutHandler.sectionNavigationDisplayOnly, BREAKPOINT.xs);
            }
        }
        else {
            return slots;
        }
    }
}
CpqConfiguratorPageLayoutHandler.templateName = 'CpqConfigurationTemplate';
CpqConfiguratorPageLayoutHandler.sectionHeaderDisplayOnly = 'headerDisplayOnly';
CpqConfiguratorPageLayoutHandler.sectionNavigationDisplayOnly = 'navigationDisplayOnly';
CpqConfiguratorPageLayoutHandler.sectionHeader = 'header';
CpqConfiguratorPageLayoutHandler.sectionNavigation = 'navigation';
CpqConfiguratorPageLayoutHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorPageLayoutHandler, deps: [{ token: i1.ConfiguratorRouterExtractorService }, { token: i2.BreakpointService }, { token: i2.LayoutConfig }, { token: i1.CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorPageLayoutHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorPageLayoutHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorPageLayoutHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorRouterExtractorService }, { type: i2.BreakpointService }, { type: i2.LayoutConfig }, { type: i1.CommonConfiguratorUtilsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1wYWdlLWxheW91dC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9yb290L2NwcS9jcHEtY29uZmlndXJhdG9yLXBhZ2UtbGF5b3V0LWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGtCQUFrQixHQUVuQixNQUFNLHdDQUF3QyxDQUFDO0FBQ2hELE9BQU8sRUFDTCxVQUFVLEdBSVgsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVV0RCxNQUFNLE9BQU8sZ0NBQWdDO0lBTTNDLFlBQ1ksa0NBQXNFLEVBQ3RFLGlCQUFvQyxFQUNwQyxZQUEwQixFQUMxQiw4QkFBOEQ7UUFIOUQsdUNBQWtDLEdBQWxDLGtDQUFrQyxDQUFvQztRQUN0RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBZ0M7SUFDdkUsQ0FBQztJQUVKLE1BQU0sQ0FDSixNQUE0QixFQUM1QixZQUFxQixFQUNyQixPQUFnQjtRQUVoQixJQUNFLFlBQVksS0FBSyxnQ0FBZ0MsQ0FBQyxZQUFZO1lBQzlELE9BQU8sS0FBSyxnQ0FBZ0MsQ0FBQyxhQUFhLEVBQzFEO1lBQ0EsSUFBSSxDQUFDLDBCQUEwQixFQUFFO2lCQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNsQixNQUFNLEdBQUcsTUFBTSxDQUFD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SUFBSSxDQUFDLFlBQVksRUFDakIsZ0NBQWdDLENBQUMsWUFBWSxFQUM3QyxnQ0FBZ0MsQ0FBQyw0QkFBNEIsRUFDN0QsVUFBVSxDQUFDLEVBQUUsQ0FDZCxDQUFDO2FBQ0g7U0FDRjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7O0FBOUdnQiw2Q0FBWSxHQUFHLDBCQUEwQixDQUFDO0FBQzFDLHlEQUF3QixHQUFHLG1CQUFtQixDQUFDO0FBQy9DLDZEQUE0QixHQUFHLHVCQUF1QixDQUFDO0FBQ3ZELDhDQUFhLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLGtEQUFpQixHQUFHLFlBQVksQ0FBQzs2SEFMdkMsZ0NBQWdDO2lJQUFoQyxnQ0FBZ0MsY0FGL0IsTUFBTTsyRkFFUCxnQ0FBZ0M7a0JBSDVDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLFxuICBDb25maWd1cmF0b3JSb3V0ZXIsXG4gIENvbmZpZ3VyYXRvclJvdXRlckV4dHJhY3RvclNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7XG4gIEJSRUFLUE9JTlQsXG4gIEJyZWFrcG9pbnRTZXJ2aWNlLFxuICBMYXlvdXRDb25maWcsXG4gIFBhZ2VMYXlvdXRIYW5kbGVyLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmludGVyZmFjZSBSb3V0ZXJSZXNvbHV0aW9uIHtcbiAgaXNMYXJnZVJlc29sdXRpb246IGJvb2xlYW47XG4gIHJvdXRlckRhdGE6IENvbmZpZ3VyYXRvclJvdXRlci5EYXRhO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3BxQ29uZmlndXJhdG9yUGFnZUxheW91dEhhbmRsZXIgaW1wbGVtZW50cyBQYWdlTGF5b3V0SGFuZGxlciB7XG4gIHByb3RlY3RlZCBzdGF0aWMgdGVtcGxhdGVOYW1lID0gJ0NwcUNvbmZpZ3VyYXRpb25UZW1wbGF0ZSc7XG4gIHByb3RlY3RlZCBzdGF0aWMgc2VjdGlvbkhlYWRlckRpc3BsYXlPbmx5ID0gJ2hlYWRlckRpc3BsYXlPbmx5JztcbiAgcHJvdGVjdGVkIHN0YXRpYyBzZWN0aW9uTmF2aWdhdGlvbkRpc3BsYXlPbmx5ID0gJ25hdmlnYXRpb25EaXNwbGF5T25seSc7XG4gIHByb3RlY3RlZCBzdGF0aWMgc2VjdGlvbkhlYWRlciA9ICdoZWFkZXInO1xuICBwcm90ZWN0ZWQgc3RhdGljIHNlY3Rpb25OYXZpZ2F0aW9uID0gJ25hdmlnYXRpb24nO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZTogQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYnJlYWtwb2ludFNlcnZpY2U6IEJyZWFrcG9pbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBsYXlvdXRDb25maWc6IExheW91dENvbmZpZyxcbiAgICBwcm90ZWN0ZWQgY29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlOiBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2VcbiAgKSB7fVxuXG4gIGhhbmRsZShcbiAgICBzbG90cyQ6IE9ic2VydmFibGU8c3RyaW5nW10+LFxuICAgIHBhZ2VUZW1wbGF0ZT86IHN0cmluZyxcbiAgICBzZWN0aW9uPzogc3RyaW5nXG4gICkge1xuICAgIGlmIChcbiAgICAgIHBhZ2VUZW1wbGF0ZSA9PT0gQ3BxQ29uZmlndXJhdG9yUGFnZUxheW91dEhhbmRsZXIudGVtcGxhdGVOYW1lICYmXG4gICAgICBzZWN0aW9uID09PSBDcHFDb25maWd1cmF0b3JQYWdlTGF5b3V0SGFuZGxlci5zZWN0aW9uSGVhZGVyXG4gICAgKSB7XG4gICAgICB0aGlzLmNvbXBpbGVSb3V0ZXJBbmRSZXNvbHV0aW9uKClcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgoY29udCkgPT4ge1xuICAgICAgICAgIHNsb3RzJCA9IHNsb3RzJC5waXBlKFxuICAgICAgICAgICAgbWFwKChzbG90cykgPT4gdGhpcy5nZXRIZWFkZXJTbG90cyhzbG90cywgY29udCkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHBhZ2VUZW1wbGF0ZSA9PT0gQ3BxQ29uZmlndXJhdG9yUGFnZUxheW91dEhhbmRsZXIudGVtcGxhdGVOYW1lICYmXG4gICAgICBzZWN0aW9uID09PSBDcHFDb25maWd1cmF0b3JQYWdlTGF5b3V0SGFuZGxlci5zZWN0aW9uTmF2aWdhdGlvblxuICAgICkge1xuICAgICAgdGhpcy5jb21waWxlUm91dGVyQW5kUmVzb2x1dGlvbigpXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGNvbnQpID0+IHtcbiAgICAgICAgICBzbG90cyQgPSBzbG90cyQucGlwZShcbiAgICAgICAgICAgIG1hcCgoc2xvdHMpID0+IHRoaXMuZ2V0TmF2aWdhdGlvblNsb3RzKHNsb3RzLCBjb250KSlcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNsb3RzJDtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb21waWxlUm91dGVyQW5kUmVzb2x1dGlvbigpOiBPYnNlcnZhYmxlPFJvdXRlclJlc29sdXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JSb3V0ZXJFeHRyYWN0b3JTZXJ2aWNlLmV4dHJhY3RSb3V0ZXJEYXRhKCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocm91dGVyRGF0YSkgPT5cbiAgICAgICAgdGhpcy5icmVha3BvaW50U2VydmljZS5pc1VwKEJSRUFLUE9JTlQubGcpLnBpcGUoXG4gICAgICAgICAgbWFwKChpc0xhcmdlUmVzb2x1dGlvbikgPT4gKHtcbiAgICAgICAgICAgIGlzTGFyZ2VSZXNvbHV0aW9uOiBpc0xhcmdlUmVzb2x1dGlvbixcbiAgICAgICAgICAgIHJvdXRlckRhdGEsXG4gICAgICAgICAgfSkpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEhlYWRlclNsb3RzKHNsb3RzOiBzdHJpbmdbXSwgY29udDogUm91dGVyUmVzb2x1dGlvbik6IHN0cmluZ1tdIHtcbiAgICBpZiAoXG4gICAgICBjb250LnJvdXRlckRhdGEucGFnZVR5cGUgPT09IENvbmZpZ3VyYXRvclJvdXRlci5QYWdlVHlwZS5DT05GSUdVUkFUSU9OXG4gICAgKSB7XG4gICAgICBjb25zdCBleHRlbmRlZFNsb3RzID0gWydQcmVIZWFkZXInXTtcbiAgICAgIGV4dGVuZGVkU2xvdHMucHVzaCguLi5zbG90cyk7XG4gICAgICByZXR1cm4gZXh0ZW5kZWRTbG90cztcbiAgICB9IGVsc2UgaWYgKGNvbnQucm91dGVyRGF0YS5kaXNwbGF5T25seSkge1xuICAgICAgaWYgKGNvbnQuaXNMYXJnZVJlc29sdXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLmdldFNsb3RzRnJvbUxheW91dENvbmZpZ3VyYXRpb24oXG4gICAgICAgICAgdGhpcy5sYXlvdXRDb25maWcsXG4gICAgICAgICAgQ3BxQ29uZmlndXJhdG9yUGFnZUxheW91dEhhbmRsZXIudGVtcGxhdGVOYW1lLFxuICAgICAgICAgIENwcUNvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyLnNlY3Rpb25IZWFkZXJEaXNwbGF5T25seSxcbiAgICAgICAgICBCUkVBS1BPSU5ULmxnXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZ2V0U2xvdHNGcm9tTGF5b3V0Q29uZmlndXJhdGlvbihcbiAgICAgICAgICB0aGlzLmxheW91dENvbmZpZyxcbiAgICAgICAgICBDcHFDb25maWd1cmF0b3JQYWdlTGF5b3V0SGFuZGxlci50ZW1wbGF0ZU5hbWUsXG4gICAgICAgICAgQ3BxQ29uZmlndXJhdG9yUGFnZUxheW91dEhhbmRsZXIuc2VjdGlvbkhlYWRlckRpc3BsYXlPbmx5LFxuICAgICAgICAgIEJSRUFLUE9JTlQueHNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNsb3RzO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXROYXZpZ2F0aW9uU2xvdHMoXG4gICAgc2xvdHM6IHN0cmluZ1tdLFxuICAgIGNvbnQ6IFJvdXRlclJlc29sdXRpb25cbiAgKTogc3RyaW5nW10ge1xuICAgIGlmIChcbiAgICAgIGNvbnQucm91dGVyRGF0YS5wYWdlVHlwZSA9PT0gQ29uZmlndXJhdG9yUm91dGVyLlBhZ2VUeXBlLk9WRVJWSUVXICYmXG4gICAgICBjb250LnJvdXRlckRhdGEuZGlzcGxheU9ubHlcbiAgICApIHtcbiAgICAgIGlmIChjb250LmlzTGFyZ2VSZXNvbHV0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRTbG90c0Zyb21MYXlvdXRDb25maWd1cmF0aW9uKFxuICAgICAgICAgIHRoaXMubGF5b3V0Q29uZmlnLFxuICAgICAgICAgIENwcUNvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyLnRlbXBsYXRlTmFtZSxcbiAgICAgICAgICBDcHFDb25maWd1cmF0b3JQYWdlTGF5b3V0SGFuZGxlci5zZWN0aW9uTmF2aWdhdGlvbkRpc3BsYXlPbmx5LFxuICAgICAgICAgIEJSRUFLUE9JTlQubGdcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRTbG90c0Zyb21MYXlvdXRDb25maWd1cmF0aW9uKFxuICAgICAgICAgIHRoaXMubGF5b3V0Q29uZmlnLFxuICAgICAgICAgIENwcUNvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyLnRlbXBsYXRlTmFtZSxcbiAgICAgICAgICBDcHFDb25maWd1cmF0b3JQYWdlTGF5b3V0SGFuZGxlci5zZWN0aW9uTmF2aWdhdGlvbkRpc3BsYXlPbmx5LFxuICAgICAgICAgIEJSRUFLUE9JTlQueHNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNsb3RzO1xuICAgIH1cbiAgfVxufVxuIl19