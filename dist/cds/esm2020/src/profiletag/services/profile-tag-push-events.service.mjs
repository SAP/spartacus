/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartAddEntrySuccessEvent, CartPageEvent, CartRemoveEntrySuccessEvent, CartUpdateEntrySuccessEvent, MergeCartSuccessEvent, } from '@spartacus/cart/base/root';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { CategoryPageResultsEvent, HomePageEvent, PageEvent, ProductDetailsPageEvent, SearchPageResultsEvent, } from '@spartacus/storefront';
import { merge, of } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged, map, pairwise, startWith, switchMap, withLatestFrom, } from 'rxjs/operators';
import { AddedToCartPushEvent, CartSnapshotPushEvent, CartViewPushEvent, CategoryViewPushEvent, HomePageViewPushEvent, KeywordSearchPushEvent, ModifiedCartPushEvent, NavigatedPushEvent, OrderConfirmationPushEvent, ProductViewPushEvent, RemovedFromCartPushEvent, } from '../model/profile-tag.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/tracking/personalization/core";
import * as i3 from "@spartacus/cart/base/root";
/**
 * A service to convert spartacus events into profiletag push events that can be picked up and processed by profiletag.
 * The service observes the event service and the active cart service for supported events. These events are parsed into
 * a profiletag compliant format and enriched by segments and actions from the latest personalization context.
 *
 * Currently supported events from the event service:
 *  - CartPageVisited
 *  - CategoryPageVisited
 *  - HomePageVisited
 *  - KeywordSearchPageVisited
 *  - OrderConfirmationPageVisited
 *  - PageVisited
 *  - ProductDetailsPageVisited
 *  - CartAddEntrySuccessEvent
 *  - CartRemoveEntrySuccessEvent
 *  - CartUpdateEntrySuccessEvent
 */
