/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CpqConfiguratorInteractiveModule } from './cpq-configurator-interactive.module';
import { CpqConfiguratorOverviewModule } from './cpq-configurator-overview.module';
import { CpqConfiguratorInterceptorModule } from './interceptor/cpq-configurator-interceptor.module';
import * as i0 from "@angular/core";
/**
 * Exposes the CPQ aspects that we need to load eagerly, like page mappings, routing
 * and interceptor related entities
 */
export class CpqConfiguratorRootModule {
}
CpqConfiguratorRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRootModule, imports: [CpqConfiguratorInteractiveModule,
        CpqConfiguratorOverviewModule,
        CpqConfiguratorInterceptorModule] });
CpqConfiguratorRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRootModule, providers: [provideDefaultConfig({ routing: { protected: true } })], imports: [CpqConfiguratorInteractiveModule,
        CpqConfiguratorOverviewModule,
        CpqConfiguratorInterceptorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CpqConfiguratorInteractiveModule,
                        CpqConfiguratorOverviewModule,
                        CpqConfiguratorInterceptorModule,
                    ],
                    //force early login
                    providers: [provideDefaultConfig({ routing: { protected: true } })],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC9jcHEvY3BxLWNvbmZpZ3VyYXRvci1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxtREFBbUQsQ0FBQzs7QUFFckc7OztHQUdHO0FBVUgsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCLFlBUGxDLGdDQUFnQztRQUNoQyw2QkFBNkI7UUFDN0IsZ0NBQWdDO3VIQUt2Qix5QkFBeUIsYUFGekIsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsWUFMakUsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtRQUM3QixnQ0FBZ0M7MkZBS3ZCLHlCQUF5QjtrQkFUckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZ0NBQWdDO3dCQUNoQyw2QkFBNkI7d0JBQzdCLGdDQUFnQztxQkFDakM7b0JBQ0QsbUJBQW1CO29CQUNuQixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3BFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvckludGVyYWN0aXZlTW9kdWxlIH0gZnJvbSAnLi9jcHEtY29uZmlndXJhdG9yLWludGVyYWN0aXZlLm1vZHVsZSc7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JPdmVydmlld01vZHVsZSB9IGZyb20gJy4vY3BxLWNvbmZpZ3VyYXRvci1vdmVydmlldy5tb2R1bGUnO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9ySW50ZXJjZXB0b3JNb2R1bGUgfSBmcm9tICcuL2ludGVyY2VwdG9yL2NwcS1jb25maWd1cmF0b3ItaW50ZXJjZXB0b3IubW9kdWxlJztcblxuLyoqXG4gKiBFeHBvc2VzIHRoZSBDUFEgYXNwZWN0cyB0aGF0IHdlIG5lZWQgdG8gbG9hZCBlYWdlcmx5LCBsaWtlIHBhZ2UgbWFwcGluZ3MsIHJvdXRpbmdcbiAqIGFuZCBpbnRlcmNlcHRvciByZWxhdGVkIGVudGl0aWVzXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDcHFDb25maWd1cmF0b3JJbnRlcmFjdGl2ZU1vZHVsZSxcbiAgICBDcHFDb25maWd1cmF0b3JPdmVydmlld01vZHVsZSxcbiAgICBDcHFDb25maWd1cmF0b3JJbnRlcmNlcHRvck1vZHVsZSxcbiAgXSxcbiAgLy9mb3JjZSBlYXJseSBsb2dpblxuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZyh7IHJvdXRpbmc6IHsgcHJvdGVjdGVkOiB0cnVlIH0gfSldLFxufSlcbmV4cG9ydCBjbGFzcyBDcHFDb25maWd1cmF0b3JSb290TW9kdWxlIHt9XG4iXX0=