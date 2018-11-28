import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OccConfig } from '../../occ/config/occ-config';
import * as fromStore from '../store/index';
import { filter } from 'rxjs/operators';

/**
 * Facade that provides easy access to language state, actions and selectors.
 */
@Injectable()
export class LanguageService {
  constructor(
    private store: Store<fromStore.StateWithSiteContext>,
    private config: OccConfig
  ) {}

  /**
   * Represents all the languages supported by the current store.
   */
  getAll(): Observable<fromStore.LanguagesEntities> {
    this.store.dispatch(new fromStore.LoadLanguages());
    return this.store.pipe(select(fromStore.getAllLanguages));
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
   * Initializes by loading all languages and select the active language.
   */
  initialize() {
    this.initSessionLanguage();
  }

  /**
   * Initials the active language. The active language is either given
   * by the last visit (stored in session storage) or by the
   * default session language of the store.
   */
  protected initSessionLanguage() {
    if (sessionStorage && !!sessionStorage.getItem('language')) {
      this.setActive(sessionStorage.getItem('language'));
    } else {
      this.setActive(this.config.site.language);
    }
  }
}
