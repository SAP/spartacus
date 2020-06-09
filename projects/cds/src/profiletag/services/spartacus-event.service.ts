import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import {
  ActiveCartService,
  AuthActions,
  Cart,
  ConsentService,
  EventService,
  PersonalizationContext,
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
import { combineLatest, concat, Observable, of } from 'rxjs';
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
  personalizationContext$: Observable<PersonalizationContext>;
  constructor(
    protected consentService: ConsentService,
    protected router: Router,
    protected config: CdsConfig,
    protected activeCartService: ActiveCartService,
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService,
    protected personalizationContextService: PersonalizationContextService
  ) {
    this.personalizationContext$ = concat(
      of({ actions: undefined, segments: undefined }),
      this.personalizationContextService.getPersonalizationContext()
    );
  }

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
    return combineLatest([
      this.eventService.get(CategoryPageVisited),
      this.personalizationContext$,
    ]).pipe(
      map(
        ([categoryPageVisited, personalizationContext]) =>
          new CategoryViewPushEvent({
            productCategory: categoryPageVisited.categoryCode,
            productCategoryName: categoryPageVisited.categoryName,
            segments: personalizationContext.segments,
            actions: personalizationContext.actions,
          })
      )
    );
  }

  searchResultsChanged(): Observable<ProfileTagEvent> {
    return combineLatest([
      this.eventService.get(KeywordSearchPageVisited),
      this.personalizationContext$,
    ]).pipe(
      map(([searchEvent, personalizationContext]) => {
        return new KeywordSearchPushEvent({
          searchTerm: searchEvent.searchTerm,
          numResults: searchEvent.numberOfResults,
          segments: personalizationContext.segments,
          actions: personalizationContext.actions,
        });
      })
    );
  }

  productDetailsPageView(): Observable<ProfileTagEvent> {
    return combineLatest([
      this.eventService.get(ProductDetailsPageVisited),
      this.personalizationContext$,
    ]).pipe(
      map(
        ([item, personalizationContext]) =>
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
            segments: personalizationContext.segments,
            actions: personalizationContext.actions,
          })
      )
    );
  }

  pageVisitedEvent(): Observable<ProfileTagEvent> {
    return combineLatest([
      this.eventService.get(PageVisited),
      this.personalizationContext$,
    ]).pipe(
      map(
        ([_, personalizationContext]) =>
          new PageViewPushEvent({
            segments: personalizationContext.segments,
            actions: personalizationContext.actions,
          })
      )
    );
  }
  cartPageVisitedEvent(): Observable<ProfileTagEvent> {
    return combineLatest([
      this.eventService.get(CartPageVisited),
      this.personalizationContext$,
    ]).pipe(
      map(
        ([_, personalizationContext]) =>
          new CartViewPushEvent({
            segments: personalizationContext.segments,
            actions: personalizationContext.actions,
          })
      )
    );
  }

  homePageVisitedEvent(): Observable<ProfileTagEvent> {
    return combineLatest([
      this.eventService.get(HomePageVisited),
      this.personalizationContext$,
    ]).pipe(
      map(
        ([_, personalizationContext]) =>
          new HomePageViewPushEvent({
            segments: personalizationContext.segments,
            actions: personalizationContext.actions,
          })
      )
    );
  }

  orderConfirmationVisited(): Observable<ProfileTagEvent> {
    return combineLatest([
      this.eventService.get(OrderConfirmationPageVisited),
      this.personalizationContext$,
    ]).pipe(
      map(
        ([_, personalizationContext]) =>
          new OrderConfirmationPushEvent({
            segments: personalizationContext.segments,
            actions: personalizationContext.actions,
          })
      )
    );
  }
}
