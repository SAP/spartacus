/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorOverviewFilterModule } from '../overview-filter/configurator-overview-filter.module';
import { ConfiguratorOverviewFilterDialogComponent } from './configurator-overview-filter-dialog.component';
import { defaultConfiguratorOverviewFilterDialogLayoutConfig } from './default-configurator-overview-filer-dialog-layout.config';
import * as i0 from "@angular/core";
export class ConfiguratorOverviewFilterDialogModule {
}
ConfiguratorOverviewFilterDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFilterDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogModule, declarations: [ConfiguratorOverviewFilterDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        ConfiguratorOverviewFilterModule,
        KeyboardFocusModule], exports: [ConfiguratorOverviewFilterDialogComponent] });
ConfiguratorOverviewFilterDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogModule, providers: [
        provideDefaultConfig(defaultConfiguratorOverviewFilterDialogLayoutConfig),
    ], imports: [CommonModule,
        I18nModule,
        IconModule,
        ConfiguratorOverviewFilterModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        ConfiguratorOverviewFilterModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultConfiguratorOverviewFilterDialogLayoutConfig),
                    ],
                    declarations: [ConfiguratorOverviewFilterDialogComponent],
                    exports: [ConfiguratorOverviewFilterDialogComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZpbHRlci1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LWZpbHRlci1kaWFsb2cvY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZpbHRlci1kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzVHLE9BQU8sRUFBRSxtREFBbUQsRUFBRSxNQUFNLDREQUE0RCxDQUFDOztBQWdCakksTUFBTSxPQUFPLHNDQUFzQzs7bUlBQXRDLHNDQUFzQztvSUFBdEMsc0NBQXNDLGlCQUhsQyx5Q0FBeUMsYUFUdEQsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsZ0NBQWdDO1FBQ2hDLG1CQUFtQixhQU1YLHlDQUF5QztvSUFFeEMsc0NBQXNDLGFBTnRDO1FBQ1Qsb0JBQW9CLENBQUMsbURBQW1ELENBQUM7S0FDMUUsWUFSQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixnQ0FBZ0M7UUFDaEMsbUJBQW1COzJGQVFWLHNDQUFzQztrQkFkbEQsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsZ0NBQWdDO3dCQUNoQyxtQkFBbUI7cUJBQ3BCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxtREFBbUQsQ0FBQztxQkFDMUU7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUNBQXlDLENBQUM7b0JBQ3pELE9BQU8sRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2lCQUNyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSwgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlck1vZHVsZSB9IGZyb20gJy4uL292ZXJ2aWV3LWZpbHRlci9jb25maWd1cmF0b3Itb3ZlcnZpZXctZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZpbHRlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckRpYWxvZ0xheW91dENvbmZpZyB9IGZyb20gJy4vZGVmYXVsdC1jb25maWd1cmF0b3Itb3ZlcnZpZXctZmlsZXItZGlhbG9nLWxheW91dC5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlck1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlndXJhdG9yT3ZlcnZpZXdGaWx0ZXJEaWFsb2dMYXlvdXRDb25maWcpLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckRpYWxvZ0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckRpYWxvZ0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvck92ZXJ2aWV3RmlsdGVyRGlhbG9nTW9kdWxlIHt9XG4iXX0=