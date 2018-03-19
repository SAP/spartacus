import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { tap } from 'rxjs/operators';

import * as fromStore from '../shared/store';
import * as fromRouting from '../../routing/store';
import { PageContext } from '../../routing/models/page-context.model';

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
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.store.dispatch(new fromStore.LoadLanguages());
          }
        })
      )
      .subscribe();

    this.languages$ = this.store.select(fromStore.getAllLanguages);
    this.activeLanguage = this.configService.site.language;
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
