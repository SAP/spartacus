/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConsentManagementModule, IconModule, KeyboardFocusModule, SpinnerModule, } from '@spartacus/storefront';
import { CdcReconsentDialogEventListener } from './cdc-reconsent-dialogue-event.listener';
import { CdcReconsentComponent } from './cdc-reconsent.component';
import { defaultCdcReconsentLayoutConfig } from './default-cdc-reconsent-layout.config';
import * as i0 from "@angular/core";
import * as i1 from "./cdc-reconsent-dialogue-event.listener";
export class CdcReconsentModule {
    constructor(_cdcReconsentDialogEventListener) {
        // Intentional empty constructor
    }
}
CdcReconsentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentModule, deps: [{ token: i1.CdcReconsentDialogEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CdcReconsentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentModule, declarations: [CdcReconsentComponent], imports: [CommonModule,
        SpinnerModule,
        IconModule,
        I18nModule,
        KeyboardFocusModule,
        ConsentManagementModule], exports: [CdcReconsentComponent] });
CdcReconsentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentModule, providers: [provideDefaultConfig(defaultCdcReconsentLayoutConfig)], imports: [CommonModule,
        SpinnerModule,
        IconModule,
        I18nModule,
        KeyboardFocusModule,
        ConsentManagementModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideDefaultConfig(defaultCdcReconsentLayoutConfig)],
                    declarations: [CdcReconsentComponent],
                    exports: [CdcReconsentComponent],
                    imports: [
                        CommonModule,
                        SpinnerModule,
                        IconModule,
                        I18nModule,
                        KeyboardFocusModule,
                        ConsentManagementModule,
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i1.CdcReconsentDialogEventListener }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXJlY29uc2VudC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy91c2VyLWFjY291bnQvbG9naW4tZm9ybS9yZWNvbnNlbnQvY2RjLXJlY29uc2VudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixtQkFBbUIsRUFDbkIsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDMUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7OztBQWV4RixNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQ0UsZ0NBQWlFO1FBRWpFLGdDQUFnQztJQUNsQyxDQUFDOzsrR0FMVSxrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFYZCxxQkFBcUIsYUFHbEMsWUFBWTtRQUNaLGFBQWE7UUFDYixVQUFVO1FBQ1YsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQix1QkFBdUIsYUFQZixxQkFBcUI7Z0hBVXBCLGtCQUFrQixhQVpsQixDQUFDLG9CQUFvQixDQUFDLCtCQUErQixDQUFDLENBQUMsWUFJaEUsWUFBWTtRQUNaLGFBQWE7UUFDYixVQUFVO1FBQ1YsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQix1QkFBdUI7MkZBR2Qsa0JBQWtCO2tCQWI5QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLCtCQUErQixDQUFDLENBQUM7b0JBQ2xFLFlBQVksRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNyQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDaEMsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsbUJBQW1CO3dCQUNuQix1QkFBdUI7cUJBQ3hCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBDb25zZW50TWFuYWdlbWVudE1vZHVsZSxcbiAgSWNvbk1vZHVsZSxcbiAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENkY1JlY29uc2VudERpYWxvZ0V2ZW50TGlzdGVuZXIgfSBmcm9tICcuL2NkYy1yZWNvbnNlbnQtZGlhbG9ndWUtZXZlbnQubGlzdGVuZXInO1xuaW1wb3J0IHsgQ2RjUmVjb25zZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jZGMtcmVjb25zZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0Q2RjUmVjb25zZW50TGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWNkYy1yZWNvbnNlbnQtbGF5b3V0LmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW3Byb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRDZGNSZWNvbnNlbnRMYXlvdXRDb25maWcpXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2RjUmVjb25zZW50Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NkY1JlY29uc2VudENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgICBDb25zZW50TWFuYWdlbWVudE1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2RjUmVjb25zZW50TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgX2NkY1JlY29uc2VudERpYWxvZ0V2ZW50TGlzdGVuZXI6IENkY1JlY29uc2VudERpYWxvZ0V2ZW50TGlzdGVuZXJcbiAgKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxufVxuIl19