import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromStore from '@spartacus/core';
import {
  SiteContextConfig,
  getAllLanguages,
  StateWithSiteContext,
  SiteContextService
} from '@spartacus/core';

@Component({
  selector: 'y-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent implements OnInit {
  languages$: Observable<any>;
  activeLanguage: string;
  subscription: Subscription;

  constructor(
    private store: Store<StateWithSiteContext>,
    private config: SiteContextConfig,
    private siteContextService: SiteContextService
  ) {}

  ngOnInit() {
    this.languages$ = this.siteContextService.languages$;

    this.activeLanguage = this.getActiveLanguage();
    this.store.dispatch(new fromStore.SetActiveLanguage(this.activeLanguage));
  }

  setActiveLanguage(language) {
    this.activeLanguage = language;
    this.siteContextService.activeLanguage = language;

    this.store.dispatch(new fromStore.LanguageChange());
    if (sessionStorage) {
      sessionStorage.setItem('language', this.activeLanguage);
    }
  }

  protected getActiveLanguage(): string {
    if (sessionStorage) {
      return sessionStorage.getItem('language') === null
        ? this.config.site.language
        : sessionStorage.getItem('language');
    } else {
      return this.config.site.language;
    }
  }
}
