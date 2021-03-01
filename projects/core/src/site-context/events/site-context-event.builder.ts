import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { createFrom } from '../../util/create-from';
import { SiteContextActions } from '../store/actions/index';
import { CurrencySetEvent, LanguageSetEvent } from './site-context.events';

/**
 * Builds and registers the site context events
 */
@Injectable({
  providedIn: 'root',
})
export class SiteContextEventBuilder {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService
  ) {
    this.register();
  }

  /**
   * Registers the site context events
   */
  protected register(): void {
    this.registerSetLanguage();
    this.registerSetCurrency();
  }

  /**
   * Register the language set action
   */
  protected registerSetLanguage(): void {
    const languageEvent$ = this.actionsSubject.pipe(
      ofType<SiteContextActions.SetActiveLanguage>(
        SiteContextActions.SET_ACTIVE_LANGUAGE
      ),
      map((languageAction) =>
        createFrom(LanguageSetEvent, {
          activeLanguage: languageAction.payload,
        })
      )
    );

    this.eventService.register(LanguageSetEvent, languageEvent$);
  }

  /**
   * Register the currency set action
   */
  protected registerSetCurrency(): void {
    const currencyEvent$ = this.actionsSubject.pipe(
      ofType<SiteContextActions.SetActiveCurrency>(
        SiteContextActions.SET_ACTIVE_CURRENCY
      ),
      map((currencyAction) =>
        createFrom(CurrencySetEvent, {
          activeCurrency: currencyAction.payload,
        })
      )
    );

    this.eventService.register(CurrencySetEvent, currencyEvent$);
  }
}
