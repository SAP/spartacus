import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Cart, CartService, ConsentService, OrderEntry } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, skipWhile, take } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';

@Injectable({
  providedIn: 'root',
})
export class SpartacusEventService {
  constructor(
    private cartService: CartService,
    private consentService: ConsentService,
    private router: Router,
    private config: CdsConfig
  ) {}

  navigated(): Observable<boolean> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
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
        filter(profileConsent => {
          return this.consentService.isConsentGiven(profileConsent);
        }),
        mapTo(true),
        take(1)
      );
  }

  /**
   * Listens to the changes to the cart and pushes the event for profiletag to pick it up further.
   */
  cartChanged(): Observable<{ entries: OrderEntry[]; cart: Cart }> {
    return combineLatest([
      this.cartService.getEntries(),
      this.cartService.getActive(),
    ]).pipe(
      skipWhile(([entries]) => entries.length === 0),
      map(([entries, cart]) => ({
        entries,
        cart,
      }))
    );
  }
}