export class ProfileTagPushEventsService {
    constructor(eventService, personalizationContextService, activeCartFacade) {
        this.eventService = eventService;
        this.personalizationContextService = personalizationContextService;
        this.activeCartFacade = activeCartFacade;
        this.pushEvents$ = merge(this.categoryPageVisited(), this.productDetailsPageView(), this.searchResultsChanged(), this.homePageVisitedEvent(), this.cartPageVisitedEvent(), this.navigatedEvent(), this.orderConfirmationPageVisited(), this.addedToCart(), this.removedFromCart(), this.modifiedCart(), this.cartChangedEvent());
    }
    /**
     * Returns a push event emitting observable that emits all converted events emitted by the event or the active cart service.
     * These events are enriched with segments and actions from the latest personalization context.
     *
     * @returns an observable emitting profiletag push events
     */
    getPushEvents() {
        return this.pushEvents$.pipe(withLatestFrom(merge(of({ segments: undefined, actions: undefined }), this.personalizationContextService.getPersonalizationContext())), map(([item, personalizationContext]) => {
            item.data = item.data ? item.data : {};
            item.data.segments = personalizationContext?.segments;
            item.data.actions = personalizationContext?.actions;
            return item;
        }));
    }
    /**
     * Adds a new push event emitting observable to this service. This observable will be merged with the internal one.
     * This method can be used to extend the functionality of this service at runtime.
     *
     * @param event an observable emitting profiltag push events
     */
    addPushEvent(event) {
        this.pushEvents$ = merge(this.pushEvents$, event);
    }
    /**
     * Emits the category page visited event.
     *
     * @returns an observable emitting events that describe category page visits in a profiltag compliant way
     * @see CategoryPageResultsEvent
     * @see CategoryViewPushEvent
     */
    categoryPageVisited() {
        return this.eventService.get(CategoryPageResultsEvent).pipe(withLatestFrom(this.eventService.get(PageEvent).pipe(startWith(null), // https://github.com/ReactiveX/rxjs/issues/4772
        pairwise())), distinctUntilChanged(([previouslyEmittedCategoryPage], [currentCategoryPage, [previousRoute, currentRoute]]) => {
            return (previouslyEmittedCategoryPage.categoryCode ===
                currentCategoryPage.categoryCode &&
                previousRoute.navigation.semanticRoute ===
                    currentRoute.navigation.semanticRoute);
            // A true means that this item is not unique, so this is hard to wrap your head around.
            // What we are saying, is that if the category code is the same AND the last emitted semantic route is the
            // same then this is a duplicate (i.e. via a facet change). In other words, no other page type was visited,
            // and we are on the same category code.
        }), map(([categoryPageEvent]) => new CategoryViewPushEvent({
            productCategory: categoryPageEvent.categoryCode,
            productCategoryName: categoryPageEvent.categoryName,
        })));
    }
    /**
     * Listens to SearchPageResultsEvent events
     *
     * @returns an observable emitting events that describe keyword search page visits in a profiltag compliant way
     * @see SearchPageResultsEvent
     * @see KeywordSearchPushEvent
     */
    searchResultsChanged() {
        return this.eventService.get(SearchPageResultsEvent).pipe(distinctUntilKeyChanged('searchTerm'), map((searchEvent) => new KeywordSearchPushEvent({
            searchTerm: searchEvent.searchTerm,
            numResults: searchEvent.numberOfResults,
        })));
    }
    /**
     * Listens to ProductDetailsPageEvent events
     *
     * @returns an observable emitting events that describe product detail page visits in a profiltag compliant way
     * @see ProductDetailsPageEvent
     * @see ProductViewPushEvent
     */
    productDetailsPageView() {
        return this.eventService.get(ProductDetailsPageEvent).pipe(map((item) => new ProductViewPushEvent({
            productSku: item.code,
            productName: item.name,
            productPrice: item.price ? item.price.value : undefined,
            productCategoryName: item.categories
                ? item.categories[item.categories.length - 1].name
                : undefined,
            productCategory: item.categories
                ? item.categories[item.categories.length - 1].code
                : undefined,
            categories: this.categoriesToIds(item.categories),
        })));
    }
    /**
     * Listens to PageVisited events
     *
     * @returns an observable emitting events that describe page visits in a profiltag compliant way
     * @see PageVisited
     * @see NavigatedPushEvent
     */
    navigatedEvent() {
        return this.eventService
            .get(PageEvent)
            .pipe(map(() => new NavigatedPushEvent()));
    }
    /**
     * Listens to CartPageVisited events
     *
     * @returns an observable emitting events that describe cart page visits in a profiltag compliant way
     * @see CartPageVisited
     * @see CartViewPushEvent
     */
    cartPageVisitedEvent() {
        return this.eventService
            .get(CartPageEvent)
            .pipe(map(() => new CartViewPushEvent()));
    }
    /**
     * Listens to HomePageEvent events
     *
     * @returns an observable emitting events that describe home page visits in a profiltag compliant way
     * @see HomePageEvent
     * @see HomePageViewPushEvent
     */
    homePageVisitedEvent() {
        return this.eventService
            .get(HomePageEvent)
            .pipe(map(() => new HomePageViewPushEvent()));
    }
    /**
     * Listens to OrderPlacedEvent events
     *
     * @returns an observable emitting events that describe order confirmation page visits in a profiltag compliant way
     * @see OrderPlacedEvent
     * @see OrderConfirmationPushEvent
     */
    orderConfirmationPageVisited() {
        return this.eventService
            .get(OrderPlacedEvent)
            .pipe(map(() => new OrderConfirmationPushEvent()));
    }
    /**
     * Listens to @CartAddEntrySuccessEvent events, transforms them to @AddedToCartPushEvent .
     *
     * @returns an observable emitting @AddedToCartPushEvent events
     * @see CartAddEntrySuccessEvent
     * @see AddedToCartPushEvent
     */
    addedToCart() {
        return this.eventService.get(CartAddEntrySuccessEvent).pipe(map((item) => new AddedToCartPushEvent({
            productQty: item.quantityAdded,
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            productPrice: this.getProductPrice(item),
            categories: this.categoriesToIds(item.entry.product.categories),
            productCategoryName: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].name
                : undefined,
            productCategory: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].code
                : undefined,
        })));
    }
    /**
     * Listens to @CartRemoveEntrySuccessEvent events, transforms them to @RemovedFromCartPushEvent
     *
     * @returns an observable emitting @RemovedFromCartPushEvent events
     * @see CartRemoveEntrySuccessEvent
     * @see RemovedFromCartPushEvent
     */
    removedFromCart() {
        return this.eventService.get(CartRemoveEntrySuccessEvent).pipe(map((item) => new RemovedFromCartPushEvent({
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            productCategoryName: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].name
                : undefined,
            productCategory: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].code
                : undefined,
            categories: this.categoriesToIds(item.entry.product.categories),
        })));
    }
    /**
     * Listens to @CartUpdateEntrySuccessEvent events, transforms them to @ModifiedCartPushEvent
     *
     * @returns an observable emitting @ModifiedCartPushEvent events
     * @see CartUpdateEntrySuccessEvent
     * @see ModifiedCartPushEvent
     */
    modifiedCart() {
        return this.eventService.get(CartUpdateEntrySuccessEvent).pipe(map((item) => new ModifiedCartPushEvent({
            productQty: item.quantity,
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            categories: this.categoriesToIds(item.entry.product.categories),
            productCategoryName: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].name
                : undefined,
            productCategory: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].code
                : undefined,
        })));
    }
    /**
     * Listens to @CartAddEntrySuccessEvent , @CartUpdateEntrySuccessEvent and @CartRemoveEntrySuccessEvent events,
     * transforms them to @CartSnapshotPushEvent whenever there is an activity on the cart.
     *
     * @returns an observable emitting @CartSnapshotPushEvent events
     * @see CartAddEntrySuccessEvent
     * @see CartUpdateEntrySuccessEvent
     * @see CartRemoveEntrySuccessEvent
     * @see MergeCartSuccessEvent
     * @see CartSnapshotPushEvent
     */
    cartChangedEvent() {
        return merge(this.eventService.get(CartAddEntrySuccessEvent), this.eventService.get(CartUpdateEntrySuccessEvent), this.eventService.get(CartRemoveEntrySuccessEvent), this.eventService.get(MergeCartSuccessEvent)).pipe(switchMap(() => this.activeCartFacade.takeActive()), map((cart) => new CartSnapshotPushEvent({
            cart,
        })));
    }
    getProductPrice(event) {
        if (!event.entry.totalPrice ||
            !event.entry.totalPrice.value ||
            !event.entry.quantity) {
            return undefined;
        }
        return parseFloat((event.entry.totalPrice.value / event.entry.quantity).toFixed(2));
    }
    categoriesToIds(categories) {
        return categories.map((category) => category.code);
    }
}
ProfileTagPushEventsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagPushEventsService, deps: [{ token: i1.EventService }, { token: i2.PersonalizationContextService }, { token: i3.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagPushEventsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagPushEventsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagPushEventsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.PersonalizationContextService }, { type: i3.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS10YWctcHVzaC1ldmVudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RzL3NyYy9wcm9maWxldGFnL3NlcnZpY2VzL3Byb2ZpbGUtdGFnLXB1c2gtZXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLHdCQUF3QixFQUN4QixhQUFhLEVBQ2IsMkJBQTJCLEVBQzNCLDJCQUEyQixFQUMzQixxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQUVuQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLGFBQWEsRUFDYixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLHNCQUFzQixHQUN2QixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsdUJBQXVCLEVBQ3ZCLEdBQUcsRUFDSCxRQUFRLEVBQ1IsU0FBUyxFQUNULFNBQVMsRUFDVCxjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDakIscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLGtCQUFrQixFQUNsQiwwQkFBMEIsRUFDMUIsb0JBQW9CLEVBRXBCLHdCQUF3QixHQUN6QixNQUFNLDRCQUE0QixDQUFDOzs7OztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUlILE1BQU0sT0FBTywyQkFBMkI7SUFldEMsWUFDWSxZQUEwQixF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R0FBRyxDQUNELENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDUCxJQUFJLHFCQUFxQixDQUFDO1lBQ3hCLElBQUk7U0FDTCxDQUFDLENBQ0wsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVPLGVBQWUsQ0FBQyxLQUErQjtRQUNyRCxJQUNFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVO1lBQ3ZCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSztZQUM3QixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUNyQjtZQUNBLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxVQUFVLENBQ2YsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ2pFLENBQUM7SUFDSixDQUFDO0lBQ08sZUFBZSxDQUFDLFVBQTJCO1FBQ2pELE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7O3dIQWpWVSwyQkFBMkI7NEhBQTNCLDJCQUEyQixjQUYxQixNQUFNOzJGQUVQLDJCQUEyQjtrQkFIdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3RpdmVDYXJ0RmFjYWRlLFxuICBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQsXG4gIENhcnRQYWdlRXZlbnQsXG4gIENhcnRSZW1vdmVFbnRyeVN1Y2Nlc3NFdmVudCxcbiAgQ2FydFVwZGF0ZUVudHJ5U3VjY2Vzc0V2ZW50LFxuICBNZXJnZUNhcnRTdWNjZXNzRXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQ2F0ZWdvcnksIEV2ZW50U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPcmRlclBsYWNlZEV2ZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7XG4gIENhdGVnb3J5UGFnZVJlc3VsdHNFdmVudCxcbiAgSG9tZVBhZ2VFdmVudCxcbiAgUGFnZUV2ZW50LFxuICBQcm9kdWN0RGV0YWlsc1BhZ2VFdmVudCxcbiAgU2VhcmNoUGFnZVJlc3VsdHNFdmVudCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFBlcnNvbmFsaXphdGlvbkNvbnRleHRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy90cmFja2luZy9wZXJzb25hbGl6YXRpb24vY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZCxcbiAgbWFwLFxuICBwYWlyd2lzZSxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG4gIHdpdGhMYXRlc3RGcm9tLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBBZGRlZFRvQ2FydFB1c2hFdmVudCxcbiAgQ2FydFNuYXBzaG90UHVzaEV2ZW50LFxuICBDYXJ0Vmlld1B1c2hFdmVudCxcbiAgQ2F0ZWdvcnlWaWV3UHVzaEV2ZW50LFxuICBIb21lUGFnZVZpZXdQdXNoRXZlbnQsXG4gIEtleXdvcmRTZWFyY2hQdXNoRXZlbnQsXG4gIE1vZGlmaWVkQ2FydFB1c2hFdmVudCxcbiAgTmF2aWdhdGVkUHVzaEV2ZW50LFxuICBPcmRlckNvbmZpcm1hdGlvblB1c2hFdmVudCxcbiAgUHJvZHVjdFZpZXdQdXNoRXZlbnQsXG4gIFByb2ZpbGVUYWdQdXNoRXZlbnQsXG4gIFJlbW92ZWRGcm9tQ2FydFB1c2hFdmVudCxcbn0gZnJvbSAnLi4vbW9kZWwvcHJvZmlsZS10YWcubW9kZWwnO1xuXG4vKipcbiAqIEEgc2VydmljZSB0byBjb252ZXJ0IHNwYXJ0YWN1cyBldmVudHMgaW50byBwcm9maWxldGFnIHB1c2ggZXZlbnRzIHRoYXQgY2FuIGJlIHBpY2tlZCB1cCBhbmQgcHJvY2Vzc2VkIGJ5IHByb2ZpbGV0YWcuXG4gKiBUaGUgc2VydmljZSBvYnNlcnZlcyB0aGUgZXZlbnQgc2VydmljZSBhbmQgdGhlIGFjdGl2ZSBjYXJ0IHNlcnZpY2UgZm9yIHN1cHBvcnRlZCBldmVudHMuIFRoZXNlIGV2ZW50cyBhcmUgcGFyc2VkIGludG9cbiAqIGEgcHJvZmlsZXRhZyBjb21wbGlhbnQgZm9ybWF0IGFuZCBlbnJpY2hlZCBieSBzZWdtZW50cyBhbmQgYWN0aW9ucyBmcm9tIHRoZSBsYXRlc3QgcGVyc29uYWxpemF0aW9uIGNvbnRleHQuXG4gKlxuICogQ3VycmVudGx5IHN1cHBvcnRlZCBldmVudHMgZnJvbSB0aGUgZXZlbnQgc2VydmljZTpcbiAqICAtIENhcnRQYWdlVmlzaXRlZFxuICogIC0gQ2F0ZWdvcnlQYWdlVmlzaXRlZFxuICogIC0gSG9tZVBhZ2VWaXNpdGVkXG4gKiAgLSBLZXl3b3JkU2VhcmNoUGFnZVZpc2l0ZWRcbiAqICAtIE9yZGVyQ29uZmlybWF0aW9uUGFnZVZpc2l0ZWRcbiAqICAtIFBhZ2VWaXNpdGVkXG4gKiAgLSBQcm9kdWN0RGV0YWlsc1BhZ2VWaXNpdGVkXG4gKiAgLSBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnRcbiAqICAtIENhcnRSZW1vdmVFbnRyeVN1Y2Nlc3NFdmVudFxuICogIC0gQ2FydFVwZGF0ZUVudHJ5U3VjY2Vzc0V2ZW50XG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlVGFnUHVzaEV2ZW50c1NlcnZpY2Uge1xuICBwcml2YXRlIHB1c2hFdmVudHMkOiBPYnNlcnZhYmxlPFByb2ZpbGVUYWdQdXNoRXZlbnQ+ID0gbWVyZ2UoXG4gICAgdGhpcy5jYXRlZ29yeVBhZ2VWaXNpdGVkKCksXG4gICAgdGhpcy5wcm9kdWN0RGV0YWlsc1BhZ2VWaWV3KCksXG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzQ2hhbmdlZCgpLFxuICAgIHRoaXMuaG9tZVBhZ2VWaXNpdGVkRXZlbnQoKSxcbiAgICB0aGlzLmNhcnRQYWdlVmlzaXRlZEV2ZW50KCksXG4gICAgdGhpcy5uYXZpZ2F0ZWRFdmVudCgpLFxuICAgIHRoaXMub3JkZXJDb25maXJtYXRpb25QYWdlVmlzaXRlZCgpLFxuICAgIHRoaXMuYWRkZWRUb0NhcnQoKSxcbiAgICB0aGlzLnJlbW92ZWRGcm9tQ2FydCgpLFxuICAgIHRoaXMubW9kaWZpZWRDYXJ0KCksXG4gICAgdGhpcy5jYXJ0Q2hhbmdlZEV2ZW50KClcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHBlcnNvbmFsaXphdGlvbkNvbnRleHRTZXJ2aWNlOiBQZXJzb25hbGl6YXRpb25Db250ZXh0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwdXNoIGV2ZW50IGVtaXR0aW5nIG9ic2VydmFibGUgdGhhdCBlbWl0cyBhbGwgY29udmVydGVkIGV2ZW50cyBlbWl0dGVkIGJ5IHRoZSBldmVudCBvciB0aGUgYWN0aXZlIGNhcnQgc2VydmljZS5cbiAgICogVGhlc2UgZXZlbnRzIGFyZSBlbnJpY2hlZCB3aXRoIHNlZ21lbnRzIGFuZCBhY3Rpb25zIGZyb20gdGhlIGxhdGVzdCBwZXJzb25hbGl6YXRpb24gY29udGV4dC5cbiAgICpcbiAgICogQHJldHVybnMgYW4gb2JzZXJ2YWJsZSBlbWl0dGluZyBwcm9maWxldGFnIHB1c2ggZXZlbnRzXG4gICAqL1xuICBnZXRQdXNoRXZlbnRzKCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLnB1c2hFdmVudHMkLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbShcbiAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgb2YoeyBzZWdtZW50czogdW5kZWZpbmVkLCBhY3Rpb25zOiB1bmRlZmluZWQgfSksXG4gICAgICAgICAgdGhpcy5wZXJzb25hbGl6YXRpb25Db250ZXh0U2VydmljZS5nZXRQZXJzb25hbGl6YXRpb25Db250ZXh0KClcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIG1hcCgoW2l0ZW0sIHBlcnNvbmFsaXphdGlvbkNvbnRleHRdKSA9PiB7XG4gICAgICAgIGl0ZW0uZGF0YSA9IGl0ZW0uZGF0YSA/IGl0ZW0uZGF0YSA6IHt9O1xuICAgICAgICBpdGVtLmRhdGEuc2VnbWVudHMgPSBwZXJzb25hbGl6YXRpb25Db250ZXh0Py5zZWdtZW50cztcbiAgICAgICAgaXRlbS5kYXRhLmFjdGlvbnMgPSBwZXJzb25hbGl6YXRpb25Db250ZXh0Py5hY3Rpb25zO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IHB1c2ggZXZlbnQgZW1pdHRpbmcgb2JzZXJ2YWJsZSB0byB0aGlzIHNlcnZpY2UuIFRoaXMgb2JzZXJ2YWJsZSB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZSBpbnRlcm5hbCBvbmUuXG4gICAqIFRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIGV4dGVuZCB0aGUgZnVuY3Rpb25hbGl0eSBvZiB0aGlzIHNlcnZpY2UgYXQgcnVudGltZS5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IGFuIG9ic2VydmFibGUgZW1pdHRpbmcgcHJvZmlsdGFnIHB1c2ggZXZlbnRzXG4gICAqL1xuICBhZGRQdXNoRXZlbnQoZXZlbnQ6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4pOiB2b2lkIHtcbiAgICB0aGlzLnB1c2hFdmVudHMkID0gbWVyZ2UodGhpcy5wdXNoRXZlbnRzJCwgZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBjYXRlZ29yeSBwYWdlIHZpc2l0ZWQgZXZlbnQuXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgZXZlbnRzIHRoYXQgZGVzY3JpYmUgY2F0ZWdvcnkgcGFnZSB2aXNpdHMgaW4gYSBwcm9maWx0YWcgY29tcGxpYW50IHdheVxuICAgKiBAc2VlIENhdGVnb3J5UGFnZVJlc3VsdHNFdmVudFxuICAgKiBAc2VlIENhdGVnb3J5Vmlld1B1c2hFdmVudFxuICAgKi9cblxuICBwcm90ZWN0ZWQgY2F0ZWdvcnlQYWdlVmlzaXRlZCgpOiBPYnNlcnZhYmxlPFByb2ZpbGVUYWdQdXNoRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFNlcnZpY2UuZ2V0KENhdGVnb3J5UGFnZVJlc3VsdHNFdmVudCkucGlwZShcbiAgICAgIHdpdGhMYXRlc3RGcm9tKFxuICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5nZXQoUGFnZUV2ZW50KS5waXBlKFxuICAgICAgICAgIHN0YXJ0V2l0aCg8UGFnZUV2ZW50Pm51bGwpLCAvLyBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RpdmVYL3J4anMvaXNzdWVzLzQ3NzJcbiAgICAgICAgICBwYWlyd2lzZSgpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgKFxuICAgICAgICAgIFtwcmV2aW91c2x5RW1pdHRlZENhdGVnb3J5UGFnZV0sXG4gICAgICAgICAgW2N1cnJlbnRDYXRlZ29yeVBhZ2UsIFtwcmV2aW91c1JvdXRlLCBjdXJyZW50Um91dGVdXVxuICAgICAgICApID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcHJldmlvdXNseUVtaXR0ZWRDYXRlZ29yeVBhZ2UuY2F0ZWdvcnlDb2RlID09PVxuICAgICAgICAgICAgICBjdXJyZW50Q2F0ZWdvcnlQYWdlLmNhdGVnb3J5Q29kZSAmJlxuICAgICAgICAgICAgcHJldmlvdXNSb3V0ZS5uYXZpZ2F0aW9uLnNlbWFudGljUm91dGUgPT09XG4gICAgICAgICAgICAgIGN1cnJlbnRSb3V0ZS5uYXZpZ2F0aW9uLnNlbWFudGljUm91dGVcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIEEgdHJ1ZSBtZWFucyB0aGF0IHRoaXMgaXRlbSBpcyBub3QgdW5pcXVlLCBzbyB0aGlzIGlzIGhhcmQgdG8gd3JhcCB5b3VyIGhlYWQgYXJvdW5kLlxuICAgICAgICAgIC8vIFdoYXQgd2UgYXJlIHNheWluZywgaXMgdGhhdCBpZiB0aGUgY2F0ZWdvcnkgY29kZSBpcyB0aGUgc2FtZSBBTkQgdGhlIGxhc3QgZW1pdHRlZCBzZW1hbnRpYyByb3V0ZSBpcyB0aGVcbiAgICAgICAgICAvLyBzYW1lIHRoZW4gdGhpcyBpcyBhIGR1cGxpY2F0ZSAoaS5lLiB2aWEgYSBmYWNldCBjaGFuZ2UpLiBJbiBvdGhlciB3b3Jkcywgbm8gb3RoZXIgcGFnZSB0eXBlIHdhcyB2aXNpdGVkLFxuICAgICAgICAgIC8vIGFuZCB3ZSBhcmUgb24gdGhlIHNhbWUgY2F0ZWdvcnkgY29kZS5cbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIG1hcChcbiAgICAgICAgKFtjYXRlZ29yeVBhZ2VFdmVudF0pID0+XG4gICAgICAgICAgbmV3IENhdGVnb3J5Vmlld1B1c2hFdmVudCh7XG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnk6IGNhdGVnb3J5UGFnZUV2ZW50LmNhdGVnb3J5Q29kZSxcbiAgICAgICAgICAgIHByb2R1Y3RDYXRlZ29yeU5hbWU6IGNhdGVnb3J5UGFnZUV2ZW50LmNhdGVnb3J5TmFtZSxcbiAgICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVucyB0byBTZWFyY2hQYWdlUmVzdWx0c0V2ZW50IGV2ZW50c1xuICAgKlxuICAgKiBAcmV0dXJucyBhbiBvYnNlcnZhYmxlIGVtaXR0aW5nIGV2ZW50cyB0aGF0IGRlc2NyaWJlIGtleXdvcmQgc2VhcmNoIHBhZ2UgdmlzaXRzIGluIGEgcHJvZmlsdGFnIGNvbXBsaWFudCB3YXlcbiAgICogQHNlZSBTZWFyY2hQYWdlUmVzdWx0c0V2ZW50XG4gICAqIEBzZWUgS2V5d29yZFNlYXJjaFB1c2hFdmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIHNlYXJjaFJlc3VsdHNDaGFuZ2VkKCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZS5nZXQoU2VhcmNoUGFnZVJlc3VsdHNFdmVudCkucGlwZShcbiAgICAgIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkKCdzZWFyY2hUZXJtJyksXG4gICAgICBtYXAoXG4gICAgICAgIChzZWFyY2hFdmVudCkgPT5cbiAgICAgICAgICBuZXcgS2V5d29yZFNlYXJjaFB1c2hFdmVudCh7XG4gICAgICAgICAgICBzZWFyY2hUZXJtOiBzZWFyY2hFdmVudC5zZWFyY2hUZXJtLFxuICAgICAgICAgICAgbnVtUmVzdWx0czogc2VhcmNoRXZlbnQubnVtYmVyT2ZSZXN1bHRzLFxuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIFByb2R1Y3REZXRhaWxzUGFnZUV2ZW50IGV2ZW50c1xuICAgKlxuICAgKiBAcmV0dXJucyBhbiBvYnNlcnZhYmxlIGVtaXR0aW5nIGV2ZW50cyB0aGF0IGRlc2NyaWJlIHByb2R1Y3QgZGV0YWlsIHBhZ2UgdmlzaXRzIGluIGEgcHJvZmlsdGFnIGNvbXBsaWFudCB3YXlcbiAgICogQHNlZSBQcm9kdWN0RGV0YWlsc1BhZ2VFdmVudFxuICAgKiBAc2VlIFByb2R1Y3RWaWV3UHVzaEV2ZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgcHJvZHVjdERldGFpbHNQYWdlVmlldygpOiBPYnNlcnZhYmxlPFByb2ZpbGVUYWdQdXNoRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFNlcnZpY2UuZ2V0KFByb2R1Y3REZXRhaWxzUGFnZUV2ZW50KS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICBuZXcgUHJvZHVjdFZpZXdQdXNoRXZlbnQoe1xuICAgICAgICAgICAgcHJvZHVjdFNrdTogaXRlbS5jb2RlLFxuICAgICAgICAgICAgcHJvZHVjdE5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgIHByb2R1Y3RQcmljZTogaXRlbS5wcmljZSA/IGl0ZW0ucHJpY2UudmFsdWUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnlOYW1lOiBpdGVtLmNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgPyBpdGVtLmNhdGVnb3JpZXNbaXRlbS5jYXRlZ29yaWVzLmxlbmd0aCAtIDFdLm5hbWVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnk6IGl0ZW0uY2F0ZWdvcmllc1xuICAgICAgICAgICAgICA/IGl0ZW0uY2F0ZWdvcmllc1tpdGVtLmNhdGVnb3JpZXMubGVuZ3RoIC0gMV0uY29kZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNhdGVnb3JpZXM6IHRoaXMuY2F0ZWdvcmllc1RvSWRzKGl0ZW0uY2F0ZWdvcmllcyksXG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gUGFnZVZpc2l0ZWQgZXZlbnRzXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgZXZlbnRzIHRoYXQgZGVzY3JpYmUgcGFnZSB2aXNpdHMgaW4gYSBwcm9maWx0YWcgY29tcGxpYW50IHdheVxuICAgKiBAc2VlIFBhZ2VWaXNpdGVkXG4gICAqIEBzZWUgTmF2aWdhdGVkUHVzaEV2ZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgbmF2aWdhdGVkRXZlbnQoKTogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlXG4gICAgICAuZ2V0KFBhZ2VFdmVudClcbiAgICAgIC5waXBlKG1hcCgoKSA9PiBuZXcgTmF2aWdhdGVkUHVzaEV2ZW50KCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIENhcnRQYWdlVmlzaXRlZCBldmVudHNcbiAgICpcbiAgICogQHJldHVybnMgYW4gb2JzZXJ2YWJsZSBlbWl0dGluZyBldmVudHMgdGhhdCBkZXNjcmliZSBjYXJ0IHBhZ2UgdmlzaXRzIGluIGEgcHJvZmlsdGFnIGNvbXBsaWFudCB3YXlcbiAgICogQHNlZSBDYXJ0UGFnZVZpc2l0ZWRcbiAgICogQHNlZSBDYXJ0Vmlld1B1c2hFdmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIGNhcnRQYWdlVmlzaXRlZEV2ZW50KCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgLmdldChDYXJ0UGFnZUV2ZW50KVxuICAgICAgLnBpcGUobWFwKCgpID0+IG5ldyBDYXJ0Vmlld1B1c2hFdmVudCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVucyB0byBIb21lUGFnZUV2ZW50IGV2ZW50c1xuICAgKlxuICAgKiBAcmV0dXJucyBhbiBvYnNlcnZhYmxlIGVtaXR0aW5nIGV2ZW50cyB0aGF0IGRlc2NyaWJlIGhvbWUgcGFnZSB2aXNpdHMgaW4gYSBwcm9maWx0YWcgY29tcGxpYW50IHdheVxuICAgKiBAc2VlIEhvbWVQYWdlRXZlbnRcbiAgICogQHNlZSBIb21lUGFnZVZpZXdQdXNoRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBob21lUGFnZVZpc2l0ZWRFdmVudCgpOiBPYnNlcnZhYmxlPFByb2ZpbGVUYWdQdXNoRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFNlcnZpY2VcbiAgICAgIC5nZXQoSG9tZVBhZ2VFdmVudClcbiAgICAgIC5waXBlKG1hcCgoKSA9PiBuZXcgSG9tZVBhZ2VWaWV3UHVzaEV2ZW50KCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIE9yZGVyUGxhY2VkRXZlbnQgZXZlbnRzXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgZXZlbnRzIHRoYXQgZGVzY3JpYmUgb3JkZXIgY29uZmlybWF0aW9uIHBhZ2UgdmlzaXRzIGluIGEgcHJvZmlsdGFnIGNvbXBsaWFudCB3YXlcbiAgICogQHNlZSBPcmRlclBsYWNlZEV2ZW50XG4gICAqIEBzZWUgT3JkZXJDb25maXJtYXRpb25QdXNoRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBvcmRlckNvbmZpcm1hdGlvblBhZ2VWaXNpdGVkKCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgLmdldChPcmRlclBsYWNlZEV2ZW50KVxuICAgICAgLnBpcGUobWFwKCgpID0+IG5ldyBPcmRlckNvbmZpcm1hdGlvblB1c2hFdmVudCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVucyB0byBAQ2FydEFkZEVudHJ5U3VjY2Vzc0V2ZW50IGV2ZW50cywgdHJhbnNmb3JtcyB0aGVtIHRvIEBBZGRlZFRvQ2FydFB1c2hFdmVudCAuXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgQEFkZGVkVG9DYXJ0UHVzaEV2ZW50IGV2ZW50c1xuICAgKiBAc2VlIENhcnRBZGRFbnRyeVN1Y2Nlc3NFdmVudFxuICAgKiBAc2VlIEFkZGVkVG9DYXJ0UHVzaEV2ZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkZWRUb0NhcnQoKTogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgIG5ldyBBZGRlZFRvQ2FydFB1c2hFdmVudCh7XG4gICAgICAgICAgICBwcm9kdWN0UXR5OiBpdGVtLnF1YW50aXR5QWRkZWQsXG4gICAgICAgICAgICBwcm9kdWN0U2t1OiBpdGVtLmVudHJ5LnByb2R1Y3QuY29kZSxcbiAgICAgICAgICAgIHByb2R1Y3ROYW1lOiBpdGVtLmVudHJ5LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgIGNhcnRJZDogaXRlbS5jYXJ0SWQsXG4gICAgICAgICAgICBjYXJ0Q29kZTogaXRlbS5jYXJ0Q29kZSxcbiAgICAgICAgICAgIHByb2R1Y3RQcmljZTogdGhpcy5nZXRQcm9kdWN0UHJpY2UoaXRlbSksXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiB0aGlzLmNhdGVnb3JpZXNUb0lkcyhpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllcyksXG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnlOYW1lOiBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1xuICAgICAgICAgICAgICA/IGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzW1xuICAgICAgICAgICAgICAgICAgaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgIF0ubmFtZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2R1Y3RDYXRlZ29yeTogaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgPyBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1tcbiAgICAgICAgICAgICAgICAgIGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBdLmNvZGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gQENhcnRSZW1vdmVFbnRyeVN1Y2Nlc3NFdmVudCBldmVudHMsIHRyYW5zZm9ybXMgdGhlbSB0byBAUmVtb3ZlZEZyb21DYXJ0UHVzaEV2ZW50XG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgQFJlbW92ZWRGcm9tQ2FydFB1c2hFdmVudCBldmVudHNcbiAgICogQHNlZSBDYXJ0UmVtb3ZlRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBSZW1vdmVkRnJvbUNhcnRQdXNoRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCByZW1vdmVkRnJvbUNhcnQoKTogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0UmVtb3ZlRW50cnlTdWNjZXNzRXZlbnQpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgIG5ldyBSZW1vdmVkRnJvbUNhcnRQdXNoRXZlbnQoe1xuICAgICAgICAgICAgcHJvZHVjdFNrdTogaXRlbS5lbnRyeS5wcm9kdWN0LmNvZGUsXG4gICAgICAgICAgICBwcm9kdWN0TmFtZTogaXRlbS5lbnRyeS5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICBjYXJ0SWQ6IGl0ZW0uY2FydElkLFxuICAgICAgICAgICAgY2FydENvZGU6IGl0ZW0uY2FydENvZGUsXG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnlOYW1lOiBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1xuICAgICAgICAgICAgICA/IGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzW1xuICAgICAgICAgICAgICAgICAgaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgIF0ubmFtZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2R1Y3RDYXRlZ29yeTogaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgPyBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1tcbiAgICAgICAgICAgICAgICAgIGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBdLmNvZGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiB0aGlzLmNhdGVnb3JpZXNUb0lkcyhpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllcyksXG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gQENhcnRVcGRhdGVFbnRyeVN1Y2Nlc3NFdmVudCBldmVudHMsIHRyYW5zZm9ybXMgdGhlbSB0byBATW9kaWZpZWRDYXJ0UHVzaEV2ZW50XG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgQE1vZGlmaWVkQ2FydFB1c2hFdmVudCBldmVudHNcbiAgICogQHNlZSBDYXJ0VXBkYXRlRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBNb2RpZmllZENhcnRQdXNoRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBtb2RpZmllZENhcnQoKTogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0VXBkYXRlRW50cnlTdWNjZXNzRXZlbnQpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgIG5ldyBNb2RpZmllZENhcnRQdXNoRXZlbnQoe1xuICAgICAgICAgICAgcHJvZHVjdFF0eTogaXRlbS5xdWFudGl0eSxcbiAgICAgICAgICAgIHByb2R1Y3RTa3U6IGl0ZW0uZW50cnkucHJvZHVjdC5jb2RlLFxuICAgICAgICAgICAgcHJvZHVjdE5hbWU6IGl0ZW0uZW50cnkucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgY2FydElkOiBpdGVtLmNhcnRJZCxcbiAgICAgICAgICAgIGNhcnRDb2RlOiBpdGVtLmNhcnRDb2RlLFxuICAgICAgICAgICAgY2F0ZWdvcmllczogdGhpcy5jYXRlZ29yaWVzVG9JZHMoaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXMpLFxuICAgICAgICAgICAgcHJvZHVjdENhdGVnb3J5TmFtZTogaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgPyBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1tcbiAgICAgICAgICAgICAgICAgIGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBdLm5hbWVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnk6IGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzXG4gICAgICAgICAgICAgID8gaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXNbXG4gICAgICAgICAgICAgICAgICBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllcy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgXS5jb2RlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIEBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQgLCBAQ2FydFVwZGF0ZUVudHJ5U3VjY2Vzc0V2ZW50IGFuZCBAQ2FydFJlbW92ZUVudHJ5U3VjY2Vzc0V2ZW50IGV2ZW50cyxcbiAgICogdHJhbnNmb3JtcyB0aGVtIHRvIEBDYXJ0U25hcHNob3RQdXNoRXZlbnQgd2hlbmV2ZXIgdGhlcmUgaXMgYW4gYWN0aXZpdHkgb24gdGhlIGNhcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgQENhcnRTbmFwc2hvdFB1c2hFdmVudCBldmVudHNcbiAgICogQHNlZSBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBDYXJ0VXBkYXRlRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBDYXJ0UmVtb3ZlRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBNZXJnZUNhcnRTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBDYXJ0U25hcHNob3RQdXNoRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBjYXJ0Q2hhbmdlZEV2ZW50KCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiBtZXJnZShcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQpLFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KENhcnRVcGRhdGVFbnRyeVN1Y2Nlc3NFdmVudCksXG4gICAgICB0aGlzLmV2ZW50U2VydmljZS5nZXQoQ2FydFJlbW92ZUVudHJ5U3VjY2Vzc0V2ZW50KSxcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChNZXJnZUNhcnRTdWNjZXNzRXZlbnQpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuYWN0aXZlQ2FydEZhY2FkZS50YWtlQWN0aXZlKCkpLFxuICAgICAgbWFwKFxuICAgICAgICAoY2FydCkgPT5cbiAgICAgICAgICBuZXcgQ2FydFNuYXBzaG90UHVzaEV2ZW50KHtcbiAgICAgICAgICAgIGNhcnQsXG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcm9kdWN0UHJpY2UoZXZlbnQ6IENhcnRBZGRFbnRyeVN1Y2Nlc3NFdmVudCk6IE51bWJlciB7XG4gICAgaWYgKFxuICAgICAgIWV2ZW50LmVudHJ5LnRvdGFsUHJpY2UgfHxcbiAgICAgICFldmVudC5lbnRyeS50b3RhbFByaWNlLnZhbHVlIHx8XG4gICAgICAhZXZlbnQuZW50cnkucXVhbnRpdHlcbiAgICApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUZsb2F0KFxuICAgICAgKGV2ZW50LmVudHJ5LnRvdGFsUHJpY2UudmFsdWUgLyBldmVudC5lbnRyeS5xdWFudGl0eSkudG9GaXhlZCgyKVxuICAgICk7XG4gIH1cbiAgcHJpdmF0ZSBjYXRlZ29yaWVzVG9JZHMoY2F0ZWdvcmllczogQXJyYXk8Q2F0ZWdvcnk+KTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIGNhdGVnb3JpZXMubWFwKChjYXRlZ29yeSkgPT4gY2F0ZWdvcnkuY29kZSk7XG4gIH1cbn1cbiJdfQ==