/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageMetaResolver, PageType, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/customer-ticketing/root";
export class CustomerTicketingPageMetaResolver extends PageMetaResolver {
    constructor(translationService, activeCartFacade, basePageMetaResolver, customerTicketingFacade, translation, semanticPath) {
        super();
        this.translationService = translationService;
        this.activeCartFacade = activeCartFacade;
        this.basePageMetaResolver = basePageMetaResolver;
        this.customerTicketingFacade = customerTicketingFacade;
        this.translation = translation;
        this.semanticPath = semanticPath;
        this.CUSTOMER_SERVICE_TRANSLATION_KEY = 'customerTicketing.customerService';
        this.CUSTOMER_SERVICE_SEMANTIC_ROUTE = 'supportTickets';
        this.customerServiceBreadCrumb$ = this.translation.translate(this.CUSTOMER_SERVICE_TRANSLATION_KEY).pipe(map((label) => [
            {
                label,
                link: this.semanticPath.get(this.CUSTOMER_SERVICE_SEMANTIC_ROUTE),
            },
        ]));
        this.pageType = PageType.CONTENT_PAGE;
        this.pageUid = 'support-ticket-details';
    }
    resolveTitle() {
        return this.basePageMetaResolver.resolveTitle();
    }
    /**
     * @override
     * Resolves the page heading for the Customer Ticket Details Page.
     * The page heading is used in the UI (`<h1>`), where as the page
     * title is used by the browser and crawlers.
     */
    resolveHeading() {
        return this.customerTicketingFacade
            .getTicket()
            .pipe(map((ticket) => ticket?.subject || ''));
    }
    resolveDescription() {
        return this.basePageMetaResolver.resolveDescription();
    }
    resolveRobots() {
        return this.basePageMetaResolver.resolveRobots();
    }
    resolveBreadcrumbs() {
        return combineLatest([
            this.customerServiceBreadCrumb$,
            this.basePageMetaResolver.resolveBreadcrumbs(),
        ]).pipe(map(([customerServiceBreadCrumb, breadcrumbs = []]) => {
            const [home, ...restBreadcrumbs] = breadcrumbs;
            return [home, ...customerServiceBreadCrumb, ...restBreadcrumbs];
        }));
    }
}
CustomerTicketingPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingPageMetaResolver, deps: [{ token: i1.TranslationService }, { token: i2.ActiveCartFacade }, { token: i1.BasePageMetaResolver }, { token: i3.CustomerTicketingFacade }, { token: i1.TranslationService }, { token: i1.SemanticPathService }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerTicketingPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i2.ActiveCartFacade }, { type: i1.BasePageMetaResolver }, { type: i3.CustomerTicketingFacade }, { type: i1.TranslationService }, { type: i1.SemanticPathService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLXBhZ2UtbWV0YS5yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jdXN0b21lci10aWNrZXRpbmcvY29yZS9zZXJ2aWNlcy9jdXN0b21lci10aWNrZXRpbmctcGFnZS1tZXRhLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFJTCxnQkFBZ0IsRUFJaEIsUUFBUSxHQUtULE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBS3JDLE1BQU0sT0FBTyxpQ0FDWCxTQUFRLGdCQUFnQjtJQWF4QixZQUNZLGtCQUFzQyxFQUN0QyxnQkFBa0MsRUFDbEMsb0JBQTBDLEVBQzFDLHVCQUFnRCxFQUNoRCxXQUErQixFQUMvQixZQUFpQztRQUUzQyxLQUFLLEVBQUUsQ0FBQztRQVBFLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQVgxQixxQ0FBZ0MsR0FDakQsbUNBQW1DLENBQUM7UUFFbkIsb0NBQStCLEdBQUcsZ0JBQWdCLENBQUM7UUFtRDVELCtCQUEwQixHQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxJQUFJLENBQ3BFLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDYjtnQkFDRSxLQUFLO2dCQUNMLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUM7YUFDbEU7U0FDRixDQUFDLENBQ0gsQ0FBQztRQWhERixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztJQUMxQyxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyx1QkFBdUI7YUFDaEMsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLDBCQUEwQjtZQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLEVBQUU7U0FDL0MsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixFQUFFLFdBQVcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxlQUFlLENBQUMsR0FBRyxXQUFXLENBQUM7WUFDL0MsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLHlCQUF5QixFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OzhIQTdEVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQyxjQUZoQyxNQUFNOzJGQUVQLGlDQUFpQztrQkFIN0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBQYWdlSGVhZGluZ1Jlc29sdmVyLFxuICBCYXNlUGFnZU1ldGFSZXNvbHZlcixcbiAgUGFnZURlc2NyaXB0aW9uUmVzb2x2ZXIsXG4gIFBhZ2VNZXRhUmVzb2x2ZXIsXG4gIFBhZ2VSb2JvdHNNZXRhLFxuICBQYWdlUm9ib3RzUmVzb2x2ZXIsXG4gIFBhZ2VUaXRsZVJlc29sdmVyLFxuICBQYWdlVHlwZSxcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxuICBQYWdlQnJlYWRjcnVtYlJlc29sdmVyLFxuICBCcmVhZGNydW1iTWV0YSxcbiAgU2VtYW50aWNQYXRoU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEN1c3RvbWVyVGlja2V0aW5nRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jdXN0b21lci10aWNrZXRpbmcvcm9vdCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lclRpY2tldGluZ1BhZ2VNZXRhUmVzb2x2ZXJcbiAgZXh0ZW5kcyBQYWdlTWV0YVJlc29sdmVyXG4gIGltcGxlbWVudHNcbiAgICBQYWdlSGVhZGluZ1Jlc29sdmVyLFxuICAgIFBhZ2VCcmVhZGNydW1iUmVzb2x2ZXIsXG4gICAgUGFnZVRpdGxlUmVzb2x2ZXIsXG4gICAgUGFnZURlc2NyaXB0aW9uUmVzb2x2ZXIsXG4gICAgUGFnZVJvYm90c1Jlc29sdmVyXG57XG4gIHByb3RlY3RlZCByZWFkb25seSBDVVNUT01FUl9TRVJWSUNFX1RSQU5TTEFUSU9OX0tFWSA9XG4gICAgJ2N1c3RvbWVyVGlja2V0aW5nLmN1c3RvbWVyU2VydmljZSc7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IENVU1RPTUVSX1NFUlZJQ0VfU0VNQU5USUNfUk9VVEUgPSAnc3VwcG9ydFRpY2tldHMnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGlvblNlcnZpY2U6IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgYmFzZVBhZ2VNZXRhUmVzb2x2ZXI6IEJhc2VQYWdlTWV0YVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCBjdXN0b21lclRpY2tldGluZ0ZhY2FkZTogQ3VzdG9tZXJUaWNrZXRpbmdGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHNlbWFudGljUGF0aDogU2VtYW50aWNQYXRoU2VydmljZVxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucGFnZVR5cGUgPSBQYWdlVHlwZS5DT05URU5UX1BBR0U7XG4gICAgdGhpcy5wYWdlVWlkID0gJ3N1cHBvcnQtdGlja2V0LWRldGFpbHMnO1xuICB9XG5cbiAgcmVzb2x2ZVRpdGxlKCk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VNZXRhUmVzb2x2ZXIucmVzb2x2ZVRpdGxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIFJlc29sdmVzIHRoZSBwYWdlIGhlYWRpbmcgZm9yIHRoZSBDdXN0b21lciBUaWNrZXQgRGV0YWlscyBQYWdlLlxuICAgKiBUaGUgcGFnZSBoZWFkaW5nIGlzIHVzZWQgaW4gdGhlIFVJIChgPGgxPmApLCB3aGVyZSBhcyB0aGUgcGFnZVxuICAgKiB0aXRsZSBpcyB1c2VkIGJ5IHRoZSBicm93c2VyIGFuZCBjcmF3bGVycy5cbiAgICovXG4gIHJlc29sdmVIZWFkaW5nKCk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tZXJUaWNrZXRpbmdGYWNhZGVcbiAgICAgIC5nZXRUaWNrZXQoKVxuICAgICAgLnBpcGUobWFwKCh0aWNrZXQpID0+IHRpY2tldD8uc3ViamVjdCB8fCAnJykpO1xuICB9XG5cbiAgcmVzb2x2ZURlc2NyaXB0aW9uKCk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VNZXRhUmVzb2x2ZXIucmVzb2x2ZURlc2NyaXB0aW9uKCk7XG4gIH1cblxuICByZXNvbHZlUm9ib3RzKCk6IE9ic2VydmFibGU8UGFnZVJvYm90c01ldGFbXT4ge1xuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlTWV0YVJlc29sdmVyLnJlc29sdmVSb2JvdHMoKTtcbiAgfVxuXG4gIHJlc29sdmVCcmVhZGNydW1icygpOiBPYnNlcnZhYmxlPEJyZWFkY3J1bWJNZXRhW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmN1c3RvbWVyU2VydmljZUJyZWFkQ3J1bWIkLFxuICAgICAgdGhpcy5iYXNlUGFnZU1ldGFSZXNvbHZlci5yZXNvbHZlQnJlYWRjcnVtYnMoKSxcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbY3VzdG9tZXJTZXJ2aWNlQnJlYWRDcnVtYiwgYnJlYWRjcnVtYnMgPSBbXV0pID0+IHtcbiAgICAgICAgY29uc3QgW2hvbWUsIC4uLnJlc3RCcmVhZGNydW1ic10gPSBicmVhZGNydW1icztcbiAgICAgICAgcmV0dXJuIFtob21lLCAuLi5jdXN0b21lclNlcnZpY2VCcmVhZENydW1iLCAuLi5yZXN0QnJlYWRjcnVtYnNdO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGN1c3RvbWVyU2VydmljZUJyZWFkQ3J1bWIkOiBPYnNlcnZhYmxlPEJyZWFkY3J1bWJNZXRhW10+ID1cbiAgICB0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZSh0aGlzLkNVU1RPTUVSX1NFUlZJQ0VfVFJBTlNMQVRJT05fS0VZKS5waXBlKFxuICAgICAgbWFwKChsYWJlbCkgPT4gW1xuICAgICAgICB7XG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgbGluazogdGhpcy5zZW1hbnRpY1BhdGguZ2V0KHRoaXMuQ1VTVE9NRVJfU0VSVklDRV9TRU1BTlRJQ19ST1VURSksXG4gICAgICAgIH0sXG4gICAgICBdKVxuICAgICk7XG59XG4iXX0=