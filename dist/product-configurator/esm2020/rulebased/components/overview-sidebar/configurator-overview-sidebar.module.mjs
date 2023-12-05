/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewFilterModule } from '../overview-filter/configurator-overview-filter.module';
import { ConfiguratorOverviewMenuModule } from '../overview-menu/configurator-overview-menu.module';
import { ConfiguratorOverviewSidebarComponent } from './configurator-overview-sidebar.component';
import * as i0 from "@angular/core";
export class ConfiguratorOverviewSidebarModule {
}
ConfiguratorOverviewSidebarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewSidebarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarModule, declarations: [ConfiguratorOverviewSidebarComponent], imports: [CommonModule,
        I18nModule,
        ConfiguratorOverviewFilterModule,
        ConfiguratorOverviewMenuModule], exports: [ConfiguratorOverviewSidebarComponent] });
ConfiguratorOverviewSidebarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewSidebar: {
                    component: ConfiguratorOverviewSidebarComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        ConfiguratorOverviewFilterModule,
        ConfiguratorOverviewMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        ConfiguratorOverviewFilterModule,
                        ConfiguratorOverviewMenuModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewSidebar: {
                                    component: ConfiguratorOverviewSidebarComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewSidebarComponent],
                    exports: [ConfiguratorOverviewSidebarComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LXNpZGViYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LXNpZGViYXIvY29uZmlndXJhdG9yLW92ZXJ2aWV3LXNpZGViYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDMUcsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDcEcsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBcUJqRyxNQUFNLE9BQU8saUNBQWlDOzs4SEFBakMsaUNBQWlDOytIQUFqQyxpQ0FBaUMsaUJBSDdCLG9DQUFvQyxhQWRqRCxZQUFZO1FBQ1osVUFBVTtRQUNWLGdDQUFnQztRQUNoQyw4QkFBOEIsYUFZdEIsb0NBQW9DOytIQUVuQyxpQ0FBaUMsYUFaakM7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsMkJBQTJCLEVBQUU7b0JBQzNCLFNBQVMsRUFBRSxvQ0FBb0M7aUJBQ2hEO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFiQyxZQUFZO1FBQ1osVUFBVTtRQUNWLGdDQUFnQztRQUNoQyw4QkFBOEI7MkZBY3JCLGlDQUFpQztrQkFuQjdDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixnQ0FBZ0M7d0JBQ2hDLDhCQUE4QjtxQkFDL0I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsMkJBQTJCLEVBQUU7b0NBQzNCLFNBQVMsRUFBRSxvQ0FBb0M7aUNBQ2hEOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsb0NBQW9DLENBQUM7b0JBQ3BELE9BQU8sRUFBRSxDQUFDLG9DQUFvQyxDQUFDO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlck1vZHVsZSB9IGZyb20gJy4uL292ZXJ2aWV3LWZpbHRlci9jb25maWd1cmF0b3Itb3ZlcnZpZXctZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld01lbnVNb2R1bGUgfSBmcm9tICcuLi9vdmVydmlldy1tZW51L2NvbmZpZ3VyYXRvci1vdmVydmlldy1tZW51Lm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld1NpZGViYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1vdmVydmlldy1zaWRlYmFyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlck1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JPdmVydmlld01lbnVNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDb25maWd1cmF0b3JPdmVydmlld1NpZGViYXI6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENvbmZpZ3VyYXRvck92ZXJ2aWV3U2lkZWJhckNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvck92ZXJ2aWV3U2lkZWJhckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JPdmVydmlld1NpZGViYXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JPdmVydmlld1NpZGViYXJNb2R1bGUge31cbiJdfQ==