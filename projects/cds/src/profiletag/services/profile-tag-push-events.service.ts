import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  EventService,
  OrderPlacedEvent,
  PageType,
  PersonalizationContextService,
  ProductSearchService,
} from '@spartacus/core';
import {
  CartPageEvent,
  HomePageEvent,
  PageEvent,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from '@spartacus/storefront';
import { merge, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  mapTo,
  skip,
  skipWhile,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import {
  BrandPageVisitedEvent,
  CartChangedPushEvent,
  CartViewPushEvent,
  CategoryViewPushEvent,
  HomePageViewPushEvent,
  KeywordSearchPushEvent,
  NavigatedPushEvent,
  OrderConfirmationPushEvent,
  ProductViewPushEvent,
  ProfileTagPushEvent,
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
 *
 * Currently supported events from the active cart service:
 * - any event
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
    this.buildBrandPageVisitedEvent(),
    this.navigatedEvent(),
    this.orderConfirmationPageVisited(),
    this.cartChanged()
  );

  constructor(
    protected activeCartService: ActiveCartService,
    protected eventService: EventService,
    protected personalizationContextService: PersonalizationContextService,
    protected productSearchService: ProductSearchService
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
        item.data.segments = personalizationContext.segments;
        item.data.actions = personalizationContext.actions;
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
   * Listens to the changes to the cart and pushes the events for profiletag to pick them up further.
   *
   * @returns an observable emitting events that describe cart changes in a profiltag compliant way
   * @see CartChangedPushEvent
   */
  protected cartChanged(): Observable<ProfileTagPushEvent> {
    return this.activeCartService.getActive().pipe(
      skipWhile((cart) => !Boolean(cart.entries) || cart.entries.length === 0),
      map(
        (cart) =>
          new CartChangedPushEvent({
            cart,
          })
      )
    );
  }

  /**
   * Emits the category page visited event.
   *
   * @returns an observable emitting events that describe category page visits in a profiltag compliant way
   * @see CategoryPageResultsEvent
   * @see CategoryViewPushEvent
   */
  // TODO:#cds - add a test. maybe cover the following cases:
  // 1. it should emit the event when switching between categories. double check if the emitted category ID is being updated
  // 2. it should not emit when changing facets / sorting / paging
  // 3. when navigating from a category page to another page (e.g. home) and then back to the same category, the event should be emitted
  protected categoryPageVisited(): Observable<ProfileTagPushEvent> {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1),
      // prevent emissions from the search results (changing facets, sorting order or paging)
      take(1)
    );

    const categoryPageEvent$ = this.eventService.get(PageEvent).pipe(
      distinctUntilChanged(
        (prev, curr) =>
          prev.context?.type === PageType.CATEGORY_PAGE &&
          curr.context?.type === PageType.CATEGORY_PAGE &&
          prev.context?.id === curr.context?.id
      ),
      filter((pageEvent) => pageEvent.semanticRoute === 'category')
    );

    return categoryPageEvent$.pipe(
      switchMap((categoryPageEvent) =>
        searchResults$.pipe(
          map(
            (searchResults) =>
              new CategoryViewPushEvent({
                productCategory: categoryPageEvent.context?.id,
                productCategoryName:
                  searchResults.breadcrumbs?.[0].facetValueName,
              })
          )
        )
      )
    );
  }

  /**
   * Listens to SearchPageResultsEvent events, parses and pushes them to profiletag to pick them up further.
   *
   * @returns an observable emitting events that describe keyword search page visits in a profiltag compliant way
   * @see SearchPageResultsEvent
   * @see KeywordSearchPushEvent
   */
  protected searchResultsChanged(): Observable<ProfileTagPushEvent> {
    return this.eventService.get(SearchPageResultsEvent).pipe(
      distinctUntilKeyChanged('searchTerm'),
      map((searchEvent) => {
        return new KeywordSearchPushEvent({
          searchTerm: searchEvent.searchTerm,
          numResults: searchEvent.numberOfResults,
        });
      })
    );
  }

  /**
   * Listens to ProductDetailsPageEvent events, parses and pushes them to profiletag to pick them up further.
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
          })
      )
    );
  }

  /**
   * Listens to PageVisited events, parses and pushes them to profiletag to pick them up further.
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
   * Listens to CartPageVisited events, parses and pushes them to profiletag to pick them up further.
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
   * Listens to BrandPageVisitedEvent events, parses and pushes them to profiletag to pick them up further.
   *
   * @returns an observable emitting events that describe brand page visits in a profiltag compliant way
   * @see CartPageVisited
   * @see CartViewPushEvent
   */
  // TODO:#cds - add a test. If not sure how to test, please check `projects/storefrontlib/src/events/product/product-page-event.builder.spec.ts`
  protected buildBrandPageVisitedEvent(): Observable<BrandPageVisitedEvent> {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1),
      // prevent emissions from the search results (changing facets, sorting order or paging)
      take(1)
    );

    const brandPageEvent$ = this.eventService.get(PageEvent).pipe(
      distinctUntilChanged(
        (prev, curr) =>
          prev.context?.type === PageType.CATEGORY_PAGE &&
          curr.context?.type === PageType.CATEGORY_PAGE &&
          prev.context?.id === curr.context?.id
      ),
      filter((pageEvent) => pageEvent.semanticRoute === 'brand')
    );

    return brandPageEvent$.pipe(
      switchMap((brandPageEvent) =>
        searchResults$.pipe(
          map(
            (searchResults) =>
              new BrandPageVisitedEvent({
                brandCode: brandPageEvent.context?.id,
                brandName: searchResults.breadcrumbs?.[0].facetValueName,
              })
          )
        )
      )
    );
  }

  /**
   * Listens to HomePageEvent events, parses and pushes them to profiletag to pick them up further.
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
   * Listens to OrderPlacedEvent events, parses and pushes them to profiletag to pick them up further.
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
}
