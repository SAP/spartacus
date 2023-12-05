/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./checkout-cost-center-event.listener";
import * as i2 from "./checkout-payment-type-event.listener";
export class CheckoutB2BEventModule {
    constructor(_checkoutCostCenterEventListener, _checkoutPaymentTypeEventListener) {
        // Intentional empty constructor
    }
}
CheckoutB2BEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BEventModule, deps: [{ token: i1.CheckoutCostCenterEventListener }, { token: i2.CheckoutPaymentTypeEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BEventModule });
CheckoutB2BEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: i1.CheckoutCostCenterEventListener }, { type: i2.CheckoutPaymentTypeEventListener }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLWV2ZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvcm9vdC9ldmVudHMvY2hlY2tvdXQtYjJiLWV2ZW50Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUt6QyxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQ0UsZ0NBQWlFLEVBQ2pFLGlDQUFtRTtRQUVuRSxnQ0FBZ0M7SUFDbEMsQ0FBQzs7bUhBTlUsc0JBQXNCO29IQUF0QixzQkFBc0I7b0hBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQURsQyxRQUFRO21CQUFDLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXRDb3N0Q2VudGVyRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vY2hlY2tvdXQtY29zdC1jZW50ZXItZXZlbnQubGlzdGVuZXInO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYXltZW50VHlwZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL2NoZWNrb3V0LXBheW1lbnQtdHlwZS1ldmVudC5saXN0ZW5lcic7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBDaGVja291dEIyQkV2ZW50TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgX2NoZWNrb3V0Q29zdENlbnRlckV2ZW50TGlzdGVuZXI6IENoZWNrb3V0Q29zdENlbnRlckV2ZW50TGlzdGVuZXIsXG4gICAgX2NoZWNrb3V0UGF5bWVudFR5cGVFdmVudExpc3RlbmVyOiBDaGVja291dFBheW1lbnRUeXBlRXZlbnRMaXN0ZW5lclxuICApIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG59XG4iXX0=