import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import {
  ActiveCartService,
  AuthActions,
  Cart,
  ConsentService,
  EventService,
  PersonalizationContextService,
} from '@spartacus/core';
import {
  CategoryPageVisitedEvent,
  ProductDetailsPageVisitedEvent,
  SearchResultsChangeEvent,
} from 'projects/core/src/routing/event/routing.events';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  mapTo,
  skipWhile,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';

@Injectable({
  providedIn: 'root',
})
export class SpartacusEventService {
  constructor(
    protected consentService: ConsentService,
    protected router: Router,
    protected config: CdsConfig,
    protected activeCartService: ActiveCartService,
    private actionsSubject: ActionsSubject,
    private eventService: EventService,
    private personalizationContextService: PersonalizationContextService
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

  categoryPageVisited(): Observable<any> {
    return this.eventService.get(CategoryPageVisitedEvent);
  }

  searchResultsChanged(): Observable<any> {
    return this.eventService.get(SearchResultsChangeEvent).pipe(
      withLatestFrom(
        this.personalizationContextService.getPersonalizationContext()
      ),
      map(([searchEvent, personalizationContext]) => {
        return {
          name: 'KeywordSearch',
          data: {
            searchTerm: searchEvent.searchTerm,
            numResults: searchEvent.numberOfResults,
            segments: personalizationContext.segments,
            actions: personalizationContext.actions,
          },
        };
      })
    );
  }

  productDetailsPageView(): Observable<any> {
    return this.eventService.get(ProductDetailsPageVisitedEvent).pipe(
      withLatestFrom(
        this.personalizationContextService.getPersonalizationContext()
      ),
      map(([item, personalizationContext]) => ({
        name: 'ProductDetailsPageView',
        data: {
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
        },
      }))
    );
  }
}
