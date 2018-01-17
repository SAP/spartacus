import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, filter } from 'rxjs/operators';

import * as fromStore from '../shared/store';
import * as fromRouting from '../../routing/store';
import { PageContext } from '../../routing/models/page-context.model';

import { ConfigService } from '../config.service';

@Component({
  selector: 'y-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  languages$: Observable<any>;
  activeLanguage: string;

  constructor(
    private store: Store<fromStore.SiteContextState>,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.store
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
    this.setActiveLanguage(this.configService.site.language);
  }

  setActiveLanguage(language) {
    this.activeLanguage = language;
    this.store.dispatch(new fromStore.SetActiveLanguage(this.activeLanguage));

    let pageContext: PageContext;
    this.store
      .select(fromRouting.getRouterState)
      .filter(routerState => routerState !== undefined)
      .subscribe(routerState => (pageContext = routerState.state.context));

    if (pageContext !== undefined) {
      this.store.dispatch(new fromStore.LanguageChange(pageContext));
    }
  }
}
