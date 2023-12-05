/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BREAKPOINT, } from '@spartacus/storefront';
import { map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/product-configurator/common";
import * as i2 from "@spartacus/storefront";
export class VariantConfiguratorPageLayoutHandler {
    constructor(configuratorRouterExtractorService, breakpointService, layoutConfig, commonConfiguratorUtilsService) {
        this.configuratorRouterExtractorService = configuratorRouterExtractorService;
        this.breakpointService = breakpointService;
        this.layoutConfig = layoutConfig;
        this.commonConfiguratorUtilsService = commonConfiguratorUtilsService;
    }
    handle(slots$, pageTemplate, section) {
        if (pageTemplate === VariantConfiguratorPageLayoutHandler.templateName &&
            section === 'header') {
            this.configuratorRouterExtractorService
                .extractRouterData()
                .pipe(take(1))
                .subscribe((routerData) => {
                if (routerData.displayOnly) {
                    slots$ = slots$.pipe(switchMap(() => this.breakpointService.isUp(BREAKPOINT.lg)), map((isLargeResolution) => {
                        if (isLargeResolution) {
                            return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, VariantConfiguratorPageLayoutHandler.templateName, VariantConfiguratorPageLayoutHandler.sectionDisplayOnlyName, BREAKPOINT.lg);
                        }
                        else {
                            return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, VariantConfiguratorPageLayoutHandler.templateName, VariantConfiguratorPageLayoutHandler.sectionDisplayOnlyName, BREAKPOINT.xs);
                        }
                    }));
                }
            });
        }
        return slots$;
    }
}
VariantConfiguratorPageLayoutHandler.templateName = 'VariantConfigurationOverviewTemplate';
VariantConfiguratorPageLayoutHandler.sectionDisplayOnlyName = 'headerDisplayOnly';
VariantConfiguratorPageLayoutHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorPageLayoutHandler, deps: [{ token: i1.ConfiguratorRouterExtractorService }, { token: i2.BreakpointService }, { token: i2.LayoutConfig }, { token: i1.CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
VariantConfiguratorPageLayoutHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorPageLayoutHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorPageLayoutHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorRouterExtractorService }, { type: i2.BreakpointService }, { type: i2.LayoutConfig }, { type: i1.CommonConfiguratorUtilsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb25maWd1cmF0b3ItcGFnZS1sYXlvdXQtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC92YXJpYW50L3ZhcmlhbnQtY29uZmlndXJhdG9yLXBhZ2UtbGF5b3V0LWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0MsT0FBTyxFQUNMLFVBQVUsR0FJWCxNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXRELE1BQU0sT0FBTyxvQ0FBb0M7SUFHL0MsWUFDWSxrQ0FBc0UsRUFDdEUsaUJBQW9DLEVBQ3BDLFlBQTBCLEVBQzFCLDhCQUE4RDtRQUg5RCx1Q0FBa0MsR0FBbEMsa0NBQWtDLENBQW9DO1FBQ3RFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUNBQThCLEdBQTlCLDhCQUE4QixDQUFnQztJQUN2RSxDQUFDO0lBQ0osTUFBTSxDQUNKLE1BQTRCLEVBQzVCLFlBQXFCLEVBQ3JCLE9BQWdCO1FBRWhCLElBQ0UsWUFBWSxLQUFLLG9DQUFvQyxDQUFDLFlBQVk7WUFDbEUsT0FBTyxLQUFLLFFBQVEsRUFDcEI7WUFDQSxJQUFJLENBQUMsa0NBQWtDO2lCQUNwQyxpQkFBaUIsRUFBRTtpQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFO29CQUMxQixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDbEIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzNELEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEVBQUU7d0JBQ3hCLElBQUksaUJBQWlCLEVBQUU7NEJBQ3JCLE9BQU8sSUFBSSxDQUFDLDhCQUE4QixDQUFDLCtCQUErQixDQUN4RSxJQUFJLENBQUMsWUFBWSxFQUNqQixvQ0FBb0MsQ0FBQyxZQUFZLEVBQ2pELG9DQUFvQyxDQUFDLHNCQUFzQixFQUMzRCxVQUFVLENBQUMsRUFBRSxDQUNkLENBQUM7eUJBQ0g7NkJBQU07NEJBQ0wsT0FBTyxJQUFJLENBQUMsOEJBQThCLENBQUMsK0JBQStCLENBQ3hFLElBQUksQ0FBQyxZQUFZLEVBQ2pCLG9DQUFvQyxDQUFDLFlBQVksRUFDakQsb0NBQW9DLENBQUMsc0JBQXNCLEVBQzNELFVBQVUsQ0FBQyxFQUFFLENBQ2QsQ0FBQzt5QkFDSDtvQkFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O0FBL0NnQixpREFBWSxHQUFHLHNDQUFzQyxDQUFDO0FBQ3RELDJEQUFzQixHQUFHLG1CQUFtQixDQUFDO2lJQUZuRCxvQ0FBb0M7cUlBQXBDLG9DQUFvQyxjQUZuQyxNQUFNOzJGQUVQLG9DQUFvQztrQkFIaEQsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG4gIENvbmZpZ3VyYXRvclJvdXRlckV4dHJhY3RvclNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7XG4gIEJSRUFLUE9JTlQsXG4gIEJyZWFrcG9pbnRTZXJ2aWNlLFxuICBMYXlvdXRDb25maWcsXG4gIFBhZ2VMYXlvdXRIYW5kbGVyLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVmFyaWFudENvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyIGltcGxlbWVudHMgUGFnZUxheW91dEhhbmRsZXIge1xuICBwcm90ZWN0ZWQgc3RhdGljIHRlbXBsYXRlTmFtZSA9ICdWYXJpYW50Q29uZmlndXJhdGlvbk92ZXJ2aWV3VGVtcGxhdGUnO1xuICBwcm90ZWN0ZWQgc3RhdGljIHNlY3Rpb25EaXNwbGF5T25seU5hbWUgPSAnaGVhZGVyRGlzcGxheU9ubHknO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZTogQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYnJlYWtwb2ludFNlcnZpY2U6IEJyZWFrcG9pbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBsYXlvdXRDb25maWc6IExheW91dENvbmZpZyxcbiAgICBwcm90ZWN0ZWQgY29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlOiBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2VcbiAgKSB7fVxuICBoYW5kbGUoXG4gICAgc2xvdHMkOiBPYnNlcnZhYmxlPHN0cmluZ1tdPixcbiAgICBwYWdlVGVtcGxhdGU/OiBzdHJpbmcsXG4gICAgc2VjdGlvbj86IHN0cmluZ1xuICApIHtcbiAgICBpZiAoXG4gICAgICBwYWdlVGVtcGxhdGUgPT09IFZhcmlhbnRDb25maWd1cmF0b3JQYWdlTGF5b3V0SGFuZGxlci50ZW1wbGF0ZU5hbWUgJiZcbiAgICAgIHNlY3Rpb24gPT09ICdoZWFkZXInXG4gICAgKSB7XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRvclJvdXRlckV4dHJhY3RvclNlcnZpY2VcbiAgICAgICAgLmV4dHJhY3RSb3V0ZXJEYXRhKClcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgocm91dGVyRGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChyb3V0ZXJEYXRhLmRpc3BsYXlPbmx5KSB7XG4gICAgICAgICAgICBzbG90cyQgPSBzbG90cyQucGlwZShcbiAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuYnJlYWtwb2ludFNlcnZpY2UuaXNVcChCUkVBS1BPSU5ULmxnKSksXG4gICAgICAgICAgICAgIG1hcCgoaXNMYXJnZVJlc29sdXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNMYXJnZVJlc29sdXRpb24pIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRTbG90c0Zyb21MYXlvdXRDb25maWd1cmF0aW9uKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dENvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgVmFyaWFudENvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyLnRlbXBsYXRlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgVmFyaWFudENvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyLnNlY3Rpb25EaXNwbGF5T25seU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIEJSRUFLUE9JTlQubGdcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRTbG90c0Zyb21MYXlvdXRDb25maWd1cmF0aW9uKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dENvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgVmFyaWFudENvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyLnRlbXBsYXRlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgVmFyaWFudENvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyLnNlY3Rpb25EaXNwbGF5T25seU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIEJSRUFLUE9JTlQueHNcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzbG90cyQ7XG4gIH1cbn1cbiJdfQ==