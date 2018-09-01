import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../shared/store';
import { ConfigService } from '../config.service';

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
    private configService: ConfigService
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
    this.activeLanguage =
      sessionStorage.getItem('language') === null
        ? this.configService.site.language
        : sessionStorage.getItem('language');
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
    sessionStorage.setItem('language', this.activeLanguage);
  }
}
