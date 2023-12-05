/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DeliveryModePreferences, } from '@spartacus/checkout/base/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/checkout/base/root";
export class CheckoutConfigService {
    constructor(checkoutConfig) {
        this.checkoutConfig = checkoutConfig;
        this.express = this.checkoutConfig.checkout?.express ?? false;
        this.guest = this.checkoutConfig.checkout?.guest ?? false;
        this.defaultDeliveryMode = this.checkoutConfig.checkout?.defaultDeliveryMode || [];
    }
    compareDeliveryCost(deliveryMode1, deliveryMode2) {
        if (deliveryMode1.deliveryCost?.value &&
            deliveryMode2.deliveryCost?.value) {
            if (deliveryMode1.deliveryCost.value > deliveryMode2.deliveryCost.value) {
                return 1;
            }
            else if (deliveryMode1.deliveryCost.value < deliveryMode2.deliveryCost.value) {
                return -1;
            }
        }
        return 0;
    }
    findMatchingDeliveryMode(deliveryModes, index = 0) {
        switch (this.defaultDeliveryMode[index]) {
            case DeliveryModePreferences.FREE:
                if (deliveryModes[0].deliveryCost?.value === 0) {
                    return deliveryModes[0].code;
                }
                break;
            case DeliveryModePreferences.LEAST_EXPENSIVE:
                const leastExpensiveFound = deliveryModes.find((deliveryMode) => deliveryMode.deliveryCost?.value !== 0);
                if (leastExpensiveFound) {
                    return leastExpensiveFound.code;
                }
                break;
            case DeliveryModePreferences.MOST_EXPENSIVE:
                return deliveryModes[deliveryModes.length - 1].code;
            default:
                const codeFound = deliveryModes.find((deliveryMode) => deliveryMode.code === this.defaultDeliveryMode[index]);
                if (codeFound) {
                    return codeFound.code;
                }
        }
        const lastMode = this.defaultDeliveryMode.length - 1 <= index;
        return lastMode
            ? deliveryModes[0].code
            : this.findMatchingDeliveryMode(deliveryModes, index + 1);
    }
    shouldUseAddressSavedInCart() {
        return !!this.checkoutConfig?.checkout?.guestUseSavedAddress;
    }
    getPreferredDeliveryMode(deliveryModes) {
        deliveryModes.sort(this.compareDeliveryCost);
        return this.findMatchingDeliveryMode(deliveryModes);
    }
    isExpressCheckout() {
        return this.express;
    }
    isGuestCheckout() {
        return this.guest;
    }
}
CheckoutConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConfigService, deps: [{ token: i1.CheckoutConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL3NlcnZpY2VzL2NoZWNrb3V0LWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCx1QkFBdUIsR0FDeEIsTUFBTSwrQkFBK0IsQ0FBQzs7O0FBS3ZDLE1BQU0sT0FBTyxxQkFBcUI7SUFNaEMsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTDFDLFlBQU8sR0FBWSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDO1FBQ2xFLFVBQUssR0FBWSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDO1FBQzlELHdCQUFtQixHQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsSUFBSSxFQUFFLENBQUM7SUFFTCxDQUFDO0lBRTVDLG1CQUFtQixDQUMzQixhQUEyQixFQUMzQixhQUEyQjtRQUUzQixJQUNFLGFBQWEsQ0FBQyxZQUFZLEVBQUUsS0FBSztZQUNqQyxhQUFhLENBQUMsWUFBWSxFQUFFLEtBQUssRUFDakM7WUFDQSxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO2dCQUN2RSxPQUFPLENBQUMsQ0FBQzthQUNWO2lCQUFNLElBQ0wsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQ25FO2dCQUNBLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDWDtTQUNGO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRVMsd0JBQXdCLENBQ2hDLGFBQTZCLEVBQzdCLEtBQUssR0FBRyxDQUFDO1FBRVQsUUFBUSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkMsS0FBSyx1QkFBdUIsQ0FBQyxJQUFJO2dCQUMvQixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDOUMsT0FBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2lCQUM5QjtnQkFDRCxNQUFNO1lBQ1IsS0FBSyx1QkFBdUIsQ0FBQyxlQUFlO2dCQUMxQyxNQUFNLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQzVDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEtBQUssS0FBSyxDQUFDLENBQ3pELENBQUM7Z0JBQ0YsSUFBSSxtQkFBbUIsRUFBRTtvQkFDdkIsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7aUJBQ2pDO2dCQUNELE1BQU07WUFDUixLQUFLLHVCQUF1QixDQUFDLGNBQWM7Z0JBQ3pDLE9BQU8sYUFBYSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3REO2dCQUNFLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQ2xDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FDZixZQUFZLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FDeEQsQ0FBQztnQkFDRixJQUFJLFNBQVMsRUFBRTtvQkFDYixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBQ3ZCO1NBQ0o7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDOUQsT0FBTyxRQUFRO1lBQ2IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsMkJBQTJCO1FBQ3pCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixDQUFDO0lBQy9ELENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxhQUE2QjtRQUNwRCxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7a0hBN0VVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlbGl2ZXJ5TW9kZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXRDb25maWcsXG4gIERlbGl2ZXJ5TW9kZVByZWZlcmVuY2VzLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dENvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGV4cHJlc3M6IGJvb2xlYW4gPSB0aGlzLmNoZWNrb3V0Q29uZmlnLmNoZWNrb3V0Py5leHByZXNzID8/IGZhbHNlO1xuICBwcml2YXRlIGd1ZXN0OiBib29sZWFuID0gdGhpcy5jaGVja291dENvbmZpZy5jaGVja291dD8uZ3Vlc3QgPz8gZmFsc2U7XG4gIHByaXZhdGUgZGVmYXVsdERlbGl2ZXJ5TW9kZTogQXJyYXk8RGVsaXZlcnlNb2RlUHJlZmVyZW5jZXMgfCBzdHJpbmc+ID1cbiAgICB0aGlzLmNoZWNrb3V0Q29uZmlnLmNoZWNrb3V0Py5kZWZhdWx0RGVsaXZlcnlNb2RlIHx8IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2hlY2tvdXRDb25maWc6IENoZWNrb3V0Q29uZmlnKSB7fVxuXG4gIHByb3RlY3RlZCBjb21wYXJlRGVsaXZlcnlDb3N0KFxuICAgIGRlbGl2ZXJ5TW9kZTE6IERlbGl2ZXJ5TW9kZSxcbiAgICBkZWxpdmVyeU1vZGUyOiBEZWxpdmVyeU1vZGVcbiAgKTogbnVtYmVyIHtcbiAgICBpZiAoXG4gICAgICBkZWxpdmVyeU1vZGUxLmRlbGl2ZXJ5Q29zdD8udmFsdWUgJiZcbiAgICAgIGRlbGl2ZXJ5TW9kZTIuZGVsaXZlcnlDb3N0Py52YWx1ZVxuICAgICkge1xuICAgICAgaWYgKGRlbGl2ZXJ5TW9kZTEuZGVsaXZlcnlDb3N0LnZhbHVlID4gZGVsaXZlcnlNb2RlMi5kZWxpdmVyeUNvc3QudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBkZWxpdmVyeU1vZGUxLmRlbGl2ZXJ5Q29zdC52YWx1ZSA8IGRlbGl2ZXJ5TW9kZTIuZGVsaXZlcnlDb3N0LnZhbHVlXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHByb3RlY3RlZCBmaW5kTWF0Y2hpbmdEZWxpdmVyeU1vZGUoXG4gICAgZGVsaXZlcnlNb2RlczogRGVsaXZlcnlNb2RlW10sXG4gICAgaW5kZXggPSAwXG4gICk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgc3dpdGNoICh0aGlzLmRlZmF1bHREZWxpdmVyeU1vZGVbaW5kZXhdKSB7XG4gICAgICBjYXNlIERlbGl2ZXJ5TW9kZVByZWZlcmVuY2VzLkZSRUU6XG4gICAgICAgIGlmIChkZWxpdmVyeU1vZGVzWzBdLmRlbGl2ZXJ5Q29zdD8udmFsdWUgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZGVsaXZlcnlNb2Rlc1swXS5jb2RlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEZWxpdmVyeU1vZGVQcmVmZXJlbmNlcy5MRUFTVF9FWFBFTlNJVkU6XG4gICAgICAgIGNvbnN0IGxlYXN0RXhwZW5zaXZlRm91bmQgPSBkZWxpdmVyeU1vZGVzLmZpbmQoXG4gICAgICAgICAgKGRlbGl2ZXJ5TW9kZSkgPT4gZGVsaXZlcnlNb2RlLmRlbGl2ZXJ5Q29zdD8udmFsdWUgIT09IDBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGxlYXN0RXhwZW5zaXZlRm91bmQpIHtcbiAgICAgICAgICByZXR1cm4gbGVhc3RFeHBlbnNpdmVGb3VuZC5jb2RlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEZWxpdmVyeU1vZGVQcmVmZXJlbmNlcy5NT1NUX0VYUEVOU0lWRTpcbiAgICAgICAgcmV0dXJuIGRlbGl2ZXJ5TW9kZXNbZGVsaXZlcnlNb2Rlcy5sZW5ndGggLSAxXS5jb2RlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3QgY29kZUZvdW5kID0gZGVsaXZlcnlNb2Rlcy5maW5kKFxuICAgICAgICAgIChkZWxpdmVyeU1vZGUpID0+XG4gICAgICAgICAgICBkZWxpdmVyeU1vZGUuY29kZSA9PT0gdGhpcy5kZWZhdWx0RGVsaXZlcnlNb2RlW2luZGV4XVxuICAgICAgICApO1xuICAgICAgICBpZiAoY29kZUZvdW5kKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGVGb3VuZC5jb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGxhc3RNb2RlID0gdGhpcy5kZWZhdWx0RGVsaXZlcnlNb2RlLmxlbmd0aCAtIDEgPD0gaW5kZXg7XG4gICAgcmV0dXJuIGxhc3RNb2RlXG4gICAgICA/IGRlbGl2ZXJ5TW9kZXNbMF0uY29kZVxuICAgICAgOiB0aGlzLmZpbmRNYXRjaGluZ0RlbGl2ZXJ5TW9kZShkZWxpdmVyeU1vZGVzLCBpbmRleCArIDEpO1xuICB9XG5cbiAgc2hvdWxkVXNlQWRkcmVzc1NhdmVkSW5DYXJ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY2hlY2tvdXRDb25maWc/LmNoZWNrb3V0Py5ndWVzdFVzZVNhdmVkQWRkcmVzcztcbiAgfVxuXG4gIGdldFByZWZlcnJlZERlbGl2ZXJ5TW9kZShkZWxpdmVyeU1vZGVzOiBEZWxpdmVyeU1vZGVbXSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgZGVsaXZlcnlNb2Rlcy5zb3J0KHRoaXMuY29tcGFyZURlbGl2ZXJ5Q29zdCk7XG4gICAgcmV0dXJuIHRoaXMuZmluZE1hdGNoaW5nRGVsaXZlcnlNb2RlKGRlbGl2ZXJ5TW9kZXMpO1xuICB9XG5cbiAgaXNFeHByZXNzQ2hlY2tvdXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXhwcmVzcztcbiAgfVxuXG4gIGlzR3Vlc3RDaGVja291dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ndWVzdDtcbiAgfVxufVxuIl19