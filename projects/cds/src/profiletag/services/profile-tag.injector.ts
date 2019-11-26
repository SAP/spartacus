import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
<<<<<<< HEAD
import { NavigationEnd, Router } from '@angular/router';
import {
  BaseSiteService,
  CartService,
  ConsentService,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, fromEventPattern, merge, Observable } from 'rxjs';
=======
import { Event as NgRouterEvent, NavigationEnd, Router } from '@angular/router';
import { BaseSiteService, ConsentService, WindowRef } from '@spartacus/core';
import { fromEventPattern, merge, Observable } from 'rxjs';
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
<<<<<<< HEAD
  skipWhile,
=======
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
<<<<<<< HEAD
import { CdsConfig } from '../../config';
=======
import { CdsConfig } from '../../config/index';
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
import {
  ProfileTagEvent,
  ProfileTagEventNames,
  ProfileTagJsConfig,
  ProfileTagWindowObject,
} from '../model/profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjector {
  static ProfileConsentTemplateId = 'PROFILE';
  private w: ProfileTagWindowObject;
<<<<<<< HEAD
  private tracking$: Observable<boolean> = merge(
=======
  public consentReference = null;
  public profileTagDebug = false;
  private tracking$: Observable<boolean | NgRouterEvent> = merge(
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
    this.pageLoaded(),
    this.consentChanged(),
    this.cartChanged()
  );
  public consentReference = null;
  public profileTagDebug = false;

  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService,
    private router: Router,
<<<<<<< HEAD
    private cartService: CartService,
=======
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
    private consentService: ConsentService,
    @Inject(PLATFORM_ID) private platform: any
  ) {}

  track(): Observable<boolean> {
    return this.addTracker().pipe(
      tap(event => this.setEventVariables(event)),
      filter(
        profileTagEvent => profileTagEvent.name === ProfileTagEventNames.Loaded
      ),
      switchMap(_ => this.tracking$),
      map(data => Boolean(data))
    );
  }

<<<<<<< HEAD
  private setEventVariables(event: ProfileTagEvent) {
=======
  private setEventVariables(event: ProfileTagEvent): void {
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
    switch (event.name) {
      case ProfileTagEventNames.ConsentReferenceChanged:
        this.consentReference = event.data.consentReference;
        break;
      case ProfileTagEventNames.ProfileTagDebug:
        this.profileTagDebug = event.data.debug;
        break;
      default:
        break;
    }
  }

<<<<<<< HEAD
  private pageLoaded(): Observable<boolean> {
=======
  private pageLoaded(): Observable<NgRouterEvent> {
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => {
        this.w.Y_TRACKING.push({ event: 'Navigated' });
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
        tap(() => {
          this.notifyProfileTagOfConsentChange({ granted: true });
        })
      );
  }

  /**
   * Listens to the changes to the cart and pushes the event for profiletag to pick it up further.
   */
  private cartChanged(): Observable<boolean> {
    return combineLatest(
      this.cartService.getEntries(),
      this.cartService.getActive()
    ).pipe(
      skipWhile(([entries]) => entries.length === 0),
      tap(([entries, cart]) => {
        this.notifyProfileTagOfCartChange({ entries, cart });
      }),
      mapTo(true)
    );
  }

  private notifyProfileTagOfCartChange({ entries, cart }): void {
    this.w.Y_TRACKING.push({
      event: 'ModifiedCart',
      data: { entries, cart },
    });
  }

  private notifyProfileTagOfConsentChange({ granted }): void {
    this.w.Y_TRACKING.push({ event: 'ConsentChanged', granted });
  }

  private addTracker(): Observable<ProfileTagEvent> {
    return this.baseSiteService.getActive().pipe(
      filter(_ => isPlatformBrowser(this.platform)),
      filter((siteId: string) => Boolean(siteId)),
      distinctUntilChanged(),
      tap(_ => this.addScript()),
      tap(_ => this.initWindow()),
      switchMap((siteId: string) => this.profileTagEventReceiver(siteId))
    );
  }

  private profileTagEventReceiver(siteId: string): Observable<ProfileTagEvent> {
    return fromEventPattern(
      handler => {
        this.addProfileTagEventReceiver(siteId, handler);
      },
      () => {}
    );
  }

  private addProfileTagEventReceiver(siteId: string, handler: Function): void {
    const newConfig: ProfileTagJsConfig = {
      ...this.config.cds.profileTag,
      tenant: this.config.cds.tenant,
      siteId,
      spa: true,
      profileTagEventReceiver: handler,
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
    this.w = <ProfileTagWindowObject>(<unknown>this.winRef.nativeWindow);
    this.w.Y_TRACKING = this.w.Y_TRACKING || {};
  }

  private exposeConfig(options: ProfileTagJsConfig): void {
    const q = this.w.Y_TRACKING.q || [];
    q.push([options]);
    this.w.Y_TRACKING.q = q;
  }
}
