import { Injectable } from '@angular/core';
import { Event as NgRouterEvent, NavigationEnd, Router } from '@angular/router';
import { AnonymousConsent, AnonymousConsentsService, BaseSiteService, WindowRef } from '@spartacus/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CdsConfig, ProfileTagConfig } from '../../config/config.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjector {
  profiletagConfig: ProfileTagConfig;
  consentChanged$: Observable<boolean>;
  pageLoaded$: Observable<NgRouterEvent>;
  w: any;
  isProfileTagLoaded = new BehaviorSubject<boolean>(false);
  startTracking$: Observable<Boolean | NgRouterEvent>;
  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService,
    private router: Router,
    private anonymousConsentsService: AnonymousConsentsService
  ) {
    this.w = this.winRef.nativeWindow;
    this.profiletagConfig = this.config.cds.profileTag;
    this.consentChanged$ = this.consentChanged();
    this.pageLoaded$ = this.pageLoaded();
    this.startTracking$ = merge(this.consentChanged$, this.pageLoaded$);
  }

  injectScript(): Observable<Boolean | NgRouterEvent> {
    this.addScript();
    return this.addTracker().pipe(
      switchMap(() => {
        return this.isProfileTagLoaded.pipe(
          filter(Boolean),
          switchMap(() => {
            return this.startTracking$
          })
        )
      })
    );
  }

  private pageLoaded(): Observable<NgRouterEvent> {
    return this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        shareReplay(1),
        tap(() => {
          this.w.Y_TRACKING.push({ event: 'Navigated' })
        }),
        tap(() => 'called ytracking Navigated'),
      )
  }
  private consentChanged(): Observable<Boolean[]> {
    return this.anonymousConsentsService.getConsents()
      .pipe(
        map((anonymousConsents: AnonymousConsent[]) => {
          return anonymousConsents.map((anonymousConsent) => {
            return this.anonymousConsentsService.isConsentGiven(anonymousConsent);
          })
        }),
        distinctUntilChanged((prev, curr) => this.areArraysEqual(prev, curr)),
        filter((consentsGranted: Boolean[]) => {
          for (const consentGranted of consentsGranted) {
            if (!consentGranted) {
              return false;
            }
          }
          return true;
        }),
        tap(() => {
          this.w.Y_TRACKING.push({ event: 'ConsentChanged', granted: true })
        }),
        tap(() => { console.log('called ytracking ConsentChanged') }));
  }

  private areArraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  private addTracker(): Observable<string> {
    return this.baseSiteService
      .getActive()
      .pipe(
        filter(Boolean),
        tap((site: string) => {
          const newConfig: ProfileTagConfig = { ...this.profiletagConfig };
          newConfig.siteId = site;
          this.track(newConfig);
        }))
  }

  private addScript(): void {
    const doc: Document = this.winRef.document;
    const profileTagScript: HTMLScriptElement = doc.createElement('script');
    profileTagScript.type = 'text/javascript';
    profileTagScript.async = true;
    profileTagScript.src = this.profiletagConfig.javascriptUrl;
    doc.getElementsByTagName('head')[0].appendChild(profileTagScript);
  }

  private track(options: ProfileTagConfig) {
    const w: any = this.winRef.nativeWindow;
    w.Y_TRACKING = function () {
      (w.Y_TRACKING.q = w.Y_TRACKING.q || []).push(arguments);
    };
    const spaOptions = {
      ...options, spa: true, profileTagEventReciever: this.profileTagEventTriggered.bind(this)
    }
    w.Y_TRACKING(spaOptions);
  }

  private profileTagEventTriggered(profileTagEvent) {
    switch (profileTagEvent.eventName) {
      case 'Loaded':
        this.isProfileTagLoaded.next(true);
        break;
      default:
        //add logger from spartacus. this.logger.info(`Unsupported Event ${profileTagEvent.eventName}`)
        break;
    }
  }
}
