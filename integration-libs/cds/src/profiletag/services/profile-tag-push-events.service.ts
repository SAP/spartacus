import { Injectable } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
  Category,
  EventService,
  OrderPlacedEvent,
} from '@spartacus/core';
import {
  CartPageEvent,
  CategoryPageResultsEvent,
  HomePageEvent,
  PageEvent,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from '@spartacus/storefront';
import { PersonalizationContextService } from '@spartacus/tracking/personalization/core';
import { merge, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  mapTo,
  pairwise,
  startWith,
  withLatestFrom,
} from 'rxjs/operators';
import {
  AddedToCartPushEvent,
  CartViewPushEvent,
  CategoryViewPushEvent,
  HomePageViewPushEvent,
  KeywordSearchPushEvent,
  ModifiedCartPushEvent,
  NavigatedPushEvent,
  OrderConfirmationPushEvent,
  ProductViewPushEvent,
  ProfileTagPushEvent,
  RemovedFromCartPushEvent,
} from '../model/profile-tag.model';

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
@Injectable({
  providedIn: 'root',
})
export class ProfileTagPushEventsService {
  private pushEvents$: Observable<ProfileTagPushEvent> = merge(
    this.categoryPageVisited(),
    this.productDetailsPageView(),
    this.searchResultsChanged(),
    this.homePageVisitedEvent(),
    this.cartPageVisitedEvent(),
    this.navigatedEvent(),
    this.orderConfirmationPageVisited(),
    this.addedToCart(),
    this.removedFromCart(),
    this.modifiedCart()
  );

  constructor(
    protected eventService: EventService,
    protected personalizationContextService: PersonalizationContextService
  ) {}

  /**
   * Returns a push event emitting observable that emits all converted events emitted by the event or the active cart service.
   * These events are enriched with segments and actions from the latest personalization context.
   *
   * @returns an observable emitting profiletag push events
   */
  getPushEvents(): Observable<ProfileTagPushEvent> {
    return this.pushEvents$.pipe(
      withLatestFrom(
        merge(
          of({ segments: undefined, actions: undefined }),
          this.personalizationContextService.getPersonalizationContext()
        )
      ),
      map(([item, personalizationContext]) => {
        item.data = item.data ? item.data : {};
        item.data.segments = personalizationContext?.segments;
        item.data.actions = personalizationContext?.actions;
        return item;
      })
    );
  }

  /**
   * Adds a new push event emitting observable to this service. This observable will be merged with the internal one.
   * This method can be used to extend the functionality of this service at runtime.
   *
   * @param event an observable emitting profiltag push events
   */
  addPushEvent(event: Observable<ProfileTagPushEvent>): void {
    this.pushEvents$ = merge(this.pushEvents$, event);
  }

  /**
   * Emits the category page visited event.
   *
   * @returns an observable emitting events that describe category page visits in a profiltag compliant way
   * @see CategoryPageResultsEvent
   * @see CategoryViewPushEvent
   */

  protected categoryPageVisited(): Observable<ProfileTagPushEvent> {
    return this.eventService.get(CategoryPageResultsEvent).pipe(
      withLatestFrom(
        this.eventService.get(PageEvent).pipe(
          startWith(<PageEvent>null), // https://github.com/ReactiveX/rxjs/issues/4772
          pairwise()
        )
      ),
      distinctUntilChanged(
        (
          [previouslyEmittedCategoryPage],
          [currentCategoryPage, [previousRoute, currentRoute]]
        ) => {
          return (
            previouslyEmittedCategoryPage.categoryCode ===
              currentCategoryPage.categoryCode &&
            previousRoute.semanticRoute === currentRoute.semanticRoute
          ); // A true means that this item is not unique, so this is hard to wrap your head around.
          // What we are saying, is that if the categoryCode is the same AND the last emitted semantic route is the same
          // then this is a duplicate (I.E. via a facet change). In other words, no other page type was visited, and we are on the same categorycode
        }
      ),
      map(
        ([categoryPageEvent]) =>
          new CategoryViewPushEvent({
            productCategory: categoryPageEvent.categoryCode,
            productCategoryName: categoryPageEvent.categoryName,
          })
      )
    );
  }

  /**
   * Listens to SearchPageResultsEvent events
   *
   * @returns an observable emitting events that describe keyword search page visits in a profiltag compliant way
   * @see SearchPageResultsEvent
   * @see KeywordSearchPushEvent
   */
  protected searchResultsChanged(): Observable<ProfileTagPushEvent> {
    return this.eventService.get(SearchPageResultsEvent).pipe(
      distinctUntilKeyChanged('searchTerm'),
      map(
        (searchEvent) =>
          new KeywordSearchPushEvent({
            searchTerm: searchEvent.searchTerm,
            numResults: searchEvent.numberOfResults,
          })
      )
    );
  }

  /**
   * Listens to ProductDetailsPageEvent events
   *
   * @returns an observable emitting events that describe product detail page visits in a profiltag compliant way
   * @see ProductDetailsPageEvent
   * @see ProductViewPushEvent
   */
  protected productDetailsPageView(): Observable<ProfileTagPushEvent> {
    return this.eventService.get(ProductDetailsPageEvent).pipe(
      map(
        (item) =>
          new ProductViewPushEvent({
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
          })
      )
    );
  }

  /**
   * Listens to PageVisited events
   *
   * @returns an observable emitting events that describe page visits in a profiltag compliant way
   * @see PageVisited
   * @see NavigatedPushEvent
   */
  protected navigatedEvent(): Observable<ProfileTagPushEvent> {
    return this.eventService
      .get(PageEvent)
      .pipe(mapTo(new NavigatedPushEvent()));
  }

  /**
   * Listens to CartPageVisited events
   *
   * @returns an observable emitting events that describe cart page visits in a profiltag compliant way
   * @see CartPageVisited
   * @see CartViewPushEvent
   */
  protected cartPageVisitedEvent(): Observable<ProfileTagPushEvent> {
    return this.eventService
      .get(CartPageEvent)
      .pipe(mapTo(new CartViewPushEvent()));
  }

  /**
   * Listens to HomePageEvent events
   *
   * @returns an observable emitting events that describe home page visits in a profiltag compliant way
   * @see HomePageEvent
   * @see HomePageViewPushEvent
   */
  protected homePageVisitedEvent(): Observable<ProfileTagPushEvent> {
    return this.eventService
      .get(HomePageEvent)
      .pipe(mapTo(new HomePageViewPushEvent()));
  }

  /**
   * Listens to OrderPlacedEvent events
   *
   * @returns an observable emitting events that describe order confirmation page visits in a profiltag compliant way
   * @see OrderPlacedEvent
   * @see OrderConfirmationPushEvent
   */
  protected orderConfirmationPageVisited(): Observable<ProfileTagPushEvent> {
    return this.eventService
      .get(OrderPlacedEvent)
      .pipe(mapTo(new OrderConfirmationPushEvent()));
  }

  /**
   * Listens to CartAddEntrySuccessEvent events, transforms them to AddedToCartPushEvent.
   *
   * @returns an observable emitting AddedToCartPushEvent events
   * @see CartAddEntrySuccessEvent
   * @see AddedToCartPushEvent
   */
  protected addedToCart(): Observable<ProfileTagPushEvent> {
    return this.eventService.get(CartAddEntrySuccessEvent).pipe(
      map(
        (item) =>
          new AddedToCartPushEvent({
            productQty: item.quantityAdded,
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            productPrice: this.getProductPrice(item),
            categories: this.categoriesToIds(item.entry.product.categories),
            productCategoryName: item.entry.product.categories
              ? item.entry.product.categories[
                  item.entry.product.categories.length - 1
                ].name
              : undefined,
            productCategory: item.entry.product.categories
              ? item.entry.product.categories[
                  item.entry.product.categories.length - 1
                ].code
              : undefined,
          })
      )
    );
  }

  /**
   * Listens to @CartRemoveEntrySuccessEvent events, transforms them to @RemovedFromCartPushEvent
   *
   * @returns an observable emitting @RemovedFromCartPushEvent events
   * @see CartRemoveEntrySuccessEvent
   * @see RemovedFromCartPushEvent
   */
  protected removedFromCart(): Observable<ProfileTagPushEvent> {
    return this.eventService.get(CartRemoveEntrySuccessEvent).pipe(
      map(
        (item) =>
          new RemovedFromCartPushEvent({
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            productCategoryName: item.entry.product.categories
              ? item.entry.product.categories[
                  item.entry.product.categories.length - 1
                ].name
              : undefined,
            productCategory: item.entry.product.categories
              ? item.entry.product.categories[
                  item.entry.product.categories.length - 1
                ].code
              : undefined,
            categories: this.categoriesToIds(item.entry.product.categories),
          })
      )
    );
  }

  /**
   * Listens to @CartUpdateEntrySuccessEvent events, transforms them to @ModifiedCartPushEvent
   *
   * @returns an observable emitting @RemovedFromCartPushEvent events
   * @see CartRemoveEntrySuccessEvent
   * @see ModifiedCartPushEvent
   */
  protected modifiedCart(): Observable<ProfileTagPushEvent> {
    return this.eventService.get(CartUpdateEntrySuccessEvent).pipe(
      map(
        (item) =>
          new ModifiedCartPushEvent({
            productQty: item.quantity,
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            categories: this.categoriesToIds(item.entry.product.categories),
            productCategoryName: item.entry.product.categories
              ? item.entry.product.categories[
                  item.entry.product.categories.length - 1
                ].name
              : undefined,
            productCategory: item.entry.product.categories
              ? item.entry.product.categories[
                  item.entry.product.categories.length - 1
                ].code
              : undefined,
          })
      )
    );
  }

  private getProductPrice(event: CartAddEntrySuccessEvent): Number {
    if (
      !event.entry.totalPrice ||
      !event.entry.totalPrice.value ||
      !event.entry.quantity
    ) {
      return undefined;
    }
    return parseFloat(
      (event.entry.totalPrice.value / event.entry.quantity).toFixed(2)
    );
  }
  private categoriesToIds(categories: Array<Category>): Array<string> {
    return categories.map((category) => category.code);
  }
}
