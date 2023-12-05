import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { PersonalizationContextService } from '@spartacus/tracking/personalization/core';
import { Observable } from 'rxjs';
import { ProfileTagPushEvent } from '../model/profile-tag.model';
import * as i0 from "@angular/core";
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
export declare class ProfileTagPushEventsService {
    protected eventService: EventService;
    protected personalizationContextService: PersonalizationContextService;
    protected activeCartFacade: ActiveCartFacade;
    private pushEvents$;
    constructor(eventService: EventService, personalizationContextService: PersonalizationContextService, activeCartFacade: ActiveCartFacade);
    /**
     * Returns a push event emitting observable that emits all converted events emitted by the event or the active cart service.
     * These events are enriched with segments and actions from the latest personalization context.
     *
     * @returns an observable emitting profiletag push events
     */
    getPushEvents(): Observable<ProfileTagPushEvent>;
    /**
     * Adds a new push event emitting observable to this service. This observable will be merged with the internal one.
     * This method can be used to extend the functionality of this service at runtime.
     *
     * @param event an observable emitting profiltag push events
     */
    addPushEvent(event: Observable<ProfileTagPushEvent>): void;
    /**
     * Emits the category page visited event.
     *
     * @returns an observable emitting events that describe category page visits in a profiltag compliant way
     * @see CategoryPageResultsEvent
     * @see CategoryViewPushEvent
     */
    protected categoryPageVisited(): Observable<ProfileTagPushEvent>;
    /**
     * Listens to SearchPageResultsEvent events
     *
     * @returns an observable emitting events that describe keyword search page visits in a profiltag compliant way
     * @see SearchPageResultsEvent
     * @see KeywordSearchPushEvent
     */
    protected searchResultsChanged(): Observable<ProfileTagPushEvent>;
    /**
     * Listens to ProductDetailsPageEvent events
     *
     * @returns an observable emitting events that describe product detail page visits in a profiltag compliant way
     * @see ProductDetailsPageEvent
     * @see ProductViewPushEvent
     */
    protected productDetailsPageView(): Observable<ProfileTagPushEvent>;
    /**
     * Listens to PageVisited events
     *
     * @returns an observable emitting events that describe page visits in a profiltag compliant way
     * @see PageVisited
     * @see NavigatedPushEvent
     */
    protected navigatedEvent(): Observable<ProfileTagPushEvent>;
    /**
     * Listens to CartPageVisited events
     *
     * @returns an observable emitting events that describe cart page visits in a profiltag compliant way
     * @see CartPageVisited
     * @see CartViewPushEvent
     */
    protected cartPageVisitedEvent(): Observable<ProfileTagPushEvent>;
    /**
     * Listens to HomePageEvent events
     *
     * @returns an observable emitting events that describe home page visits in a profiltag compliant way
     * @see HomePageEvent
     * @see HomePageViewPushEvent
     */
    protected homePageVisitedEvent(): Observable<ProfileTagPushEvent>;
    /**
     * Listens to OrderPlacedEvent events
     *
     * @returns an observable emitting events that describe order confirmation page visits in a profiltag compliant way
     * @see OrderPlacedEvent
     * @see OrderConfirmationPushEvent
     */
    protected orderConfirmationPageVisited(): Observable<ProfileTagPushEvent>;
    /**
     * Listens to @CartAddEntrySuccessEvent events, transforms them to @AddedToCartPushEvent .
     *
     * @returns an observable emitting @AddedToCartPushEvent events
     * @see CartAddEntrySuccessEvent
     * @see AddedToCartPushEvent
     */
    protected addedToCart(): Observable<ProfileTagPushEvent>;
    /**
     * Listens to @CartRemoveEntrySuccessEvent events, transforms them to @RemovedFromCartPushEvent
     *
     * @returns an observable emitting @RemovedFromCartPushEvent events
     * @see CartRemoveEntrySuccessEvent
     * @see RemovedFromCartPushEvent
     */
    protected removedFromCart(): Observable<ProfileTagPushEvent>;
    /**
     * Listens to @CartUpdateEntrySuccessEvent events, transforms them to @ModifiedCartPushEvent
     *
     * @returns an observable emitting @ModifiedCartPushEvent events
     * @see CartUpdateEntrySuccessEvent
     * @see ModifiedCartPushEvent
     */
    protected modifiedCart(): Observable<ProfileTagPushEvent>;
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
    protected cartChangedEvent(): Observable<ProfileTagPushEvent>;
    private getProductPrice;
    private categoriesToIds;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProfileTagPushEventsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProfileTagPushEventsService>;
}
