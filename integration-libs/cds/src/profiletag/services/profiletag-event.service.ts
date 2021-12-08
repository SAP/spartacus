import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseSiteService, WindowRef } from '@spartacus/core';
import { fromEvent, merge, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { CdsConfig } from '../../config/index';
import {
  ConsentReferenceEvent,
  DebugEvent,
  InternalProfileTagEventNames,
  ProfileTagJsConfig,
  ProfileTagPushEvent,
  ProfileTagWindowObject,
} from '../model/profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagEventService {
  latestConsentReference = null;
  profileTagDebug = false;
  private consentReference$: Observable<string | null>;
  private profileTagWindow: ProfileTagWindowObject;
  private profileTagEvents$ = merge(
    this.setConsentReference(),
    this.debugModeChanged()
  );
  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService,
    @Inject(PLATFORM_ID) private platform: any
  ) {
    this.initWindow();
  }

  getProfileTagEvents(): Observable<string | DebugEvent | Event> {
    return this.profileTagEvents$;
  }

  getConsentReference(): Observable<string> {
    if (!this.consentReference$) {
      this.consentReference$ = fromEvent(
        this.winRef.nativeWindow,
        InternalProfileTagEventNames.CONSENT_REFERENCE_LOADED
      ).pipe(
        map((event) => <ConsentReferenceEvent>event),
        map((event) => event.detail.consentReference),
        shareReplay(1)
      );
    }
    return this.consentReference$;
  }

  handleConsentWithdrawn(): void {
    this.consentReference$ = null;
    this.latestConsentReference = null;
  }

  addTracker(): Observable<string> {
    return this.baseSiteService.getActive().pipe(
      filter(() => isPlatformBrowser(this.platform)),
      filter((siteId: string) => Boolean(siteId)),
      distinctUntilChanged(),
      tap(() => this.addScript()),
      tap((siteId: string) => this.createConfig(siteId))
    );
  }

  notifyProfileTagOfEventOccurence(event: ProfileTagPushEvent): void {
    try {
      this.profileTagWindow.Y_TRACKING.eventLayer.push(event);
    } catch (e) {
      console.log(`Unexpected error when calling profiletag push method ${e}`);
    }
  }

  private setConsentReference(): Observable<string> {
    return this.getConsentReference().pipe(
      tap(
        (consentReference) => (this.latestConsentReference = consentReference)
      )
    );
  }

  private debugModeChanged(): Observable<DebugEvent> {
    return fromEvent(
      this.winRef.nativeWindow,
      InternalProfileTagEventNames.DEBUG_FLAG_CHANGED
    ).pipe(
      map((event) => <DebugEvent>event),
      tap((event) => (this.profileTagDebug = event.detail.debug))
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

  /*
   * Checks if the script with the given source exists in the document or not.
   */
  private isScriptLoaded(scriptSource: string): boolean {
    return !!this.winRef.document.querySelector(
      `script[src="${scriptSource}"]`
    );
  }

  private addScript(): void {
    if (this.isScriptLoaded(this.config.cds.profileTag.javascriptUrl)) {
      return;
    }
    const profileTagScript = this.winRef.document.createElement('script');
    profileTagScript.type = 'text/javascript';
    profileTagScript.async = true;
    profileTagScript.src = this.config.cds.profileTag.javascriptUrl;
    this.winRef.document
      .getElementsByTagName('head')[0]
      .appendChild(profileTagScript);
  }

  private initWindow(): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    this.profileTagWindow = <ProfileTagWindowObject>(
      (<unknown>this.winRef.nativeWindow)
    );
    this.profileTagWindow.Y_TRACKING = this.profileTagWindow.Y_TRACKING || {};
    this.profileTagWindow.Y_TRACKING.eventLayer =
      this.profileTagWindow.Y_TRACKING.eventLayer || [];
  }

  private exposeConfig(options: ProfileTagJsConfig): void {
    const q = this.profileTagWindow.Y_TRACKING.q || [];
    if (q.length !== 0) {
      return;
    }
    q.push([options]);
    this.profileTagWindow.Y_TRACKING.q = q;
  }
}
