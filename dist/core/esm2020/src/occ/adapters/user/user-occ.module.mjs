/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnonymousConsentTemplatesAdapter } from '../../../anonymous-consents/connectors/anonymous-consent-templates.adapter';
import { ANONYMOUS_CONSENT_NORMALIZER } from '../../../anonymous-consents/connectors/converters';
import { provideDefaultConfig } from '../../../config/config-providers';
import { ADDRESS_LIST_NORMALIZER } from '../../../user/connectors/address/converters';
import { UserAddressAdapter } from '../../../user/connectors/address/user-address.adapter';
import { UserConsentAdapter } from '../../../user/connectors/consent/user-consent.adapter';
import { UserCostCenterAdapter } from '../../../user/connectors/cost-center/user-cost-center.adapter';
import { CustomerCouponAdapter } from '../../../user/connectors/customer-coupon/customer-coupon.adapter';
import { PRODUCT_INTERESTS_NORMALIZER } from '../../../user/connectors/interests/converters';
import { UserInterestsAdapter } from '../../../user/connectors/interests/user-interests.adapter';
import { UserNotificationPreferenceAdapter } from '../../../user/connectors/notification-preference/user-notification-preference.adapter';
import { UserPaymentAdapter } from '../../../user/connectors/payment/user-payment.adapter';
import { AnonymousConsentNormalizer } from './converters/anonymous-consents-normalizer';
import { OccAddressListNormalizer } from './converters/occ-address-list-normalizer';
import { OccUserInterestsNormalizer } from './converters/occ-user-interests-normalizer';
import { defaultOccUserConfig } from './default-occ-user-config';
import { OccAnonymousConsentTemplatesAdapter } from './occ-anonymous-consent-templates.adapter';
import { OccCustomerCouponAdapter } from './occ-customer-coupon.adapter';
import { OccUserAddressAdapter } from './occ-user-address.adapter';
import { OccUserConsentAdapter } from './occ-user-consent.adapter';
import { OccUserCostCenterAdapter } from './occ-user-cost-centers.adapter';
import { OccUserInterestsAdapter } from './occ-user-interests.adapter';
import { OccUserNotificationPreferenceAdapter } from './occ-user-notification-preference.adapter';
import { OccUserPaymentAdapter } from './occ-user-payment.adapter';
import * as i0 from "@angular/core";
export class UserOccModule {
}
UserOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserOccModule, imports: [CommonModule] });
UserOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserOccModule, providers: [
        provideDefaultConfig(defaultOccUserConfig),
        { provide: UserAddressAdapter, useClass: OccUserAddressAdapter },
        { provide: UserConsentAdapter, useClass: OccUserConsentAdapter },
        {
            provide: AnonymousConsentTemplatesAdapter,
            useClass: OccAnonymousConsentTemplatesAdapter,
        },
        {
            provide: UserPaymentAdapter,
            useClass: OccUserPaymentAdapter,
        },
        { provide: CustomerCouponAdapter, useClass: OccCustomerCouponAdapter },
        {
            provide: UserNotificationPreferenceAdapter,
            useClass: OccUserNotificationPreferenceAdapter,
        },
        { provide: UserInterestsAdapter, useClass: OccUserInterestsAdapter },
        { provide: UserCostCenterAdapter, useClass: OccUserCostCenterAdapter },
        {
            provide: PRODUCT_INTERESTS_NORMALIZER,
            useExisting: OccUserInterestsNormalizer,
            multi: true,
        },
        {
            provide: ANONYMOUS_CONSENT_NORMALIZER,
            useExisting: AnonymousConsentNormalizer,
            multi: true,
        },
        {
            provide: ADDRESS_LIST_NORMALIZER,
            useExisting: OccAddressListNormalizer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccUserConfig),
                        { provide: UserAddressAdapter, useClass: OccUserAddressAdapter },
                        { provide: UserConsentAdapter, useClass: OccUserConsentAdapter },
                        {
                            provide: AnonymousConsentTemplatesAdapter,
                            useClass: OccAnonymousConsentTemplatesAdapter,
                        },
                        {
                            provide: UserPaymentAdapter,
                            useClass: OccUserPaymentAdapter,
                        },
                        { provide: CustomerCouponAdapter, useClass: OccCustomerCouponAdapter },
                        {
                            provide: UserNotificationPreferenceAdapter,
                            useClass: OccUserNotificationPreferenceAdapter,
                        },
                        { provide: UserInterestsAdapter, useClass: OccUserInterestsAdapter },
                        { provide: UserCostCenterAdapter, useClass: OccUserCostCenterAdapter },
                        {
                            provide: PRODUCT_INTERESTS_NORMALIZER,
                            useExisting: OccUserInterestsNormalizer,
                            multi: true,
                        },
                        {
                            provide: ANONYMOUS_CONSENT_NORMALIZER,
                            useExisting: AnonymousConsentNormalizer,
                            multi: true,
                        },
                        {
                            provide: ADDRESS_LIST_NORMALIZER,
                            useExisting: OccAddressListNormalizer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1vY2MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL2FkYXB0ZXJzL3VzZXIvdXNlci1vY2MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQztBQUM5SCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUMzRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUN0RyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUN6RyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM3RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1RkFBdUYsQ0FBQztBQUMxSSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNw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QixFQUFFO3dCQUN0RTs0QkFDRSxPQUFPLEVBQUUsNEJBQTRCOzRCQUNyQyxXQUFXLEVBQUUsMEJBQTBCOzRCQUN2QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsNEJBQTRCOzRCQUNyQyxXQUFXLEVBQUUsMEJBQTBCOzRCQUN2QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsdUJBQXVCOzRCQUNoQyxXQUFXLEVBQUUsd0JBQXdCOzRCQUNyQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5vbnltb3VzQ29uc2VudFRlbXBsYXRlc0FkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi9hbm9ueW1vdXMtY29uc2VudHMvY29ubmVjdG9ycy9hbm9ueW1vdXMtY29uc2VudC10ZW1wbGF0ZXMuYWRhcHRlcic7XG5pbXBvcnQgeyBBTk9OWU1PVVNfQ09OU0VOVF9OT1JNQUxJWkVSIH0gZnJvbSAnLi4vLi4vLi4vYW5vbnltb3VzLWNvbnNlbnRzL2Nvbm5lY3RvcnMvY29udmVydGVycyc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZy9jb25maWctcHJvdmlkZXJzJztcbmltcG9ydCB7IEFERFJFU1NfTElTVF9OT1JNQUxJWkVSIH0gZnJvbSAnLi4vLi4vLi4vdXNlci9jb25uZWN0b3JzL2FkZHJlc3MvY29udmVydGVycyc7XG5pbXBvcnQgeyBVc2VyQWRkcmVzc0FkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91c2VyL2Nvbm5lY3RvcnMvYWRkcmVzcy91c2VyLWFkZHJlc3MuYWRhcHRlcic7XG5pbXBvcnQgeyBVc2VyQ29uc2VudEFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91c2VyL2Nvbm5lY3RvcnMvY29uc2VudC91c2VyLWNvbnNlbnQuYWRhcHRlcic7XG5pbXBvcnQgeyBVc2VyQ29zdENlbnRlckFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91c2VyL2Nvbm5lY3RvcnMvY29zdC1jZW50ZXIvdXNlci1jb3N0LWNlbnRlci5hZGFwdGVyJztcbmltcG9ydCB7IEN1c3RvbWVyQ291cG9uQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3VzZXIvY29ubmVjdG9ycy9jdXN0b21lci1jb3Vwb24vY3VzdG9tZXItY291cG9uLmFkYXB0ZXInO1xuaW1wb3J0IHsgUFJPRFVDVF9JTlRFUkVTVFNfTk9STUFMSVpFUiB9IGZyb20gJy4uLy4uLy4uL3VzZXIvY29ubmVjdG9ycy9pbnRlcmVzdHMvY29udmVydGVycyc7XG5pbXBvcnQgeyBVc2VySW50ZXJlc3RzQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3VzZXIvY29ubmVjdG9ycy9pbnRlcmVzdHMvdXNlci1pbnRlcmVzdHMuYWRhcHRlcic7XG5pbXBvcnQgeyBVc2VyTm90aWZpY2F0aW9uUHJlZmVyZW5jZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91c2VyL2Nvbm5lY3RvcnMvbm90aWZpY2F0aW9uLXByZWZlcmVuY2UvdXNlci1ub3RpZmljYXRpb24tcHJlZmVyZW5jZS5hZGFwdGVyJztcbmltcG9ydCB7IFVzZXJQYXltZW50QWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3VzZXIvY29ubmVjdG9ycy9wYXltZW50L3VzZXItcGF5bWVudC5hZGFwdGVyJztcbmltcG9ydCB7IEFub255bW91c0NvbnNlbnROb3JtYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL2Fub255bW91cy1jb25zZW50cy1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY0FkZHJlc3NMaXN0Tm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtYWRkcmVzcy1saXN0LW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjVXNlckludGVyZXN0c05vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLXVzZXItaW50ZXJlc3RzLW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY1VzZXJDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtb2NjLXVzZXItY29uZmlnJztcbmltcG9ydCB7IE9jY0Fub255bW91c0NvbnNlbnRUZW1wbGF0ZXNBZGFwdGVyIH0gZnJvbSAnLi9vY2MtYW5vbnltb3VzLWNvbnNlbnQtdGVtcGxhdGVzLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjQ3VzdG9tZXJDb3Vwb25BZGFwdGVyIH0gZnJvbSAnLi9vY2MtY3VzdG9tZXItY291cG9uLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjVXNlckFkZHJlc3NBZGFwdGVyIH0gZnJvbSAnLi9vY2MtdXNlci1hZGRyZXNzLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjVXNlckNvbnNlbnRBZGFwdGVyIH0gZnJvbSAnLi9vY2MtdXNlci1jb25zZW50LmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjVXNlckNvc3RDZW50ZXJBZGFwdGVyIH0gZnJvbSAnLi9vY2MtdXNlci1jb3N0LWNlbnRlcnMuYWRhcHRlcic7XG5pbXBvcnQgeyBPY2NVc2VySW50ZXJlc3RzQWRhcHRlciB9IGZyb20gJy4vb2NjLXVzZXItaW50ZXJlc3RzLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjVXNlck5vdGlmaWNhdGlvblByZWZlcmVuY2VBZGFwdGVyIH0gZnJvbSAnLi9vY2MtdXNlci1ub3RpZmljYXRpb24tcHJlZmVyZW5jZS5hZGFwdGVyJztcbmltcG9ydCB7IE9jY1VzZXJQYXltZW50QWRhcHRlciB9IGZyb20gJy4vb2NjLXVzZXItcGF5bWVudC5hZGFwdGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPY2NVc2VyQ29uZmlnKSxcbiAgICB7IHByb3ZpZGU6IFVzZXJBZGRyZXNzQWRhcHRlciwgdXNlQ2xhc3M6IE9jY1VzZXJBZGRyZXNzQWRhcHRlciB9LFxuICAgIHsgcHJvdmlkZTogVXNlckNvbnNlbnRBZGFwdGVyLCB1c2VDbGFzczogT2NjVXNlckNvbnNlbnRBZGFwdGVyIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQW5vbnltb3VzQ29uc2VudFRlbXBsYXRlc0FkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjQW5vbnltb3VzQ29uc2VudFRlbXBsYXRlc0FkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBVc2VyUGF5bWVudEFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjVXNlclBheW1lbnRBZGFwdGVyLFxuICAgIH0sXG4gICAgeyBwcm92aWRlOiBDdXN0b21lckNvdXBvbkFkYXB0ZXIsIHVzZUNsYXNzOiBPY2NDdXN0b21lckNvdXBvbkFkYXB0ZXIgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBVc2VyTm90aWZpY2F0aW9uUHJlZmVyZW5jZUFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjVXNlck5vdGlmaWNhdGlvblByZWZlcmVuY2VBZGFwdGVyLFxuICAgIH0sXG4gICAgeyBwcm92aWRlOiBVc2VySW50ZXJlc3RzQWRhcHRlciwgdXNlQ2xhc3M6IE9jY1VzZXJJbnRlcmVzdHNBZGFwdGVyIH0sXG4gICAgeyBwcm92aWRlOiBVc2VyQ29zdENlbnRlckFkYXB0ZXIsIHVzZUNsYXNzOiBPY2NVc2VyQ29zdENlbnRlckFkYXB0ZXIgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQUk9EVUNUX0lOVEVSRVNUU19OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY1VzZXJJbnRlcmVzdHNOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBTk9OWU1PVVNfQ09OU0VOVF9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IEFub255bW91c0NvbnNlbnROb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBRERSRVNTX0xJU1RfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NBZGRyZXNzTGlzdE5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyT2NjTW9kdWxlIHt9XG4iXX0=