/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideConfigValidator, provideDefaultConfig } from '@spartacus/core';
import { cdsConfigValidator, DEFAULT_CDS_CONFIG } from './config';
import { MerchandisingModule } from './merchandising';
import { ProfileTagModule, ProfileTagPushEventsService, TrackingModule, } from './profiletag';
import * as i0 from "@angular/core";
export class CdsModule {
    static forRoot(config) {
        return {
            ngModule: CdsModule,
            providers: [
                provideDefaultConfig(DEFAULT_CDS_CONFIG),
                provideDefaultConfig(config),
                provideConfigValidator(cdsConfigValidator),
                ProfileTagPushEventsService,
            ],
        };
    }
}
CdsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdsModule, imports: [ProfileTagModule, TrackingModule, MerchandisingModule] });
CdsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsModule, imports: [ProfileTagModule, TrackingModule, MerchandisingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ProfileTagModule, TrackingModule, MerchandisingModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RzL3NyYy9jZHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvRSxPQUFPLEVBQWEsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDN0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUNMLGdCQUFnQixFQUNoQiwyQkFBMkIsRUFDM0IsY0FBYyxHQUNmLE1BQU0sY0FBYyxDQUFDOztBQUt0QixNQUFNLE9BQU8sU0FBUztJQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWtCO1FBQy9CLE9BQU87WUFDTCxRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUU7Z0JBQ1Qsb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3hDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztnQkFDNUIsc0JBQXNCLENBQUMsa0JBQWtCLENBQUM7Z0JBQzFDLDJCQUEyQjthQUM1QjtTQUNGLENBQUM7SUFDSixDQUFDOztzR0FYVSxTQUFTO3VHQUFULFNBQVMsWUFGVixnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsbUJBQW1CO3VHQUVwRCxTQUFTLFlBRlYsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLG1CQUFtQjsyRkFFcEQsU0FBUztrQkFIckIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLENBQUM7aUJBQ2pFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVDb25maWdWYWxpZGF0b3IsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENkc0NvbmZpZywgY2RzQ29uZmlnVmFsaWRhdG9yLCBERUZBVUxUX0NEU19DT05GSUcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNZXJjaGFuZGlzaW5nTW9kdWxlIH0gZnJvbSAnLi9tZXJjaGFuZGlzaW5nJztcbmltcG9ydCB7XG4gIFByb2ZpbGVUYWdNb2R1bGUsXG4gIFByb2ZpbGVUYWdQdXNoRXZlbnRzU2VydmljZSxcbiAgVHJhY2tpbmdNb2R1bGUsXG59IGZyb20gJy4vcHJvZmlsZXRhZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtQcm9maWxlVGFnTW9kdWxlLCBUcmFja2luZ01vZHVsZSwgTWVyY2hhbmRpc2luZ01vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIENkc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IENkc0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2RzTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDZHNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgcHJvdmlkZURlZmF1bHRDb25maWcoREVGQVVMVF9DRFNfQ09ORklHKSxcbiAgICAgICAgcHJvdmlkZURlZmF1bHRDb25maWcoY29uZmlnKSxcbiAgICAgICAgcHJvdmlkZUNvbmZpZ1ZhbGlkYXRvcihjZHNDb25maWdWYWxpZGF0b3IpLFxuICAgICAgICBQcm9maWxlVGFnUHVzaEV2ZW50c1NlcnZpY2UsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==