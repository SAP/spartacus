/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ComponentFactoryResolver, NgModule, Optional, } from '@angular/core';
import { MODULE_INITIALIZER } from '@spartacus/core';
import { OutletDirective } from './outlet.directive';
import { OutletPosition } from './outlet.model';
import { PROVIDE_OUTLET_OPTIONS, } from './outlet.providers';
import { OutletService } from './outlet.service';
import * as i0 from "@angular/core";
/**
 * @private
 */
export function registerOutletsFactory(providedOutletOptions, componentFactoryResolver, outletService) {
    const result = () => {
        (providedOutletOptions ?? []).forEach((options) => {
            const factory = componentFactoryResolver.resolveComponentFactory(options.component);
            outletService.add(options.id, factory, options.position ?? OutletPosition.AFTER);
        });
    };
    return result;
}
export class OutletModule {
    static forRoot() {
        return {
            ngModule: OutletModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: registerOutletsFactory,
                    deps: [
                        [new Optional(), PROVIDE_OUTLET_OPTIONS],
                        ComponentFactoryResolver,
                        OutletService,
                    ],
                    multi: true,
                },
            ],
        };
    }
    static forChild() {
        return {
            ngModule: OutletModule,
            providers: [
                {
                    provide: MODULE_INITIALIZER,
                    useFactory: registerOutletsFactory,
                    deps: [
                        [new Optional(), PROVIDE_OUTLET_OPTIONS],
                        ComponentFactoryResolver,
                        OutletService,
                    ],
                    multi: true,
                },
            ],
        };
    }
}
OutletModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OutletModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OutletModule, declarations: [OutletDirective], imports: [CommonModule], exports: [OutletDirective] });
OutletModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [OutletDirective],
                    exports: [OutletDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9vdXRsZXQvb3V0bGV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxlQUFlLEVBRWYsd0JBQXdCLEVBRXhCLFFBQVEsRUFDUixRQUFRLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBRUwsc0JBQXNCLEdBQ3ZCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQUVqRDs7R0FFRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FDcEMscUJBQTZDLEVBQzdDLHdCQUFrRCxFQUNsRCxhQUF5RDtJQUV6RCxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUU7UUFDbEIsQ0FBQyxxQkFBcUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNoRCxNQUFNLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDOUQsT0FBTyxDQUFDLFNBQVMsQ0FDbEIsQ0FBQztZQUNGLGFBQWEsQ0FBQyxHQUFHLENBQ2YsT0FBTyxDQUFDLEVBQUUsRUFDVixPQUFPLEVBQ1AsT0FBTyxDQUFDLFFBQVEsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUN6QyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBT0QsTUFBTSxPQUFPLFlBQVk7SUFDdkIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsc0JBQXNCO29CQUNsQyxJQUFJLEVBQUU7d0JBQ0osQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLHNCQUFzQixDQUFDO3dCQUN4Qyx3QkFBd0I7d0JBQ3hCLGFBQWE7cUJBQ2Q7b0JBQ0QsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDYixPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLFVBQVUsRUFBRSxzQkFBc0I7b0JBQ2xDLElBQUksRUFBRTt3QkFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsc0JBQXNCLENBQUM7d0JBQ3hDLHdCQUF3Qjt3QkFDeEIsYUFBYTtxQkFDZDtvQkFDRCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O3lHQW5DVSxZQUFZOzBHQUFaLFlBQVksaUJBSFIsZUFBZSxhQURwQixZQUFZLGFBRVosZUFBZTswR0FFZCxZQUFZLFlBSmIsWUFBWTsyRkFJWCxZQUFZO2tCQUx4QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMvQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFQUF9JTklUSUFMSVpFUixcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZSxcbiAgT3B0aW9uYWwsXG4gIFR5cGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTU9EVUxFX0lOSVRJQUxJWkVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE91dGxldERpcmVjdGl2ZSB9IGZyb20gJy4vb3V0bGV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPdXRsZXRQb3NpdGlvbiB9IGZyb20gJy4vb3V0bGV0Lm1vZGVsJztcbmltcG9ydCB7XG4gIFByb3ZpZGVPdXRsZXRPcHRpb25zLFxuICBQUk9WSURFX09VVExFVF9PUFRJT05TLFxufSBmcm9tICcuL291dGxldC5wcm92aWRlcnMnO1xuaW1wb3J0IHsgT3V0bGV0U2VydmljZSB9IGZyb20gJy4vb3V0bGV0LnNlcnZpY2UnO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck91dGxldHNGYWN0b3J5KFxuICBwcm92aWRlZE91dGxldE9wdGlvbnM6IFByb3ZpZGVPdXRsZXRPcHRpb25zW10sXG4gIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBvdXRsZXRTZXJ2aWNlOiBPdXRsZXRTZXJ2aWNlPENvbXBvbmVudEZhY3Rvcnk8VHlwZTxhbnk+Pj5cbik6ICgpID0+IHZvaWQge1xuICBjb25zdCByZXN1bHQgPSAoKSA9PiB7XG4gICAgKHByb3ZpZGVkT3V0bGV0T3B0aW9ucyA/PyBbXSkuZm9yRWFjaCgob3B0aW9ucykgPT4ge1xuICAgICAgY29uc3QgZmFjdG9yeSA9IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgICAgb3B0aW9ucy5jb21wb25lbnRcbiAgICAgICk7XG4gICAgICBvdXRsZXRTZXJ2aWNlLmFkZChcbiAgICAgICAgb3B0aW9ucy5pZCxcbiAgICAgICAgZmFjdG9yeSxcbiAgICAgICAgb3B0aW9ucy5wb3NpdGlvbiA/PyBPdXRsZXRQb3NpdGlvbi5BRlRFUlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW091dGxldERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtPdXRsZXREaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBPdXRsZXRNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE91dGxldE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogT3V0bGV0TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogcmVnaXN0ZXJPdXRsZXRzRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICBbbmV3IE9wdGlvbmFsKCksIFBST1ZJREVfT1VUTEVUX09QVElPTlNdLFxuICAgICAgICAgICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgT3V0bGV0U2VydmljZSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8T3V0bGV0TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBPdXRsZXRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1PRFVMRV9JTklUSUFMSVpFUixcbiAgICAgICAgICB1c2VGYWN0b3J5OiByZWdpc3Rlck91dGxldHNGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIFtuZXcgT3B0aW9uYWwoKSwgUFJPVklERV9PVVRMRVRfT1BUSU9OU10sXG4gICAgICAgICAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICBPdXRsZXRTZXJ2aWNlLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==