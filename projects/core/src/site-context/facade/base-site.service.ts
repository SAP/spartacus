import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { BaseSite } from '../../model/misc.model';
import { getContextParameterValues } from '../config/context-config-utils';
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
    protected config: SiteContextConfig
  ) {}

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
    if (siteUid) {
      return this.getAll().pipe(
        map((sites) => sites.find((site) => site.uid === siteUid))
      );
    }

    return this.getActive().pipe(
      switchMap((activeSiteUid) =>
        this.getAll().pipe(
          map((sites) => sites.find((site) => site.uid === activeSiteUid))
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
   * Tells whether the value of the base site has been already initialized
   */
  isInitialized(): boolean {
    let valueInitialized = false;
    this.getActive()
      .subscribe(() => (valueInitialized = true))
      .unsubscribe();

    return valueInitialized;
  }

  /**
   * Tells whether the given iso code is allowed.
   *
   * The list of allowed iso codes can be configured in the `context` config of Spartacus.
   */
  protected isValid(value: string): boolean {
    return (
      !!value &&
      getContextParameterValues(this.config, BASE_SITE_CONTEXT_ID).includes(
        value
      )
    );
  }
}
