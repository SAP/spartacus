/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';
import { ConfiguratorGroupModule } from '../group/configurator-group.module';
import { defaultConfiguratorConflictSolverLayoutConfig } from './default-configurator-conflict-solver-layout.config';
import * as i0 from "@angular/core";
import * as i1 from "./configurator-conflict-solver-dialog-launcher.service";
export class ConfiguratorConflictSolverDialogModule {
    constructor(_configuratorConflictSolverDialogLauncherService) {
        // Intentional empty constructor
    }
}
ConfiguratorConflictSolverDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogModule, deps: [{ token: i1.ConfiguratorConflictSolverDialogLauncherService }], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictSolverDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogModule, declarations: [ConfiguratorConflictSolverDialogComponent], imports: [CommonModule,
        IconModule,
        I18nModule,
        ConfiguratorGroupModule,
        KeyboardFocusModule], exports: [ConfiguratorConflictSolverDialogComponent] });
ConfiguratorConflictSolverDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogModule, providers: [
        provideDefaultConfig(defaultConfiguratorConflictSolverLayoutConfig),
    ], imports: [CommonModule,
        IconModule,
        I18nModule,
        ConfiguratorGroupModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        IconModule,
                        I18nModule,
                        ConfiguratorGroupModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultConfiguratorConflictSolverLayoutConfig),
                    ],
                    declarations: [ConfiguratorConflictSolverDialogComponent],
                    exports: [ConfiguratorConflictSolverDialogComponent],
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorConflictSolverDialogLauncherService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNvbmZsaWN0LXNvbHZlci1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2NvbmZsaWN0LXNvbHZlci1kaWFsb2cvY29uZmlndXJhdG9yLWNvbmZsaWN0LXNvbHZlci1kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBRTVHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw2Q0FBNkMsRUFBRSxNQUFNLHNEQUFzRCxDQUFDOzs7QUFnQnJILE1BQU0sT0FBTyxzQ0FBc0M7SUFDakQsWUFDRSxnREFBaUc7UUFFakcsZ0NBQWdDO0lBQ2xDLENBQUM7O21JQUxVLHNDQUFzQztvSUFBdEMsc0NBQXNDLGlCQUhsQyx5Q0FBeUMsYUFUdEQsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsdUJBQXVCO1FBQ3ZCLG1CQUFtQixhQU1YLHlDQUF5QztvSUFFeEMsc0NBQXNDLGFBTnRDO1FBQ1Qsb0JBQW9CLENBQUMsNkNBQTZDLENBQUM7S0FDcEUsWUFSQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVix1QkFBdUI7UUFDdkIsbUJBQW1COzJGQVFWLHNDQUFzQztrQkFkbEQsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsdUJBQXVCO3dCQUN2QixtQkFBbUI7cUJBQ3BCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyw2Q0FBNkMsQ0FBQztxQkFDcEU7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUNBQXlDLENBQUM7b0JBQ3pELE9BQU8sRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2lCQUNyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSwgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JDb25mbGljdFNvbHZlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWNvbmZsaWN0LXNvbHZlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNvbmZsaWN0U29sdmVyRGlhbG9nTGF1bmNoZXJTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0b3ItY29uZmxpY3Qtc29sdmVyLWRpYWxvZy1sYXVuY2hlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckdyb3VwTW9kdWxlIH0gZnJvbSAnLi4vZ3JvdXAvY29uZmlndXJhdG9yLWdyb3VwLm1vZHVsZSc7XG5pbXBvcnQgeyBkZWZhdWx0Q29uZmlndXJhdG9yQ29uZmxpY3RTb2x2ZXJMYXlvdXRDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtY29uZmlndXJhdG9yLWNvbmZsaWN0LXNvbHZlci1sYXlvdXQuY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yR3JvdXBNb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENvbmZpZ3VyYXRvckNvbmZsaWN0U29sdmVyTGF5b3V0Q29uZmlnKSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yQ29uZmxpY3RTb2x2ZXJEaWFsb2dDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yQ29uZmxpY3RTb2x2ZXJEaWFsb2dDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JDb25mbGljdFNvbHZlckRpYWxvZ01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIF9jb25maWd1cmF0b3JDb25mbGljdFNvbHZlckRpYWxvZ0xhdW5jaGVyU2VydmljZTogQ29uZmlndXJhdG9yQ29uZmxpY3RTb2x2ZXJEaWFsb2dMYXVuY2hlclNlcnZpY2VcbiAgKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxufVxuIl19