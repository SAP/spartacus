/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultSmartEditConfig } from './config/default-smart-edit-config';
import { interceptors } from './http-interceptors/index';
import { SmartEditLauncherService } from './services/smart-edit-launcher.service';
import * as i0 from "@angular/core";
export function smartEditFactory(smartEditLauncherService) {
    const isReady = () => {
        smartEditLauncherService.load();
    };
    return isReady;
}
export class SmartEditRootModule {
}
SmartEditRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SmartEditRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SmartEditRootModule });
SmartEditRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditRootModule, providers: [
        ...interceptors,
        provideDefaultConfig(defaultSmartEditConfig),
        {
            provide: APP_INITIALIZER,
            useFactory: smartEditFactory,
            deps: [SmartEditLauncherService],
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...interceptors,
                        provideDefaultConfig(defaultSmartEditConfig),
                        {
                            provide: APP_INITIALIZER,
                            useFactory: smartEditFactory,
                            deps: [SmartEditLauncherService],
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtZWRpdC1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9zbWFydGVkaXQvcm9vdC9zbWFydC1lZGl0LXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0FBRWxGLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDOUIsd0JBQWtEO0lBRWxELE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtRQUNuQix3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFDRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBY0QsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUIsYUFYbkI7UUFDVCxHQUFHLFlBQVk7UUFDZixvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQztRQUM1QztZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxnQkFBZ0I7WUFDNUIsSUFBSSxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDaEMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGOzJGQUVVLG1CQUFtQjtrQkFaL0IsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxZQUFZO3dCQUNmLG9CQUFvQixDQUFDLHNCQUFzQixDQUFDO3dCQUM1Qzs0QkFDRSxPQUFPLEVBQUUsZUFBZTs0QkFDeEIsVUFBVSxFQUFFLGdCQUFnQjs0QkFDNUIsSUFBSSxFQUFFLENBQUMsd0JBQXdCLENBQUM7NEJBQ2hDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZGVmYXVsdFNtYXJ0RWRpdENvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtc21hcnQtZWRpdC1jb25maWcnO1xuaW1wb3J0IHsgaW50ZXJjZXB0b3JzIH0gZnJvbSAnLi9odHRwLWludGVyY2VwdG9ycy9pbmRleCc7XG5pbXBvcnQgeyBTbWFydEVkaXRMYXVuY2hlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3NtYXJ0LWVkaXQtbGF1bmNoZXIuc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzbWFydEVkaXRGYWN0b3J5KFxuICBzbWFydEVkaXRMYXVuY2hlclNlcnZpY2U6IFNtYXJ0RWRpdExhdW5jaGVyU2VydmljZVxuKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IGlzUmVhZHkgPSAoKSA9PiB7XG4gICAgc21hcnRFZGl0TGF1bmNoZXJTZXJ2aWNlLmxvYWQoKTtcbiAgfTtcbiAgcmV0dXJuIGlzUmVhZHk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIC4uLmludGVyY2VwdG9ycyxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0U21hcnRFZGl0Q29uZmlnKSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICB1c2VGYWN0b3J5OiBzbWFydEVkaXRGYWN0b3J5LFxuICAgICAgZGVwczogW1NtYXJ0RWRpdExhdW5jaGVyU2VydmljZV0sXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTbWFydEVkaXRSb290TW9kdWxlIHt9XG4iXX0=