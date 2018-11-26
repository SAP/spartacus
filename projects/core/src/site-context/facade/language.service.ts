import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StateWithSiteContext, LanguagesEntities } from '../store/state';
import {
  getAllLanguages,
  getActiveLanguage
} from '../store/selectors/languages.selectors';
import {
  LoadLanguages,
  SetActiveLanguage
} from '../store/actions/languages.action';

import { OccConfig } from '../../occ/config/occ-config';
@Injectable()
export class LanguageService {
  readonly languages$: Observable<LanguagesEntities> = this.store.pipe(
    select(getAllLanguages)
  );

  readonly activeLanguage$: Observable<string> = this.store.pipe(
    select(getActiveLanguage)
  );

  constructor(
    private store: Store<StateWithSiteContext>,
    private config: OccConfig
  ) {
    this.initActiveLanguage();
    this.loadLanguages();
  }

  protected loadLanguages() {
    this.store.dispatch(new LoadLanguages());
  }

  /**
   * Alabama
   *
   * @param isocode
   */
  public set activeLanguage(isocode: string) {
    this.store.dispatch(new SetActiveLanguage(isocode));
  }

  protected initActiveLanguage() {
    if (sessionStorage) {
      this.activeLanguage = !sessionStorage.getItem('language')
        ? this.config.site.language
        : sessionStorage.getItem('language');
    } else {
      this.activeLanguage = this.config.site.language;
    }
  }
}
