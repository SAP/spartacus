import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  EventService,
  PersonalizationContextService,
} from '@spartacus/core';
import {
  CartPageVisited,
  CategoryPageVisited,
  HomePageVisited,
  KeywordSearchPageVisited,
  OrderConfirmationPageVisited,
  PageVisited,
  ProductDetailsPageVisited,
} from 'projects/core/src/routing/event/routing.events';
import { merge, Observable, of } from 'rxjs';
import { map, skipWhile, withLatestFrom } from 'rxjs/operators';
import {
  CartChangedPushEvent,
  CartViewPushEvent,
  CategoryViewPushEvent,
  HomePageViewPushEvent,
  KeywordSearchPushEvent,
  OrderConfirmationPushEvent,
  PageViewPushEvent,
  ProductViewPushEvent,
  ProfileTagEvent,
} from '../model/profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class SpartacusEventService {
  protected pushEvents$: Observable<ProfileTagEvent> = merge(
    this.categoryPageVisited(),
    this.productDetailsPageView(),
    this.searchResultsChanged(),
    this.homePageVisitedEvent(),
    this.cartPageVisitedEvent(),
    this.pageVisitedEvent(),
    this.orderConfirmationVisited(),
    this.cartChanged()
  );
  constructor(
    protected activeCartService: ActiveCartService,
    protected eventService: EventService,
    protected personalizationContextService: PersonalizationContextService
  ) {}

  getPushEvents(): Observable<ProfileTagEvent> {
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
   * Listens to the changes to the cart and pushes the event for profiletag to pick it up further.
   */
  cartChanged(): Observable<CartChangedPushEvent> {
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

  categoryPageVisited(): Observable<ProfileTagEvent> {
    return this.eventService.get(CategoryPageVisited).pipe(
      map(
        (categoryPageVisited) =>
          new CategoryViewPushEvent({
            productCategory: categoryPageVisited.categoryCode,
            productCategoryName: categoryPageVisited.categoryName,
          })
      )
    );
  }

  searchResultsChanged(): Observable<ProfileTagEvent> {
    return this.eventService.get(KeywordSearchPageVisited).pipe(
      map((searchEvent) => {
        return new KeywordSearchPushEvent({
          searchTerm: searchEvent.searchTerm,
          numResults: searchEvent.numberOfResults,
        });
      })
    );
  }

  productDetailsPageView(): Observable<ProfileTagEvent> {
    return this.eventService.get(ProductDetailsPageVisited).pipe(
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

  pageVisitedEvent(): Observable<ProfileTagEvent> {
    return this.eventService
      .get(PageVisited)
      .pipe(map((_) => new PageViewPushEvent()));
  }
  cartPageVisitedEvent(): Observable<ProfileTagEvent> {
    return this.eventService
      .get(CartPageVisited)
      .pipe(map((_) => new CartViewPushEvent()));
  }

  homePageVisitedEvent(): Observable<ProfileTagEvent> {
    return this.eventService
      .get(HomePageVisited)
      .pipe(map((_) => new HomePageViewPushEvent()));
  }

  orderConfirmationVisited(): Observable<ProfileTagEvent> {
    return this.eventService
      .get(OrderConfirmationPageVisited)
      .pipe(map((_) => new OrderConfirmationPushEvent()));
  }
}
