/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CpqConfiguratorRestInterceptor } from './cpq-configurator-rest.interceptor';
import { defaultCpqConfiguratorAuthConfig } from './default-cpq-configurator-auth.config';
import * as i0 from "@angular/core";
export class CpqConfiguratorInterceptorModule {
}
CpqConfiguratorInterceptorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInterceptorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorInterceptorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInterceptorModule, imports: [CommonModule] });
CpqConfiguratorInterceptorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInterceptorModule, providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CpqConfiguratorRestInterceptor,
            multi: true,
        },
        provideDefaultConfig(defaultCpqConfiguratorAuthConfig),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInterceptorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: CpqConfiguratorRestInterceptor,
                            multi: true,
                        },
                        provideDefaultConfig(defaultCpqConfiguratorAuthConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1pbnRlcmNlcHRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL3Jvb3QvY3BxL2ludGVyY2VwdG9yL2NwcS1jb25maWd1cmF0b3ItaW50ZXJjZXB0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFhMUYsTUFBTSxPQUFPLGdDQUFnQzs7NkhBQWhDLGdDQUFnQzs4SEFBaEMsZ0NBQWdDLFlBVmpDLFlBQVk7OEhBVVgsZ0NBQWdDLGFBVGhDO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNELG9CQUFvQixDQUFDLGdDQUFnQyxDQUFDO0tBQ3ZELFlBUlMsWUFBWTsyRkFVWCxnQ0FBZ0M7a0JBWDVDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsUUFBUSxFQUFFLDhCQUE4Qjs0QkFDeEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Qsb0JBQW9CLENBQUMsZ0NBQWdDLENBQUM7cUJBQ3ZEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvclJlc3RJbnRlcmNlcHRvciB9IGZyb20gJy4vY3BxLWNvbmZpZ3VyYXRvci1yZXN0LmludGVyY2VwdG9yJztcbmltcG9ydCB7IGRlZmF1bHRDcHFDb25maWd1cmF0b3JBdXRoQ29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWNwcS1jb25maWd1cmF0b3ItYXV0aC5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VDbGFzczogQ3BxQ29uZmlndXJhdG9yUmVzdEludGVyY2VwdG9yLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q3BxQ29uZmlndXJhdG9yQXV0aENvbmZpZyksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENwcUNvbmZpZ3VyYXRvckludGVyY2VwdG9yTW9kdWxlIHt9XG4iXX0=