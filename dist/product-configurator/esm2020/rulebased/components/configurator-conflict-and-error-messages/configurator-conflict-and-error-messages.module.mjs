/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorConflictAndErrorMessagesComponent } from './configurator-conflict-and-error-messages.component';
import * as i0 from "@angular/core";
export class ConfiguratorConflictAndErrorMessagesModule {
}
ConfiguratorConflictAndErrorMessagesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictAndErrorMessagesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, declarations: [ConfiguratorConflictAndErrorMessagesComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule], exports: [ConfiguratorConflictAndErrorMessagesComponent] });
ConfiguratorConflictAndErrorMessagesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CpqConfiguratorConflictAndErrorMessagesComponent: {
                    component: ConfiguratorConflictAndErrorMessagesComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CpqConfiguratorConflictAndErrorMessagesComponent: {
                                    component: ConfiguratorConflictAndErrorMessagesComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorConflictAndErrorMessagesComponent],
                    exports: [ConfiguratorConflictAndErrorMessagesComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNvbmZsaWN0LWFuZC1lcnJvci1tZXNzYWdlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvY29uZmlndXJhdG9yLWNvbmZsaWN0LWFuZC1lcnJvci1tZXNzYWdlcy9jb25maWd1cmF0b3ItY29uZmxpY3QtYW5kLWVycm9yLW1lc3NhZ2VzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsNkNBQTZDLEVBQUUsTUFBTSxzREFBc0QsQ0FBQzs7QUFpQnJILE1BQU0sT0FBTywwQ0FBMEM7O3VJQUExQywwQ0FBMEM7d0lBQTFDLDBDQUEwQyxpQkFIdEMsNkNBQTZDLGFBWGxELFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLGFBWTdELDZDQUE2Qzt3SUFFNUMsMENBQTBDLGFBYjFDO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLGdEQUFnRCxFQUFFO29CQUNoRCxTQUFTLEVBQUUsNkNBQTZDO2lCQUN6RDthQUNGO1NBQ0YsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7MkZBYzVELDBDQUEwQztrQkFmdEQsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUN4RSxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixnREFBZ0QsRUFBRTtvQ0FDaEQsU0FBUyxFQUFFLDZDQUE2QztpQ0FDekQ7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFFRCxZQUFZLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQztvQkFDN0QsT0FBTyxFQUFFLENBQUMsNkNBQTZDLENBQUM7aUJBQ3pEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JDb25mbGljdEFuZEVycm9yTWVzc2FnZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1jb25mbGljdC1hbmQtZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBVcmxNb2R1bGUsIEkxOG5Nb2R1bGUsIEljb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ3BxQ29uZmlndXJhdG9yQ29uZmxpY3RBbmRFcnJvck1lc3NhZ2VzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDb25maWd1cmF0b3JDb25mbGljdEFuZEVycm9yTWVzc2FnZXNDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckNvbmZsaWN0QW5kRXJyb3JNZXNzYWdlc0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JDb25mbGljdEFuZEVycm9yTWVzc2FnZXNDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JDb25mbGljdEFuZEVycm9yTWVzc2FnZXNNb2R1bGUge31cbiJdfQ==