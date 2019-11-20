import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Event as NgRouterEvent, NavigationEnd, Router } from '@angular/router';
import {
  AnonymousConsent,
  AnonymousConsentsService,
  BaseSiteService,
  WindowRef,
} from '@spartacus/core';
import { fromEventPattern, merge, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';
import {
  ProfileTagEvent,
  ProfileTagJsConfig,
  ProfileTagWindowObject,
} from '../model/profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjector {
  static ProfileConsentTemplateId = 'PROFILE';
  private w: ProfileTagWindowObject;
  private tracking$: Observable<AnonymousConsent | NgRouterEvent> = merge(
    this.pageLoaded(),
    this.consentChanged()
  );
  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService,
    private router: Router,
    private anonymousConsentsService: AnonymousConsentsService,
    @Inject(PLATFORM_ID) private platform: any
  ) {}

  track(): Observable<boolean> {
    return this.addTracker().pipe(
      filter(profileTagEvent => profileTagEvent.eventName === 'Loaded'),
      switchMap(_ => this.tracking$),
      map(data => Boolean(data))
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

  private initWindow() {
    this.w = <ProfileTagWindowObject>(<unknown>this.winRef.nativeWindow);
    this.w.Y_TRACKING = this.w.Y_TRACKING || {};
  }

  private exposeConfig(options: ProfileTagJsConfig): void {
    const q = this.w.Y_TRACKING.q || [];
    q.push([options]);
    this.w.Y_TRACKING.q = q;
  }
}
