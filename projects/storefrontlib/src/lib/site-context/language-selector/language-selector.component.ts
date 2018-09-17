import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy, Inject
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../shared/store';
import { SiteContextConfig } from '../site-context-module-config';
import { Config } from '../../config/config.module';

@Component({
  selector: 'y-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  languages$: Observable<any>;
  activeLanguage: string;
  subscription: Subscription;

  constructor(
    private store: Store<fromStore.SiteContextState>,
    @Inject(Config) private config: SiteContextConfig
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(fromStore.getLanguagesLoaded)
      .subscribe(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadLanguages());
        }
      });

    this.languages$ = this.store.select(fromStore.getAllLanguages);
    this.activeLanguage = this.getActiveLanguage();
    this.store.dispatch(new fromStore.SetActiveLanguage(this.activeLanguage));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setActiveLanguage(language) {
    this.activeLanguage = language;
    this.store.dispatch(new fromStore.SetActiveLanguage(this.activeLanguage));

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
