import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./asm-enabler.service";
export class AsmDeepLinkService {
    constructor(routingService, winRef, asmEnablerService) {
        this.routingService = routingService;
        this.winRef = winRef;
        this.asmEnablerService = asmEnablerService;
        this.searchParams = new URLSearchParams(this.winRef?.location?.search);
    }
    /**
     * check whether try to emulate customer from deeplink
     */
    isEmulateInURL() {
        return this.asmEnablerService?.isEmulateInURL() || false;
    }
    /**
     * Returns a deep link parameter value if it is in the url.
     */
    getSearchParameter(key) {
        return this.searchParams.get(key) ?? undefined;
    }
    /**
     * Handles the navigation based on deep link parameters in the URL
     * or passed parameters.
     */
    handleNavigation(parameters = this.getParamsInUrl()) {
        if (parameters.cartType === 'active') {
            // Navigate to active cart
            this.routingService.go({ cxRoute: 'cart' });
        }
        else if (parameters.cartType === 'saved' && parameters.cartId) {
            // Navigate to saved cart
            this.routingService.go('my-account/saved-cart/' + parameters.cartId);
        }
        else if (parameters.orderId) {
            // Navigate to order details
            this.routingService.go({
                cxRoute: 'orderDetails',
                params: { code: parameters.orderId },
            });
        }
        else if (parameters.ticketId) {
            // Navigate to support ticket details
            this.routingService.go({
                cxRoute: 'supportTicketDetails',
                params: { ticketCode: parameters.ticketId },
            });
        }
    }
    /**
     * Returns valid deep link parameters in the url.
     */
    getParamsInUrl() {
        const params = {
            customerId: this.getSearchParameter('customerId'),
            orderId: this.getSearchParameter('orderId'),
            ticketId: this.getSearchParameter('ticketId'),
            cartId: this.getSearchParameter('cartId'),
            cartType: this.getSearchParameter('cartType'),
        };
        // Filter undefined properties
        return Object.fromEntries(Object.entries(params).filter(([_, v]) => !!v));
    }
}
AsmDeepLinkService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmDeepLinkService, deps: [{ token: i1.RoutingService }, { token: i1.WindowRef }, { token: i2.AsmEnablerService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmDeepLinkService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmDeepLinkService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmDeepLinkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.WindowRef }, { type: i2.AsmEnablerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWRlZXAtbGluay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9yb290L3NlcnZpY2VzL2FzbS1kZWVwLWxpbmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBTzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFHN0IsWUFDWSxjQUE4QixFQUM5QixNQUFpQixFQUNqQixpQkFBb0M7UUFGcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUU5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsSUFBSSxLQUFLLENBQUM7SUFDM0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0JBQWtCLENBQUMsR0FBVztRQUM1QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDakQsSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNwQywwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM3QzthQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUMvRCx5QkFBeUI7WUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RFO2FBQU0sSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzdCLDRCQUE0QjtZQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFO2FBQ3JDLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzlCLHFDQUFxQztZQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUU7YUFDNUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1osTUFBTSxNQUFNLEdBQTBCO1lBQ3BDLFVBQVUsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDO1lBQ2pELE9BQU8sRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1lBQzNDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1lBQzdDLE1BQU0sRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1NBQzlDLENBQUM7UUFDRiw4QkFBOEI7UUFDOUIsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7OytHQWhFVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSwgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFzbUVuYWJsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hc20tZW5hYmxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFzbURlZXBMaW5rUGFyYW1ldGVycyB9IGZyb20gJy4uL21vZGVsL2FzbS5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXNtRGVlcExpbmtTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCBhc21FbmFibGVyU2VydmljZTogQXNtRW5hYmxlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHRoaXMud2luUmVmPy5sb2NhdGlvbj8uc2VhcmNoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayB3aGV0aGVyIHRyeSB0byBlbXVsYXRlIGN1c3RvbWVyIGZyb20gZGVlcGxpbmtcbiAgICovXG4gIGlzRW11bGF0ZUluVVJMKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFzbUVuYWJsZXJTZXJ2aWNlPy5pc0VtdWxhdGVJblVSTCgpIHx8IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBkZWVwIGxpbmsgcGFyYW1ldGVyIHZhbHVlIGlmIGl0IGlzIGluIHRoZSB1cmwuXG4gICAqL1xuICBnZXRTZWFyY2hQYXJhbWV0ZXIoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnNlYXJjaFBhcmFtcy5nZXQoa2V5KSA/PyB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbmF2aWdhdGlvbiBiYXNlZCBvbiBkZWVwIGxpbmsgcGFyYW1ldGVycyBpbiB0aGUgVVJMXG4gICAqIG9yIHBhc3NlZCBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgaGFuZGxlTmF2aWdhdGlvbihwYXJhbWV0ZXJzID0gdGhpcy5nZXRQYXJhbXNJblVybCgpKTogdm9pZCB7XG4gICAgaWYgKHBhcmFtZXRlcnMuY2FydFR5cGUgPT09ICdhY3RpdmUnKSB7XG4gICAgICAvLyBOYXZpZ2F0ZSB0byBhY3RpdmUgY2FydFxuICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdjYXJ0JyB9KTtcbiAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMuY2FydFR5cGUgPT09ICdzYXZlZCcgJiYgcGFyYW1ldGVycy5jYXJ0SWQpIHtcbiAgICAgIC8vIE5hdmlnYXRlIHRvIHNhdmVkIGNhcnRcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oJ215LWFjY291bnQvc2F2ZWQtY2FydC8nICsgcGFyYW1ldGVycy5jYXJ0SWQpO1xuICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5vcmRlcklkKSB7XG4gICAgICAvLyBOYXZpZ2F0ZSB0byBvcmRlciBkZXRhaWxzXG4gICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgICAgY3hSb3V0ZTogJ29yZGVyRGV0YWlscycsXG4gICAgICAgIHBhcmFtczogeyBjb2RlOiBwYXJhbWV0ZXJzLm9yZGVySWQgfSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy50aWNrZXRJZCkge1xuICAgICAgLy8gTmF2aWdhdGUgdG8gc3VwcG9ydCB0aWNrZXQgZGV0YWlsc1xuICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7XG4gICAgICAgIGN4Um91dGU6ICdzdXBwb3J0VGlja2V0RGV0YWlscycsXG4gICAgICAgIHBhcmFtczogeyB0aWNrZXRDb2RlOiBwYXJhbWV0ZXJzLnRpY2tldElkIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB2YWxpZCBkZWVwIGxpbmsgcGFyYW1ldGVycyBpbiB0aGUgdXJsLlxuICAgKi9cbiAgZ2V0UGFyYW1zSW5VcmwoKTogQXNtRGVlcExpbmtQYXJhbWV0ZXJzIHtcbiAgICBjb25zdCBwYXJhbXM6IEFzbURlZXBMaW5rUGFyYW1ldGVycyA9IHtcbiAgICAgIGN1c3RvbWVySWQ6IHRoaXMuZ2V0U2VhcmNoUGFyYW1ldGVyKCdjdXN0b21lcklkJyksXG4gICAgICBvcmRlcklkOiB0aGlzLmdldFNlYXJjaFBhcmFtZXRlcignb3JkZXJJZCcpLFxuICAgICAgdGlja2V0SWQ6IHRoaXMuZ2V0U2VhcmNoUGFyYW1ldGVyKCd0aWNrZXRJZCcpLFxuICAgICAgY2FydElkOiB0aGlzLmdldFNlYXJjaFBhcmFtZXRlcignY2FydElkJyksXG4gICAgICBjYXJ0VHlwZTogdGhpcy5nZXRTZWFyY2hQYXJhbWV0ZXIoJ2NhcnRUeXBlJyksXG4gICAgfTtcbiAgICAvLyBGaWx0ZXIgdW5kZWZpbmVkIHByb3BlcnRpZXNcbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKHBhcmFtcykuZmlsdGVyKChbXywgdl0pID0+ICEhdikpO1xuICB9XG59XG4iXX0=