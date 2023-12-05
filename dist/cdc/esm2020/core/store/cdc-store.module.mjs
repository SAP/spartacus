/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CdcAuthModule } from '../auth/cdc-auth.module';
import { CdcAuthService } from '../auth/facade/cdc-auth.service';
import { effects } from './effects/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
export class CdcStoreModule {
}
CdcStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcStoreModule, imports: [CommonModule, CdcAuthModule, i1.EffectsFeatureModule] });
CdcStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcStoreModule, providers: [CdcAuthService], imports: [CommonModule, CdcAuthModule, EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CdcAuthModule, EffectsModule.forFeature(effects)],
                    providers: [CdcAuthService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXN0b3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL2NvcmUvc3RvcmUvY2RjLXN0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBTTFDLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsWUFIZixZQUFZLEVBQUUsYUFBYTs0R0FHMUIsY0FBYyxhQUZkLENBQUMsY0FBYyxDQUFDLFlBRGpCLFlBQVksRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7MkZBRzdELGNBQWM7a0JBSjFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN6RSxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3RzTW9kdWxlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBDZGNBdXRoTW9kdWxlIH0gZnJvbSAnLi4vYXV0aC9jZGMtYXV0aC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2RjQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9hdXRoL2ZhY2FkZS9jZGMtYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IGVmZmVjdHMgfSBmcm9tICcuL2VmZmVjdHMvaW5kZXgnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDZGNBdXRoTW9kdWxlLCBFZmZlY3RzTW9kdWxlLmZvckZlYXR1cmUoZWZmZWN0cyldLFxuICBwcm92aWRlcnM6IFtDZGNBdXRoU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENkY1N0b3JlTW9kdWxlIHt9XG4iXX0=