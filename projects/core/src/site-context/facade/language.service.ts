import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Language } from '../../model/misc.model';
import { WindowRef } from '../../window/window-ref';
import {
  getContextParameterDefault,
  getContextParameterValues,
} from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextSelectors } from '../store/selectors/index';
import { StateWithSiteContext } from '../store/state';
import { SiteContext } from './site-context.interface';

/**
 * Facade that provides easy access to language state, actions and selectors.
 */
@Injectable()
export class LanguageService implements SiteContext<Language> {
  private sessionStorage: Storage;

  constructor(
    protected store: Store<StateWithSiteContext>,
    winRef: WindowRef,
    protected config: SiteContextConfig
  ) {
    this.sessionStorage = winRef.sessionStorage;
  }

  /**
   * Represents all the languages supported by the current store.
   */
  getAll(): Observable<Language[]> {
    return this.store.pipe(
      select(SiteContextSelectors.getAllLanguages),
      tap((languages) => {
        if (!languages) {
          this.store.dispatch(new SiteContextActions.LoadLanguages());
        }
      }),
      filter((languages) => Boolean(languages))
    );
  }

  /**
   * Represents the isocode of the active language.
   */
  getActive(): Observable<string> {
    return this.store.pipe(
      select(SiteContextSelectors.getActiveLanguage),
      filter((active) => Boolean(active))
    );
  }

  /**
   * Sets the active language.
   */
  setActive(isocode: string): void {
    this.store
      .pipe(select(SiteContextSelectors.getActiveLanguage), take(1))
      .subscribe((activeLanguage) => {
        if (activeLanguage !== isocode) {
          this.store.dispatch(
            new SiteContextActions.SetActiveLanguage(isocode)
          );
        }
      });
  }

  /**
   * Initials the active language. The active language is either given
   * by the last visit (stored in session storage) or by the
   * default session language of the store.
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

    const sessionLanguage =
      this.sessionStorage && this.sessionStorage.getItem('language');
    if (
      sessionLanguage &&
      getContextParameterValues(this.config, LANGUAGE_CONTEXT_ID).includes(
        sessionLanguage
      )
    ) {
      this.setActive(sessionLanguage);
    } else {
      this.setActive(
        getContextParameterDefault(this.config, LANGUAGE_CONTEXT_ID)
      );
    }
  }
}
