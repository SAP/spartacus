import { combineLatest, merge, Observable } from 'rxjs';
import { CartService, ConsentService } from '@spartacus/core';
import { filter, mapTo, skipWhile, take, tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProfileTagEventTracker } from './profiletag-events';

@Injectable({
  providedIn: 'root',
})
export class SpartacusEventTracker {
  static ProfileConsentTemplateId = 'PROFILE';
  private tracking$: Observable<boolean> = merge(
    this.pageLoaded(),
    this.consentChanged(),
    this.cartChanged()
  );

  constructor(
    private cartService: CartService,
    private consentService: ConsentService,
    private router: Router,
    private profileTagEventTracker: ProfileTagEventTracker
  ) {}

  public getSpartacusTracking() {
    return this.tracking$;
  }

  private pageLoaded(): Observable<boolean> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence({
          event: 'Navigated',
        });
      }),
      mapTo(true)
    );
  }

  /**
   * We are only interested in the first time the ProfileConsent is granted
   */
  private consentChanged(): Observable<boolean> {
    return this.consentService
      .getConsent(SpartacusEventTracker.ProfileConsentTemplateId)
      .pipe(
        filter(Boolean),
        filter(profileConsent => {
          return this.consentService.isConsentGiven(profileConsent);
        }),
        mapTo(true),
        take(1),
        tap(granted => {
          this.profileTagEventTracker.notifyProfileTagOfEventOccurence({
            event: 'ConsentChanged',
            granted,
          });
        })
      );
  }

  /**
   * Listens to the changes to the cart and pushes the event for profiletag to pick it up further.
   */
  private cartChanged(): Observable<boolean> {
    return combineLatest([
      this.cartService.getEntries(),
      this.cartService.getActive(),
    ]).pipe(
      skipWhile(([entries]) => entries.length === 0),
      tap(([entries, cart]) => {
        const cartSnapshotEvent = {
          event: 'CartSnapshot',
          data: { entries, cart },
        };
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
          cartSnapshotEvent
        );
      }),
      mapTo(true)
    );
  }
}
