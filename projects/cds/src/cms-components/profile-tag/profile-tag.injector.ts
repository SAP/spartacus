import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { Event as NgRouterEvent, NavigationEnd, Router } from '@angular/router';
import {
  AnonymousConsent,
  AnonymousConsentsService,
  BaseSiteService,
  WindowRef,
} from '@spartacus/core';
import { fromEventPattern, merge, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds.config';
import {
  ProfileTagEvent,
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
  private profileTagScript: HTMLScriptElement;
  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService,
    private router: Router,
    private anonymousConsentsService: AnonymousConsentsService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.w = <ProfileTagWindowObject>(
      (<unknown>(this.winRef ? this.winRef.nativeWindow : undefined))
    );
    this.w.Y_TRACKING = this.w.Y_TRACKING || {};
    const consentChanged$ = this.consentChanged();
    const pageLoaded$ = this.pageLoaded();
    this.tracking$ = merge(pageLoaded$, consentChanged$);
  }

  injectScript(): Observable<AnonymousConsent | NgRouterEvent> {
    if (!this.windowAvailable()) {
      return;
    }
    return this.addTracker().pipe(
      filter(profileTagEvent => profileTagEvent.eventName === 'Loaded'),
      switchMap(() => {
        return this.tracking$;
      })
    );
  }

  private windowAvailable() {
    return this.w;
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
      filter((siteId: string) => Boolean(siteId)),
      switchMap((siteId: string) => {
        return this.profileTagEventReceiver(siteId);
      })
    );
  }

  profileTagEventReceiver(siteId: string): Observable<ProfileTagEvent> {
    return fromEventPattern(
      handler => {
        this.addProfileTagEventReceiver(siteId, handler);
      },
      () => {}
    );
  }

  addProfileTagEventReceiver(siteId: string, handler: Function): void {
    const newConfig: ProfileTagJsConfig = {
      ...this.config.cds.profileTag,
      tenant: this.config.cds.tenant,
      siteId,
      spa: true,
      profileTagEventReceiver: handler,
    };
    this.track(newConfig);
  }

  addScript(renderer2: Renderer2): void {
    if (this.profileTagScript) {
      return;
    }
    this.profileTagScript = renderer2.createElement('script');
    this.profileTagScript.type = 'text/javascript';
    this.profileTagScript.async = true;
    this.profileTagScript.src = this.config.cds.profileTag.javascriptUrl;
    renderer2.appendChild(this.document.head, this.profileTagScript);
  }

  private track(options: ProfileTagJsConfig): void {
    const q = this.w.Y_TRACKING.q || [];
    q.push([options]);
    this.w.Y_TRACKING.q = q;
  }
}
