import { Injectable } from '@angular/core';
import { Event as NgRouterEvent, NavigationEnd, Router } from '@angular/router';
import {
  AnonymousConsent,
  AnonymousConsentsService,
  BaseSiteService,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CdsConfig, ProfileTagConfig } from '../../config/config.model';
import { ProfileTagWindowObject } from './profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjector {
  profiletagConfig: ProfileTagConfig;
  w: ProfileTagWindowObject;
  isProfileTagLoaded$ = new BehaviorSubject<boolean>(false);
  startTracking$: Observable<Boolean[] | NgRouterEvent>;
  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService,
    private router: Router,
    private anonymousConsentsService: AnonymousConsentsService
  ) {
    this.w = <ProfileTagWindowObject>(<unknown>this.winRef.nativeWindow);
    this.profiletagConfig = this.config.cds.profileTag;
    const consentChanged$ = this.consentChanged();
    const pageLoaded$ = this.pageLoaded();
    this.startTracking$ = merge(pageLoaded$, consentChanged$);
  }

  injectScript(): Observable<Boolean[] | NgRouterEvent> {
    this.addScript();
    return this.addTracker().pipe(
      switchMap(() => {
        return this.isProfileTagLoaded$.pipe(
          filter(Boolean),
          switchMap(() => {
            return this.startTracking$;
          })
        );
      })
    );
  }

  private pageLoaded(): Observable<NgRouterEvent> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => {
        this.w.Y_TRACKING.push({ event: 'Navigated' });
      }),
      tap(() => 'called ytracking Navigated')
    );
  }

  private consentChanged(): Observable<Boolean[]> {
    return this.anonymousConsentsService.getConsents().pipe(
      map((anonymousConsents: AnonymousConsent[]) => {
        return anonymousConsents.map(anonymousConsent => {
          return this.anonymousConsentsService.isConsentGiven(anonymousConsent);
        });
      }),
      filter((consentsGranted: Boolean[]) => {
        // TODO: For now we dont trigger a consent withdrawn as we do not do
        // granular consents, and one consent withdrawn would lead all tracking to stop
        // our system will anyway deny a request if an individual consent has been withdrawn
        for (const consentGranted of consentsGranted) {
          if (!consentGranted) {
            return false;
          }
        }
        return true;
      }),
      take(1),
      tap(() => {
        this.w.Y_TRACKING.push({ event: 'ConsentChanged', granted: true });
      })
    );
  }

  private addTracker(): Observable<string> {
    return this.baseSiteService.getActive().pipe(
      filter((site: string) => Boolean(site)),
      tap(() => {
        this.track(this.profiletagConfig);
      })
    );
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
    const spaOptions = {
      ...options,
      spa: true,
      profileTagEventReciever: this.profileTagEventTriggered.bind(this),
    };
    const q = this.w.Y_TRACKING.q || [];
    q.push([spaOptions]);
    this.w.Y_TRACKING.q = q;
  }

  private profileTagEventTriggered(profileTagEvent) {
    switch (profileTagEvent.eventName) {
      case 'Loaded':
        this.isProfileTagLoaded$.next(true);
        break;
      default:
        //add logger from spartacus. this.logger.info(`Unsupported Event ${profileTagEvent.eventName}`)
        break;
    }
  }
}
