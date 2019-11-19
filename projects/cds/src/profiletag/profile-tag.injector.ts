import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Event as NgRouterEvent, NavigationEnd, Router } from '@angular/router';
import {
  AnonymousConsent,
  AnonymousConsentsService,
  BaseSiteService,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject, fromEventPattern, merge, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CdsConfig } from '../config/cds-config';
import {
  ProfileTagEvent,
  ProfileTagEventNames,
  ProfileTagJsConfig,
  ProfileTagWindowObject,
} from './profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjector {
  static ProfileConsentTemplateId = 'PROFILE';
  private w: ProfileTagWindowObject;
  private tracking$: Observable<AnonymousConsent | NgRouterEvent>;
  public consentReference$ = new BehaviorSubject<string>(null);
  public profileTagDebug$ = new BehaviorSubject<boolean>(false);
  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService,
    private router: Router,
    private anonymousConsentsService: AnonymousConsentsService,
    @Inject(PLATFORM_ID) private platform: any
  ) {
    this.w = <ProfileTagWindowObject>(
      (<unknown>(this.winRef ? this.winRef.nativeWindow : {}))
    );
    this.w.Y_TRACKING = this.w.Y_TRACKING || {};
    const consentChanged$ = this.consentChanged();
    const pageLoaded$ = this.pageLoaded();
    this.tracking$ = merge(pageLoaded$, consentChanged$);
  }

  track(): Observable<AnonymousConsent | NgRouterEvent> {
    return this.addTracker().pipe(
      tap(event => {
        console.log(`catching event ${JSON.stringify(event)}`);
        if (event.eventName === ProfileTagEventNames.ConsentReferenceChanged) {
          this.consentReference$.next(event.data.consentReference);
        } else if (event.eventName === ProfileTagEventNames.ProfileTagDebug) {
          this.profileTagDebug$.next(event.data.debug);
        }
      }),
      filter(
        profileTagEvent =>
          profileTagEvent.eventName === ProfileTagEventNames.Loaded
      ), //TO DO: what happens if 'Loaded' is triggered twice?
      switchMap(() => {
        return this.tracking$;
      })
    );
  }

  private pageLoaded(): Observable<NgRouterEvent> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => {
        this.w.Y_TRACKING.push({ event: 'Navigated' });
      })
    );
  }

  /**
   * We are only interested in the first time the ProfileConsent is granted
   */
  private consentChanged(): Observable<AnonymousConsent> {
    return this.anonymousConsentsService
      .getConsent(ProfileTagInjector.ProfileConsentTemplateId)
      .pipe(
        filter(Boolean),
        filter(profileConsent => {
          return this.anonymousConsentsService.isConsentGiven(profileConsent);
        }),
        take(1),
        tap(() => {
          this.notifyProfileTagOfConsentChange({ granted: true });
        })
      );
  }

  private notifyProfileTagOfConsentChange({ granted }): void {
    this.w.Y_TRACKING.push({ event: 'ConsentChanged', granted });
  }

  private addTracker(): Observable<ProfileTagEvent> {
    return this.baseSiteService.getActive().pipe(
      filter(_ => isPlatformBrowser(this.platform)),
      filter((siteId: string) => Boolean(siteId)),
      distinctUntilChanged(),
      tap(siteId => console.log(siteId)),
      tap(_ => this.addScript()),
      switchMap((siteId: string) => {
        return this.profileTagEventReceiver(siteId);
      })
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
    console.log(`adding script`);
    const profileTagScript = this.winRef.document.createElement('script');
    profileTagScript.type = 'text/javascript';
    profileTagScript.async = true;
    profileTagScript.src = this.config.cds.profileTag.javascriptUrl;

    this.winRef.document
      .getElementsByTagName('head')[0]
      .appendChild(profileTagScript);
  }

  private exposeConfig(options: ProfileTagJsConfig): void {
    const q = this.w.Y_TRACKING.q || [];
    q.push([options]);
    this.w.Y_TRACKING.q = q;
  }
}
