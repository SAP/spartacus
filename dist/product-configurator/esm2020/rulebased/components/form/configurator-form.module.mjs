/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorFormComponent } from './configurator-form.component';
import { ConfiguratorGroupModule } from '../group/configurator-group.module';
import * as i0 from "@angular/core";
export class ConfiguratorFormModule {
}
ConfiguratorFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormModule, declarations: [ConfiguratorFormComponent], imports: [CommonModule, I18nModule, NgSelectModule, ConfiguratorGroupModule], exports: [ConfiguratorFormComponent] });
ConfiguratorFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorForm: {
                    component: ConfiguratorFormComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, NgSelectModule, ConfiguratorGroupModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, NgSelectModule, ConfiguratorGroupModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorForm: {
                                    component: ConfiguratorFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorFormComponent],
                    exports: [ConfiguratorFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2Zvcm0vY29uZmlndXJhdG9yLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFhLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQWdCN0UsTUFBTSxPQUFPLHNCQUFzQjs7bUhBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCLGlCQUhsQix5QkFBeUIsYUFWOUIsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsdUJBQXVCLGFBV2pFLHlCQUF5QjtvSEFFeEIsc0JBQXNCLGFBWnRCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLGdCQUFnQixFQUFFO29CQUNoQixTQUFTLEVBQUUseUJBQXlCO2lCQUNyQzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsdUJBQXVCOzJGQWFoRSxzQkFBc0I7a0JBZGxDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsdUJBQXVCLENBQUM7b0JBQzVFLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLGdCQUFnQixFQUFFO29DQUNoQixTQUFTLEVBQUUseUJBQXlCO2lDQUNyQzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLHlCQUF5QixDQUFDO29CQUN6QyxPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztpQkFDckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yR3JvdXBNb2R1bGUgfSBmcm9tICcuLi9ncm91cC9jb25maWd1cmF0b3ItZ3JvdXAubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgTmdTZWxlY3RNb2R1bGUsIENvbmZpZ3VyYXRvckdyb3VwTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENvbmZpZ3VyYXRvckZvcm06IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENvbmZpZ3VyYXRvckZvcm1Db21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JGb3JtQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckZvcm1Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JGb3JtTW9kdWxlIHt9XG4iXX0=