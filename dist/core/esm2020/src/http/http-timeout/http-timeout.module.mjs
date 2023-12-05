/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '../../config/config-providers';
import { defaultBackendHttpTimeoutConfig } from './default-http-timeout.config';
import { HttpTimeoutInterceptor } from './http-timeout.interceptor';
import * as i0 from "@angular/core";
export class HttpTimeoutModule {
}
HttpTimeoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HttpTimeoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
HttpTimeoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: HttpTimeoutModule });
HttpTimeoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HttpTimeoutModule, providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: HttpTimeoutInterceptor,
            multi: true,
        },
        provideDefaultConfig(defaultBackendHttpTimeoutConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HttpTimeoutModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: HttpTimeoutInterceptor,
                            multi: true,
                        },
                        provideDefaultConfig(defaultBackendHttpTimeoutConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC10aW1lb3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2h0dHAvaHR0cC10aW1lb3V0L2h0dHAtdGltZW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDckUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBWXBFLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGFBVGpCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNELG9CQUFvQixDQUFDLCtCQUErQixDQUFDO0tBQ3REOzJGQUVVLGlCQUFpQjtrQkFWN0IsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLHNCQUFzQjs0QkFDbkMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Qsb0JBQW9CLENBQUMsK0JBQStCLENBQUM7cUJBQ3REO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnLXByb3ZpZGVycyc7XG5pbXBvcnQgeyBkZWZhdWx0QmFja2VuZEh0dHBUaW1lb3V0Q29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWh0dHAtdGltZW91dC5jb25maWcnO1xuaW1wb3J0IHsgSHR0cFRpbWVvdXRJbnRlcmNlcHRvciB9IGZyb20gJy4vaHR0cC10aW1lb3V0LmludGVyY2VwdG9yJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogSHR0cFRpbWVvdXRJbnRlcmNlcHRvcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdEJhY2tlbmRIdHRwVGltZW91dENvbmZpZyksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEh0dHBUaW1lb3V0TW9kdWxlIHt9XG4iXX0=