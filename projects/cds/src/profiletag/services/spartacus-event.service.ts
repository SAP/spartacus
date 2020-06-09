import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import {
  ActiveCartService,
  AuthActions,
  Cart,
  ConsentService,
  EventService,
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
import { Observable } from 'rxjs';
import { filter, map, mapTo, skipWhile, take } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';
import {
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
  constructor(
    protected consentService: ConsentService,
    protected router: Router,
    protected config: CdsConfig,
    protected activeCartService: ActiveCartService,
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService
  ) {}

  navigated(): Observable<boolean> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      mapTo(true)
    );
  }

  /**
   * We are only interested in the first time the ProfileConsent is granted
   */
  consentGranted(): Observable<boolean> {
    return this.consentService
      .getConsent(this.config.cds.consentTemplateId)
      .pipe(
        filter(Boolean),
        filter((profileConsent) => {
          return this.consentService.isConsentGiven(profileConsent);
        }),
        mapTo(true),
        take(1)
      );
  }

  /**
   * Listens to the changes to the cart and pushes the event for profiletag to pick it up further.
   */
  cartChanged(): Observable<{ cart: Cart }> {
    return this.activeCartService.getActive().pipe(
      skipWhile((cart) => !Boolean(cart.entries) || cart.entries.length === 0),
      map((cart) => ({
        cart,
      }))
    );
  }

  loginSuccessful(): Observable<boolean> {
    return this.actionsSubject.pipe(
      filter((action) => action.type === AuthActions.LOGIN),
      mapTo(true)
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
