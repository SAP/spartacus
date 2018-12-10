import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store/index';
import { filter, tap } from 'rxjs/operators';
import { Language } from '../../occ-models';

/**
 * Facade that provides easy access to language state, actions and selectors.
 */
@Injectable()
export class LanguageService {
  constructor(private store: Store<fromStore.StateWithSiteContext>) {}

  /**
   * Represents all the languages supported by the current store.
   */
  getAll(): Observable<Language[]> {
    return this.store.pipe(
      select(fromStore.getAllLanguages),
      tap(languages => {
        if (!languages || languages.length === 0) {
          this.store.dispatch(new fromStore.LoadLanguages());
        }
      })
    );
  }

  /**
   * Represents the isocode of the active language.
   */
  getActive(): Observable<string> {
    return this.store
      .pipe(select(fromStore.getActiveLanguage))
      .pipe(filter(Boolean));
  }

  /**
   * Sets the active language.
   */
  setActive(isocode: string) {
    this.store.dispatch(new fromStore.SetActiveLanguage(isocode));
  }

  /**
   * Initials the active language. The active language is either given
   * by the last visit (stored in session storage) or by the
   * default session language of the store.
   */
  initialize(defaultLanguage: string) {
    if (sessionStorage && !!sessionStorage.getItem('language')) {
      this.setActive(sessionStorage.getItem('language'));
    } else {
      this.setActive(defaultLanguage);
    }
  }
}
