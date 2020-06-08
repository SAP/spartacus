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
  CategoryPageVisitedEvent,
  KeywordSearchEvent,
  PageVisitedEvent,
  ProductDetailsPageVisitedEvent,
} from 'projects/core/src/routing/event/routing.events';
import { combineLatest, concat, Observable, of } from 'rxjs';
import { filter, map, mapTo, skipWhile, take } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';
import {
  CategoryViewPushEvent,
  KeywordSearchPushEvent,
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
      this.eventService.get(CategoryPageVisitedEvent),
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
      this.eventService.get(KeywordSearchEvent),
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
      this.eventService.get(ProductDetailsPageVisitedEvent),
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

  pageViewEvent(): Observable<ProfileTagEvent> {
    return combineLatest([
      this.eventService.get(PageVisitedEvent),
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

  // personalizationContext(): Observable<boolean> {
  //   return this.personalizationContextService.getPersonalizationContext().pipe(
  //     tap((personalizationContext) => {
  //       this.actions = personalizationContext.actions;
  //       this.segments = personalizationContext.segments;
  //     }),
  //     mapTo(true)
  //   );
  // }
}
