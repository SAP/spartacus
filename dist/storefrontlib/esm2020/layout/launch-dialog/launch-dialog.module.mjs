/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { LayoutConfig } from '../config/layout-config';
import { InlineRenderStrategy, LaunchRenderStrategy, OutletRenderStrategy, RoutingRenderStrategy, } from './services/index';
import { InlineRootRenderStrategy } from './services/inline-root-render.strategy';
import * as i0 from "@angular/core";
export class LaunchDialogModule {
    static forRoot() {
        return {
            ngModule: LaunchDialogModule,
            providers: [{ provide: LayoutConfig, useExisting: Config }],
        };
    }
}
LaunchDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LaunchDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LaunchDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: LaunchDialogModule });
LaunchDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LaunchDialogModule, providers: [
        {
            provide: LaunchRenderStrategy,
            useExisting: OutletRenderStrategy,
            multi: true,
        },
        {
            provide: LaunchRenderStrategy,
            useExisting: InlineRenderStrategy,
            multi: true,
        },
        {
            provide: LaunchRenderStrategy,
            useExisting: RoutingRenderStrategy,
            multi: true,
        },
        {
            provide: LaunchRenderStrategy,
            useExisting: InlineRootRenderStrategy,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LaunchDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: LaunchRenderStrategy,
                            useExisting: OutletRenderStrategy,
                            multi: true,
                        },
                        {
                            provide: LaunchRenderStrategy,
                            useExisting: InlineRenderStrategy,
                            multi: true,
                        },
                        {
                            provide: LaunchRenderStrategy,
                            useExisting: RoutingRenderStrategy,
                            multi: true,
                        },
                        {
                            provide: LaunchRenderStrategy,
                            useExisting: InlineRootRenderStrategy,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWRpYWxvZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9sYXVuY2gtZGlhbG9nL2xhdW5jaC1kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsb0JBQW9CLEVBQ3BCLG9CQUFvQixFQUNwQixxQkFBcUIsR0FDdEIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUEwQmxGLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQzVELENBQUM7SUFDSixDQUFDOzsrR0FOVSxrQkFBa0I7Z0hBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGFBdkJsQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixXQUFXLEVBQUUsb0JBQW9CO1lBQ2pDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFdBQVcsRUFBRSxxQkFBcUI7WUFDbEMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRjsyRkFFVSxrQkFBa0I7a0JBeEI5QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsb0JBQW9COzRCQUM3QixXQUFXLEVBQUUsb0JBQW9COzRCQUNqQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsb0JBQW9COzRCQUM3QixXQUFXLEVBQUUsb0JBQW9COzRCQUNqQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsb0JBQW9COzRCQUM3QixXQUFXLEVBQUUscUJBQXFCOzRCQUNsQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsb0JBQW9COzRCQUM3QixXQUFXLEVBQUUsd0JBQXdCOzRCQUNyQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2xheW91dC1jb25maWcnO1xuaW1wb3J0IHtcbiAgSW5saW5lUmVuZGVyU3RyYXRlZ3ksXG4gIExhdW5jaFJlbmRlclN0cmF0ZWd5LFxuICBPdXRsZXRSZW5kZXJTdHJhdGVneSxcbiAgUm91dGluZ1JlbmRlclN0cmF0ZWd5LFxufSBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcbmltcG9ydCB7IElubGluZVJvb3RSZW5kZXJTdHJhdGVneSB9IGZyb20gJy4vc2VydmljZXMvaW5saW5lLXJvb3QtcmVuZGVyLnN0cmF0ZWd5JztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTGF1bmNoUmVuZGVyU3RyYXRlZ3ksXG4gICAgICB1c2VFeGlzdGluZzogT3V0bGV0UmVuZGVyU3RyYXRlZ3ksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IExhdW5jaFJlbmRlclN0cmF0ZWd5LFxuICAgICAgdXNlRXhpc3Rpbmc6IElubGluZVJlbmRlclN0cmF0ZWd5LFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBMYXVuY2hSZW5kZXJTdHJhdGVneSxcbiAgICAgIHVzZUV4aXN0aW5nOiBSb3V0aW5nUmVuZGVyU3RyYXRlZ3ksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IExhdW5jaFJlbmRlclN0cmF0ZWd5LFxuICAgICAgdXNlRXhpc3Rpbmc6IElubGluZVJvb3RSZW5kZXJTdHJhdGVneSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaERpYWxvZ01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TGF1bmNoRGlhbG9nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMYXVuY2hEaWFsb2dNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IExheW91dENvbmZpZywgdXNlRXhpc3Rpbmc6IENvbmZpZyB9XSxcbiAgICB9O1xuICB9XG59XG4iXX0=