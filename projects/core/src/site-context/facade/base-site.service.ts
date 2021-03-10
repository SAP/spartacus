import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  isDevMode,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { BaseSite } from '../../model/misc.model';
import { SERVER_REQUEST_URL } from '../../util/ssr.tokens';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { BASE_SITE_CONTEXT_ID } from '../providers/context-ids';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextSelectors } from '../store/selectors/index';
import { StateWithSiteContext } from '../store/state';
import { SiteContext } from './site-context.interface';

@Injectable()
export class BaseSiteService implements SiteContext<BaseSite> {
  constructor(
    protected store: Store<StateWithSiteContext>,
    protected config: SiteContextConfig,
    @Inject(PLATFORM_ID) protected platform?: any,
    @Inject(DOCUMENT) protected document?: any,
    @Optional()
    @Inject(SERVER_REQUEST_URL)
    protected serverRequestUrl?: string
  ) {}

  private get currentUrl(): string | undefined {
    if (this.platform && isPlatformBrowser(this.platform)) {
      return this.document.location.href;
    }
    if (this.serverRequestUrl) {
      return this.serverRequestUrl;
    }
    if (isDevMode()) {
      console.error(
        `Please provide token 'SERVER_REQUEST_URL' with the requested URL for SSR`
      );
    }
  }

  /**
   * Represents the current baseSite uid.
   */
  getActive(): Observable<string> {
    return this.store.pipe(
      select(SiteContextSelectors.getActiveBaseSite),
      filter((active) => Boolean(active))
    );
  }

  /**
   * Get all base sites data
   */
  getAll(): Observable<BaseSite[]> {
    return this.store.pipe(
      select(SiteContextSelectors.getAllBaseSites),
      tap((sites) => {
        if (!sites) {
          this.store.dispatch(new SiteContextActions.LoadBaseSites());
        }
      }),
      filter((sites) => Boolean(sites))
    );
  }

  /**
   * Get base site data based on site uid
   */
  get(siteUid?: string): Observable<BaseSite | undefined> {
    let activeSiteUid: string;
    if (!siteUid) {
      this.getActive()
        .pipe(take(1))
        .subscribe((siteUid) => (activeSiteUid = siteUid));
    }

    return this.getAll().pipe(
      map((sites) =>
        sites.find(
          (site) =>
            site.uid === siteUid ||
            site.uid === activeSiteUid ||
            this.isCurrentBaseSite(site)
        )
      )
    );
  }

  setActive(baseSite: string): void {
    this.store
      .pipe(select(SiteContextSelectors.getActiveBaseSite), take(1))
      .subscribe((activeBaseSite) => {
        if (baseSite && activeBaseSite !== baseSite) {
          this.store.dispatch(
            new SiteContextActions.SetActiveBaseSite(baseSite)
          );
        }
      });
  }

  /**
   * Initializes the active baseSite.
   */
  initialize(): void {
    let value;
    this.getActive()
      .subscribe((val) => (value = val))
      .unsubscribe();
    if (value) {
      // don't initialize, if there is already a value (i.e. retrieved from route or transferred from SSR)
      return;
    }

    this.setActive(
      getContextParameterDefault(this.config, BASE_SITE_CONTEXT_ID)
    );
  }

  private isCurrentBaseSite(site: BaseSite): boolean {
    const index = (site.urlPatterns || []).findIndex((jsRegexp: any) => {
      if (jsRegexp) {
        return jsRegexp.test(this.currentUrl || '');
      }
    });

    return index !== -1;
  }
}
