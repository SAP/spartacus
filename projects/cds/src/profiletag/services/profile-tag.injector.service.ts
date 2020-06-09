import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { filter, mapTo, switchMap, tap } from 'rxjs/operators';
import { CdsBackendConnector } from '../connectors/cds-backend-connector';
import {
  CartChangedPushEvent,
  ConsentChangedPushEvent,
  NavigatedPushEvent,
} from '../model/profile-tag.model';
import { ProfileTagEventService } from './profiletag-event.service';
import { SpartacusEventService } from './spartacus-event.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjectorService {
  private profileTagEvents$ = this.profileTagEventTracker.getProfileTagEvents();
  private injectionsEvents$: Observable<boolean> = merge(
    this.notifyProfileTagOfConsentGranted(),
    this.notifyProfileTagOfCartChange(),
    this.notifyProfileTagOfPageLoaded(),
    this.notifyEcOfLoginSuccessful(),
    this.notifyProductDetailsView(),
    this.notifyCategoryPageVisited(),
    this.notifySearchResultsChanged(),
    this.notifyHomePageView(),
    this.notifyPageVisited(),
    this.notifyCartPageVisitedEvent(),
    this.notifyOrderConfirmationVisited()
  );

  constructor(
    private profileTagEventTracker: ProfileTagEventService,
    private spartacusEventTracker: SpartacusEventService,
    private cdsBackendConnector: CdsBackendConnector
  ) {}

  track(): Observable<boolean> {
    return this.profileTagEventTracker.addTracker().pipe(
      switchMap(() => merge(this.injectionsEvents$, this.profileTagEvents$)),
      mapTo(true)
    );
  }

  private notifyProfileTagOfConsentGranted(): Observable<boolean> {
    return this.spartacusEventTracker.consentGranted().pipe(
      filter((granted) => Boolean(granted)),
      tap((granted) => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
          new ConsentChangedPushEvent(granted)
        );
      })
    );
  }

  private notifyProfileTagOfCartChange(): Observable<boolean> {
    return this.spartacusEventTracker.cartChanged().pipe(
      tap((cart) => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
          new CartChangedPushEvent(cart)
        );
      }),
      mapTo(true)
    );
  }

  private notifyProfileTagOfPageLoaded(): Observable<boolean> {
    return this.spartacusEventTracker.navigated().pipe(
      tap(() => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
          new NavigatedPushEvent()
        );
      })
    );
  }

  private notifyEcOfLoginSuccessful(): Observable<boolean> {
    return this.spartacusEventTracker.loginSuccessful().pipe(
      switchMap((_) => {
        return this.cdsBackendConnector
          .notifySuccessfulLogin()
          .pipe(mapTo(true));
      })
    );
  }

  private notifyCategoryPageVisited(): Observable<boolean> {
    return this.spartacusEventTracker
      .categoryPageVisited()
      .pipe(
        tap((item) => {
          console.log(item);
          this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item);
        })
      )
      .pipe(mapTo(true));
  }

  private notifyProductDetailsView(): Observable<boolean> {
    return this.spartacusEventTracker
      .productDetailsPageView()
      .pipe(
        tap((item) => {
          this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item);
        })
      )
      .pipe(mapTo(true));
  }

  private notifySearchResultsChanged(): Observable<boolean> {
    return this.spartacusEventTracker
      .searchResultsChanged()
      .pipe(
        tap((item) => {
          this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item);
        })
      )
      .pipe(mapTo(true));
  }

  private notifyHomePageView(): Observable<boolean> {
    return this.spartacusEventTracker.homePageVisitedEvent().pipe(
      tap((item) => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item);
      }),
      mapTo(true)
    );
  }
  private notifyCartPageVisitedEvent(): Observable<boolean> {
    return this.spartacusEventTracker.cartPageVisitedEvent().pipe(
      tap((_) => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item);
      }),
      mapTo(true)
    );
  }
  private notifyPageVisited(): Observable<boolean> {
    return this.spartacusEventTracker.pageVisitedEvent().pipe(
      tap((item) => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item);
      }),
      mapTo(true)
    );
  }
  private notifyOrderConfirmationVisited(): Observable<boolean> {
    return this.spartacusEventTracker.orderConfirmationVisited().pipe(
      tap((item) => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item);
      }),
      mapTo(true)
    );
  }
}
