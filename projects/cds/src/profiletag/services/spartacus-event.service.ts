import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActiveCartService, Cart, ConsentService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, mapTo, skipWhile, take } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';

@Injectable({
  providedIn: 'root',
})
export class SpartacusEventService {
  constructor(
    protected consentService: ConsentService,
    protected router: Router,
    protected config: CdsConfig,
    protected activeCartService: ActiveCartService
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
}
