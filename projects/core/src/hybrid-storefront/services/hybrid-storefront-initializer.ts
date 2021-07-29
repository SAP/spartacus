import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, skip, switchMap } from 'rxjs/operators';
import { Session } from '../../model/hybrid-session';
import { CurrencyService } from '../../site-context/facade/currency.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class HybridStorefrontInitializer implements OnDestroy {
  constructor(
    protected sessionService: SessionService,
    protected languageService: LanguageService,
    protected currencyService: CurrencyService
  ) {}

  protected subscription: Subscription;

  initialize(): void {
    this.subscription = this.sessionService
      .load()
      .subscribe((session: Session) => {
        if (session.session?.currency) {
          this.currencyService.setActive(session.session?.currency);
          this.updateCurrency();
        }

        if (session.session?.language) {
          this.languageService.setActive(session.session?.language);
          this.updateLanguage();
        }
      });
  }

  updateLanguage(): void {
    this.subscription = this.languageService
      .getActive()
      .pipe(
        skip(1),
        distinctUntilChanged(),
        switchMap((language: string) => {
          return this.sessionService.updateLanguage(language);
        })
      )
      .subscribe();
  }

  updateCurrency(): void {
    this.subscription = this.currencyService
      .getActive()
      .pipe(
        skip(1),
        distinctUntilChanged(),
        switchMap((currency: string) => {
          return this.sessionService.updateCurrency(currency);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
