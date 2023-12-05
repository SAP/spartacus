/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { I18nModule, UserConsentAdapter } from '@spartacus/core';
import { CdcUserPreferenceSerializer } from './converters/cdc-user-preference.serializer';
import { CommonModule } from '@angular/common';
import { CdcConsentManagementComponentService } from './services/cdc-consent-management-component.service';
import { ConsentManagementComponentService } from '@spartacus/storefront';
import { CDC_USER_PREFERENCE_SERIALIZER } from './converters/converter';
import { CdcUserConsentAdapter } from './cdc-user-consent.adapter';
import * as i0 from "@angular/core";
export class CdcConsentManagementModule {
}
CdcConsentManagementModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcConsentManagementModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementModule, imports: [CommonModule, I18nModule] });
CdcConsentManagementModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementModule, providers: [
        { provide: UserConsentAdapter, useClass: CdcUserConsentAdapter },
        {
            provide: ConsentManagementComponentService,
            useClass: CdcConsentManagementComponentService,
        },
        {
            provide: CDC_USER_PREFERENCE_SERIALIZER,
            useExisting: CdcUserPreferenceSerializer,
            multi: true,
        },
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    providers: [
                        { provide: UserConsentAdapter, useClass: CdcUserConsentAdapter },
                        {
                            provide: ConsentManagementComponentService,
                            useClass: CdcConsentManagementComponentService,
                        },
                        {
                            provide: CDC_USER_PREFERENCE_SERIALIZER,
                            useExisting: CdcUserPreferenceSerializer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWNvbnNlbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvcm9vdC9jb25zZW50LW1hbmFnZW1lbnQvY2RjLWNvbnNlbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0scURBQXFELENBQUM7QUFDM0csT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBaUJuRSxNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsWUFkM0IsWUFBWSxFQUFFLFVBQVU7d0hBY3ZCLDBCQUEwQixhQWIxQjtRQUNULEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRTtRQUNoRTtZQUNFLE9BQU8sRUFBRSxpQ0FBaUM7WUFDMUMsUUFBUSxFQUFFLG9DQUFvQztTQUMvQztRQUNEO1lBQ0UsT0FBTyxFQUFFLDhCQUE4QjtZQUN2QyxXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQVpTLFlBQVksRUFBRSxVQUFVOzJGQWN2QiwwQkFBMEI7a0JBZnRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDbkMsU0FBUyxFQUFFO3dCQUNULEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRTt3QkFDaEU7NEJBQ0UsT0FBTyxFQUFFLGlDQUFpQzs0QkFDMUMsUUFBUSxFQUFFLG9DQUFvQzt5QkFDL0M7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLDhCQUE4Qjs0QkFDdkMsV0FBVyxFQUFFLDJCQUEyQjs0QkFDeEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgVXNlckNvbnNlbnRBZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENkY1VzZXJQcmVmZXJlbmNlU2VyaWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9jZGMtdXNlci1wcmVmZXJlbmNlLnNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENkY0NvbnNlbnRNYW5hZ2VtZW50Q29tcG9uZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY2RjLWNvbnNlbnQtbWFuYWdlbWVudC1jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25zZW50TWFuYWdlbWVudENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ0RDX1VTRVJfUFJFRkVSRU5DRV9TRVJJQUxJWkVSIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBDZGNVc2VyQ29uc2VudEFkYXB0ZXIgfSBmcm9tICcuL2NkYy11c2VyLWNvbnNlbnQuYWRhcHRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEkxOG5Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IFVzZXJDb25zZW50QWRhcHRlciwgdXNlQ2xhc3M6IENkY1VzZXJDb25zZW50QWRhcHRlciB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENvbnNlbnRNYW5hZ2VtZW50Q29tcG9uZW50U2VydmljZSxcbiAgICAgIHVzZUNsYXNzOiBDZGNDb25zZW50TWFuYWdlbWVudENvbXBvbmVudFNlcnZpY2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDRENfVVNFUl9QUkVGRVJFTkNFX1NFUklBTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogQ2RjVXNlclByZWZlcmVuY2VTZXJpYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2RjQ29uc2VudE1hbmFnZW1lbnRNb2R1bGUge31cbiJdfQ==