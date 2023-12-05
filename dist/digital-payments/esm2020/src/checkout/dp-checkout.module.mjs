/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { occDigitalPaymentsConfig } from './adapters/config/occ-digital-payments-endpoint.config';
import { DP_DETAILS_NORMALIZER, DP_REQUEST_NORMALIZER, } from './adapters/converters';
import { DigitalPaymentsAdapter } from './adapters/digital-payments.adapter';
import { OccDpDetailsNormalizer } from './adapters/occ-digital-payment-details.normalizer';
import { OccDpRequestNormalizer } from './adapters/occ-digital-payment-request.normalizer';
import { OccDigitalPaymentsAdapter } from './adapters/occ-digital-payments.adapter';
import { DpPaymentMethodModule } from './cms-components/dp-payment-method/dp-payment-method.module';
import { DpCheckoutPaymentService } from './facade/dp-checkout-payment.service';
import * as i0 from "@angular/core";
export class DpCheckoutModule {
}
DpCheckoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DpCheckoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutModule, imports: [DpPaymentMethodModule] });
DpCheckoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutModule, providers: [
        {
            provide: DigitalPaymentsAdapter,
            useClass: OccDigitalPaymentsAdapter,
        },
        {
            provide: DP_DETAILS_NORMALIZER,
            useExisting: OccDpDetailsNormalizer,
            multi: true,
        },
        {
            provide: DP_REQUEST_NORMALIZER,
            useExisting: OccDpRequestNormalizer,
            multi: true,
        },
        DpCheckoutPaymentService,
        provideDefaultConfig(occDigitalPaymentsConfig),
    ], imports: [DpPaymentMethodModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DpPaymentMethodModule],
                    providers: [
                        {
                            provide: DigitalPaymentsAdapter,
                            useClass: OccDigitalPaymentsAdapter,
                        },
                        {
                            provide: DP_DETAILS_NORMALIZER,
                            useExisting: OccDpDetailsNormalizer,
                            multi: true,
                        },
                        {
                            provide: DP_REQUEST_NORMALIZER,
                            useExisting: OccDpRequestNormalizer,
                            multi: true,
                        },
                        DpCheckoutPaymentService,
                        provideDefaultConfig(occDigitalPaymentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHAtY2hlY2tvdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9kaWdpdGFsLXBheW1lbnRzL3NyYy9jaGVja291dC9kcC1jaGVja291dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDbEcsT0FBTyxFQUNMLHFCQUFxQixFQUNyQixxQkFBcUIsR0FDdEIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMzRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7QUF1QmhGLE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixZQXBCakIscUJBQXFCOzhHQW9CcEIsZ0JBQWdCLGFBbkJoQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixRQUFRLEVBQUUseUJBQXlCO1NBQ3BDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUscUJBQXFCO1lBQzlCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRCx3QkFBd0I7UUFDeEIsb0JBQW9CLENBQUMsd0JBQXdCLENBQUM7S0FDL0MsWUFsQlMscUJBQXFCOzJGQW9CcEIsZ0JBQWdCO2tCQXJCNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDaEMsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxzQkFBc0I7NEJBQy9CLFFBQVEsRUFBRSx5QkFBeUI7eUJBQ3BDO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxxQkFBcUI7NEJBQzlCLFdBQVcsRUFBRSxzQkFBc0I7NEJBQ25DLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxxQkFBcUI7NEJBQzlCLFdBQVcsRUFBRSxzQkFBc0I7NEJBQ25DLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNELHdCQUF3Qjt3QkFDeEIsb0JBQW9CLENBQUMsd0JBQXdCLENBQUM7cUJBQy9DO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IG9jY0RpZ2l0YWxQYXltZW50c0NvbmZpZyB9IGZyb20gJy4vYWRhcHRlcnMvY29uZmlnL29jYy1kaWdpdGFsLXBheW1lbnRzLWVuZHBvaW50LmNvbmZpZyc7XG5pbXBvcnQge1xuICBEUF9ERVRBSUxTX05PUk1BTElaRVIsXG4gIERQX1JFUVVFU1RfTk9STUFMSVpFUixcbn0gZnJvbSAnLi9hZGFwdGVycy9jb252ZXJ0ZXJzJztcbmltcG9ydCB7IERpZ2l0YWxQYXltZW50c0FkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL2RpZ2l0YWwtcGF5bWVudHMuYWRhcHRlcic7XG5pbXBvcnQgeyBPY2NEcERldGFpbHNOb3JtYWxpemVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtZGlnaXRhbC1wYXltZW50LWRldGFpbHMubm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NEcFJlcXVlc3ROb3JtYWxpemVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtZGlnaXRhbC1wYXltZW50LXJlcXVlc3Qubm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NEaWdpdGFsUGF5bWVudHNBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtZGlnaXRhbC1wYXltZW50cy5hZGFwdGVyJztcbmltcG9ydCB7IERwUGF5bWVudE1ldGhvZE1vZHVsZSB9IGZyb20gJy4vY21zLWNvbXBvbmVudHMvZHAtcGF5bWVudC1tZXRob2QvZHAtcGF5bWVudC1tZXRob2QubW9kdWxlJztcbmltcG9ydCB7IERwQ2hlY2tvdXRQYXltZW50U2VydmljZSB9IGZyb20gJy4vZmFjYWRlL2RwLWNoZWNrb3V0LXBheW1lbnQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtEcFBheW1lbnRNZXRob2RNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBEaWdpdGFsUGF5bWVudHNBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY0RpZ2l0YWxQYXltZW50c0FkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBEUF9ERVRBSUxTX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjRHBEZXRhaWxzTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogRFBfUkVRVUVTVF9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0RwUmVxdWVzdE5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIERwQ2hlY2tvdXRQYXltZW50U2VydmljZSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhvY2NEaWdpdGFsUGF5bWVudHNDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBEcENoZWNrb3V0TW9kdWxlIHt9XG4iXX0=