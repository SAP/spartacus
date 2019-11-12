import { Injectable, Renderer2 } from '@angular/core';
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
  ProfileTagJsConfig,
  ProfileTagWindowObject,
} from './profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjector {
  static ProfileConsentTemplateId = 'PROFILE';
  w: ProfileTagWindowObject;
  tracking$: Observable<AnonymousConsent | NgRouterEvent>;
  profileTagScript: HTMLScriptElement;
  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService,
    private router: Router,
    private anonymousConsentsService: AnonymousConsentsService
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
    return this.addTracker().pipe(
      filter(
        profileTagEvent =>
          (<any>(<unknown>profileTagEvent)).eventName === 'Loaded'
      ),
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

  private consentChanged(): Observable<AnonymousConsent> {
    return this.anonymousConsentsService
      .getConsent(ProfileTagInjector.ProfileConsentTemplateId)
      .pipe(
        filter(Boolean),
        filter(profileConsent => {
          console.log(`doing stuff`);
          return this.anonymousConsentsService.isConsentGiven(profileConsent);
        }),
        take(1),
        tap(() => {
          this.w.Y_TRACKING.push({ event: 'ConsentChanged', granted: true });
        })
      );
  }

  private addTracker(): Observable<Object> {
    return this.baseSiteService.getActive().pipe(
      filter((siteId: string) => Boolean(siteId)),
      switchMap((siteId: string) => {
        return this.profileTagEventReciever(siteId);
      })
    );
  }

  profileTagEventReciever(siteId: string): Observable<Object> {
    return fromEventPattern(
      handler => {
        this.addProfileTagEventReciever(siteId, handler);
      },
      () => {}
    );
  }

  addProfileTagEventReciever(siteId: string, handler: Function) {
    const newConfig: ProfileTagJsConfig = {
      ...this.config.cds.profileTag,
      tenant: this.config.cds.tenant,
      siteId,
      spa: true,
      profileTagEventReciever: handler,
    };
    this.track(newConfig);
  }

  addScript(renderer2: Renderer2): void {
    if (this.profileTagScript) {
      return;
    }
    const doc: Document = this.winRef.document;
    this.profileTagScript = renderer2.createElement('script');
    this.profileTagScript.type = 'text/javascript';
    this.profileTagScript.async = true;
    this.profileTagScript.src = this.config.cds.profileTag.javascriptUrl;
    renderer2.appendChild(doc.head, this.profileTagScript);
  }

  private track(options: ProfileTagJsConfig): void {
    const q = this.w.Y_TRACKING.q || [];
    q.push([options]);
    this.w.Y_TRACKING.q = q;
  }

  // private profileTagEventTriggered(profileTagEvent): void {
  //   switch (profileTagEvent.eventName) {
  //     case 'Loaded':
  //       this.isProfileTagLoaded$.next(true);
  //       break;
  //     default:
  //       break;
  //   }
  // }
}
