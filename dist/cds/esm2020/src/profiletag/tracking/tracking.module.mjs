/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TrackingService } from './tracking.service';
import * as i0 from "@angular/core";
export class TrackingModule {
}
TrackingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TrackingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TrackingModule });
TrackingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingModule, providers: [
        {
            multi: true,
            provide: APP_INITIALIZER,
            useFactory: TrackingService.factory,
            deps: [TrackingService],
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            multi: true,
                            provide: APP_INITIALIZER,
                            useFactory: TrackingService.factory,
                            deps: [TrackingService],
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZHMvc3JjL3Byb2ZpbGV0YWcvdHJhY2tpbmcvdHJhY2tpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBWXJELE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWM7NEdBQWQsY0FBYyxhQVRkO1FBQ1Q7WUFDRSxLQUFLLEVBQUUsSUFBSTtZQUNYLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxlQUFlLENBQUMsT0FBTztZQUNuQyxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUM7U0FDeEI7S0FDRjsyRkFFVSxjQUFjO2tCQVYxQixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxLQUFLLEVBQUUsSUFBSTs0QkFDWCxPQUFPLEVBQUUsZUFBZTs0QkFDeEIsVUFBVSxFQUFFLGVBQWUsQ0FBQyxPQUFPOzRCQUNuQyxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUM7eUJBQ3hCO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnLi90cmFja2luZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICB1c2VGYWN0b3J5OiBUcmFja2luZ1NlcnZpY2UuZmFjdG9yeSxcbiAgICAgIGRlcHM6IFtUcmFja2luZ1NlcnZpY2VdLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRyYWNraW5nTW9kdWxlIHt9XG4iXX0=