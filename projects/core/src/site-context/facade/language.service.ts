import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OccConfig } from '../../occ/config/occ-config';

import { StateWithSiteContext, LanguagesEntities } from '../store/state';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';

@Injectable()
export class LanguageService {
  /**
   * Represents all the languages supported by the current store.
   */
  languages$: Observable<LanguagesEntities> = this.store.pipe(
    select(selectors.getAllLanguages)
  );

  /**
   * Represents the active language of the current store.
   */
  activeLanguage$: Observable<string> = this.store.pipe(
    select(selectors.getActiveLanguage)
  );

  constructor(
    private store: Store<StateWithSiteContext>,
    private config: OccConfig
  ) {
    this.loadAll();
    this.initSessionLanguage();
  }

  /**
   * Selects the active language by isocode.
   */
  select(isocode: string) {
    this.store.dispatch(new actions.SetActiveLanguage(isocode));
  }

  /**
   * Loads all the languages of the current store.
   */
  protected loadAll() {
    this.store.dispatch(new actions.LoadLanguages());
  }

  /**
   * Initials the active language. The active language is either given
   * by the last visit (stored in session storage) or by the
   * default session language of the store.
   */
  protected initSessionLanguage() {
    if (sessionStorage && !!sessionStorage.getItem('language')) {
      this.select(sessionStorage.getItem('language'));
    } else {
      this.select(this.config.site.language);
    }
  }
}
