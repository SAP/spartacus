/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorGroupMenuComponent } from './configurator-group-menu.component';
import * as i0 from "@angular/core";
export class ConfiguratorGroupMenuModule {
}
ConfiguratorGroupMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorGroupMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuModule, declarations: [ConfiguratorGroupMenuComponent], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule], exports: [ConfiguratorGroupMenuComponent] });
ConfiguratorGroupMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorMenu: {
                    component: ConfiguratorGroupMenuComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorMenu: {
                                    component: ConfiguratorGroupMenuComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorGroupMenuComponent],
                    exports: [ConfiguratorGroupMenuComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3VwLW1lbnUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2dyb3VwLW1lbnUvY29uZmlndXJhdG9yLWdyb3VwLW1lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQWdCckYsTUFBTSxPQUFPLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjt5SEFBM0IsMkJBQTJCLGlCQUh2Qiw4QkFBOEIsYUFWbkMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLGFBV3pELDhCQUE4Qjt5SEFFN0IsMkJBQTJCLGFBWjNCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLGdCQUFnQixFQUFFO29CQUNoQixTQUFTLEVBQUUsOEJBQThCO2lCQUMxQzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsbUJBQW1COzJGQWF4RCwyQkFBMkI7a0JBZHZDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLENBQUM7b0JBQ3BFLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLGdCQUFnQixFQUFFO29DQUNoQixTQUFTLEVBQUUsOEJBQThCO2lDQUMxQzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLDhCQUE4QixDQUFDO29CQUM5QyxPQUFPLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztpQkFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc0NvbmZpZywgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSwgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JHcm91cE1lbnVDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1ncm91cC1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEkxOG5Nb2R1bGUsIEljb25Nb2R1bGUsIEtleWJvYXJkRm9jdXNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ29uZmlndXJhdG9yTWVudToge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yR3JvdXBNZW51Q29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yR3JvdXBNZW51Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckdyb3VwTWVudUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckdyb3VwTWVudU1vZHVsZSB7fVxuIl19