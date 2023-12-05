/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { defaultLayoutConfig } from './config/default-layout.config';
import { DirectionModule } from './direction/direction.module';
import { LaunchDialogModule } from './launch-dialog/index';
import { ThemeModule } from './theme/theme.module';
import * as i0 from "@angular/core";
import * as i1 from "./launch-dialog/launch-dialog.module";
export class LayoutModule {
}
LayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: LayoutModule, imports: [OutletRefModule, i1.LaunchDialogModule, DirectionModule,
        ThemeModule], exports: [OutletRefModule] });
LayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LayoutModule, providers: [provideDefaultConfig(defaultLayoutConfig)], imports: [OutletRefModule,
        LaunchDialogModule.forRoot(),
        DirectionModule,
        ThemeModule, OutletRefModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        OutletRefModule,
                        LaunchDialogModule.forRoot(),
                        DirectionModule,
                        ThemeModule,
                    ],
                    providers: [provideDefaultConfig(defaultLayoutConfig)],
                    exports: [OutletRefModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2xheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQVluRCxNQUFNLE9BQU8sWUFBWTs7eUdBQVosWUFBWTswR0FBWixZQUFZLFlBUnJCLGVBQWUseUJBRWYsZUFBZTtRQUNmLFdBQVcsYUFHSCxlQUFlOzBHQUVkLFlBQVksYUFIWixDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLENBQUMsWUFMcEQsZUFBZTtRQUNmLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtRQUM1QixlQUFlO1FBQ2YsV0FBVyxFQUdILGVBQWU7MkZBRWQsWUFBWTtrQkFWeEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7d0JBQzVCLGVBQWU7d0JBQ2YsV0FBVztxQkFDWjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUN0RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE91dGxldFJlZk1vZHVsZSB9IGZyb20gJy4uL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC1yZWYvb3V0bGV0LXJlZi5tb2R1bGUnO1xuaW1wb3J0IHsgZGVmYXVsdExheW91dENvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtbGF5b3V0LmNvbmZpZyc7XG5pbXBvcnQgeyBEaXJlY3Rpb25Nb2R1bGUgfSBmcm9tICcuL2RpcmVjdGlvbi9kaXJlY3Rpb24ubW9kdWxlJztcbmltcG9ydCB7IExhdW5jaERpYWxvZ01vZHVsZSB9IGZyb20gJy4vbGF1bmNoLWRpYWxvZy9pbmRleCc7XG5pbXBvcnQgeyBUaGVtZU1vZHVsZSB9IGZyb20gJy4vdGhlbWUvdGhlbWUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE91dGxldFJlZk1vZHVsZSxcbiAgICBMYXVuY2hEaWFsb2dNb2R1bGUuZm9yUm9vdCgpLFxuICAgIERpcmVjdGlvbk1vZHVsZSxcbiAgICBUaGVtZU1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdExheW91dENvbmZpZyldLFxuICBleHBvcnRzOiBbT3V0bGV0UmVmTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0TW9kdWxlIHt9XG4iXX0=