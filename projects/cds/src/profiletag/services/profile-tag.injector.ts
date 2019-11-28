import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  BaseSiteService,
  Cart,
  CartService,
  ConsentService,
  OrderEntry,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, fromEvent, merge, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  skipWhile,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CdsConfig } from '../../config/index';
import {
  ConsentReferenceEvent,
  DebugEvent,
  ProfileTagEventNames,
  ProfileTagJsConfig,
  ProfileTagWindowObject,
} from '../model/profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjector {
  static ProfileConsentTemplateId = 'PROFILE';
  private profileTagWindow: ProfileTagWindowObject;
  public consentReference = null;
  public profileTagDebug = false;
  private tracking$: Observable<boolean> = merge(
    this.pageLoaded(),
    this.consentChanged(),
    this.cartChanged()
  );
  private profileTagEvents$ = merge(
    this.consentReferenceChanged(),
    this.debugModeChanged()
  );

  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService,
    private router: Router,
    private cartService: CartService,
    private consentService: ConsentService,
    @Inject(PLATFORM_ID) private platform: any
  ) {}

  track(): Observable<boolean> {
    return this.addTracker().pipe(
      switchMap(_ => merge(this.tracking$, this.profileTagEvents$)),
      mapTo(true)
    );
  }

  private pageLoaded(): Observable<boolean> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => {
        this.profileTagWindow.Y_TRACKING.push({ event: 'Navigated' });
      }),
      mapTo(true)
    );
  }

  /**
   * We are only interested in the first time the ProfileConsent is granted
   */
  private consentChanged(): Observable<boolean> {
    return this.consentService
      .getConsent(ProfileTagInjector.ProfileConsentTemplateId)
      .pipe(
        filter(Boolean),
        filter(profileConsent => {
          return this.consentService.isConsentGiven(profileConsent);
        }),
        mapTo(true),
        take(1),
        tap(granted => {
          this.notifyProfileTagOfConsentChange(granted);
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
        this.notifyProfileTagOfCartChange(entries, cart);
      }),
      mapTo(true)
    );
  }

  private notifyProfileTagOfCartChange(
    entries: OrderEntry[],
    cart: Cart
  ): void {
    this.profileTagWindow.Y_TRACKING.push({
      event: 'CartSnapshot',
      data: { entries, cart },
    });
  }

  private notifyProfileTagOfConsentChange(granted: boolean): void {
    this.profileTagWindow.Y_TRACKING.push({ event: 'ConsentChanged', granted });
  }

  private addTracker(): Observable<Event> {
    return this.baseSiteService.getActive().pipe(
      filter(_ => isPlatformBrowser(this.platform)),
      filter((siteId: string) => Boolean(siteId)),
      distinctUntilChanged(),
      tap(_ => this.addScript()),
      tap(_ => this.initWindow()),
      tap((siteId: string) => this.createConfig(siteId)),
      switchMap(_ => this.profileTagLoaded())
    );
  }

  private profileTagLoaded(): Observable<Event> {
    return fromEvent(
      this.winRef.nativeWindow,
      ProfileTagEventNames.LOADED
    ).pipe(take(1));
  }

  private consentReferenceChanged(): Observable<ConsentReferenceEvent> {
    return fromEvent(
      this.winRef.nativeWindow,
      ProfileTagEventNames.CONSENT_REFERENCE_CHANGED
    ).pipe(
      map(event => <ConsentReferenceEvent>event),
      tap(event => (this.consentReference = event.detail.consentReference))
    );
  }

  private debugModeChanged(): Observable<DebugEvent> {
    return fromEvent(
      this.winRef.nativeWindow,
      ProfileTagEventNames.DEBUG_FLAG_CHANGED
    ).pipe(
      map(event => <DebugEvent>event),
      tap(event => (this.profileTagDebug = event.detail.debug))
    );
  }

  private createConfig(siteId: string): void {
    const newConfig: ProfileTagJsConfig = {
      ...this.config.cds.profileTag,
      tenant: this.config.cds.tenant,
      siteId,
      spa: true,
    };
    this.exposeConfig(newConfig);
  }

  private addScript(): void {
    const profileTagScript = this.winRef.document.createElement('script');
    profileTagScript.type = 'text/javascript';
    profileTagScript.async = true;
    profileTagScript.src = this.config.cds.profileTag.javascriptUrl;
    this.winRef.document
      .getElementsByTagName('head')[0]
      .appendChild(profileTagScript);
  }

  private initWindow(): void {
    this.profileTagWindow = <ProfileTagWindowObject>(
      (<unknown>this.winRef.nativeWindow)
    );
    this.profileTagWindow.Y_TRACKING = this.profileTagWindow.Y_TRACKING || {};
  }

  private exposeConfig(options: ProfileTagJsConfig): void {
    const q = this.profileTagWindow.Y_TRACKING.q || [];
    q.push([options]);
    this.profileTagWindow.Y_TRACKING.q = q;
  }
}
