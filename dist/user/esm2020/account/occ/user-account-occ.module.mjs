/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserAccountAdapter } from '@spartacus/user/account/core';
import { defaultOccUserAccountConfig } from './adapters/config/default-occ-user-account-endpoint.config';
import { OccUserAccountAdapter } from './adapters/occ-user-account.adapter';
import * as i0 from "@angular/core";
export class UserAccountOccModule {
}
UserAccountOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAccountOccModule });
UserAccountOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountOccModule, providers: [
        provideDefaultConfig(defaultOccUserAccountConfig),
        { provide: UserAccountAdapter, useClass: OccUserAccountAdapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountOccModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOccUserAccountConfig),
                        { provide: UserAccountAdapter, useClass: OccUserAccountAdapter },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hY2NvdW50LW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9hY2NvdW50L29jYy91c2VyLWFjY291bnQtb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN6RyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7QUFRNUUsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsYUFMcEI7UUFDVCxvQkFBb0IsQ0FBQywyQkFBMkIsQ0FBQztRQUNqRCxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUU7S0FDakU7MkZBRVUsb0JBQW9CO2tCQU5oQyxRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQywyQkFBMkIsQ0FBQzt3QkFDakQsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFO3FCQUNqRTtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyQWNjb3VudEFkYXB0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRPY2NVc2VyQWNjb3VudENvbmZpZyB9IGZyb20gJy4vYWRhcHRlcnMvY29uZmlnL2RlZmF1bHQtb2NjLXVzZXItYWNjb3VudC1lbmRwb2ludC5jb25maWcnO1xuaW1wb3J0IHsgT2NjVXNlckFjY291bnRBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtdXNlci1hY2NvdW50LmFkYXB0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0T2NjVXNlckFjY291bnRDb25maWcpLFxuICAgIHsgcHJvdmlkZTogVXNlckFjY291bnRBZGFwdGVyLCB1c2VDbGFzczogT2NjVXNlckFjY291bnRBZGFwdGVyIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJBY2NvdW50T2NjTW9kdWxlIHt9XG4iXX0=