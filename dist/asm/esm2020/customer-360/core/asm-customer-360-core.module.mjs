/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { AsmCustomer360Connector } from './connectors';
import { facadeProviders } from './facade/facade-providers';
import { StoreFinderModule } from '@spartacus/storefinder';
import * as i0 from "@angular/core";
export class AsmCustomer360CoreModule {
}
AsmCustomer360CoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360CoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CoreModule, imports: [StoreFinderModule] });
AsmCustomer360CoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CoreModule, providers: [AsmCustomer360Connector, ...facadeProviders], imports: [StoreFinderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [StoreFinderModule],
                    providers: [AsmCustomer360Connector, ...facadeProviders],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY3VzdG9tZXItMzYwL2NvcmUvYXNtLWN1c3RvbWVyLTM2MC1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQU0zRCxNQUFNLE9BQU8sd0JBQXdCOztxSEFBeEIsd0JBQXdCO3NIQUF4Qix3QkFBd0IsWUFIekIsaUJBQWlCO3NIQUdoQix3QkFBd0IsYUFGeEIsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLGVBQWUsQ0FBQyxZQUQ5QyxpQkFBaUI7MkZBR2hCLHdCQUF3QjtrQkFKcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDNUIsU0FBUyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxlQUFlLENBQUM7aUJBQ3pEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzJztcbmltcG9ydCB7IGZhY2FkZVByb3ZpZGVycyB9IGZyb20gJy4vZmFjYWRlL2ZhY2FkZS1wcm92aWRlcnMnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZmluZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1N0b3JlRmluZGVyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbQXNtQ3VzdG9tZXIzNjBDb25uZWN0b3IsIC4uLmZhY2FkZVByb3ZpZGVyc10sXG59KVxuZXhwb3J0IGNsYXNzIEFzbUN1c3RvbWVyMzYwQ29yZU1vZHVsZSB7fVxuIl19