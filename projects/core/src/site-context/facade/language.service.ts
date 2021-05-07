import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Language } from '../../model/misc.model';
import { getContextParameterValues } from '../config/context-config-utils';
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
  constructor(
    protected store: Store<StateWithSiteContext>,
    protected config: SiteContextConfig
  ) {}

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
        if (activeLanguage !== isocode && this.isValid(isocode)) {
          this.store.dispatch(
            new SiteContextActions.SetActiveLanguage(isocode)
          );
        }
      });
  }

  /**
   * Tells whether the value of the active language has been already initialized
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
      getContextParameterValues(this.config, LANGUAGE_CONTEXT_ID).includes(
        value
      )
    );
  }
}
