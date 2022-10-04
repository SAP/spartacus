import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Address, LanguageService, TranslationService } from '@spartacus/core';
import {
  AccountSummaryDetails,
  AccountSummaryFacade,
} from '@spartacus/organization/account-summary/root';
import { Card } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-account-summary-header',
  templateUrl: './account-summary-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSummaryHeaderComponent {
  notApplicable: string;
  headerDetails$: Observable<AccountSummaryDetails> = this.languageService
    .getActive()
    .pipe(switchMap(() => this.accountSummaryFacade.getAccountSummary()));

  constructor(
    protected accountSummaryFacade: AccountSummaryFacade,
    protected translation: TranslationService,
    private languageService: LanguageService
  ) {
    this.translation
      .translate('orgAccountSummary.details.notApplicable')
      .pipe(take(1))
      .subscribe((text) => (this.notApplicable = text));
  }

  getIdCardContent(id?: string): Observable<Card> {
    return this.translation.translate('orgAccountSummary.details.uid').pipe(
      map((idTitle) => ({
        title: idTitle,
        text: [id || this.notApplicable],
      }))
    );
  }

  getNameCardContent(name?: string): Observable<Card> {
    return this.translation.translate('orgAccountSummary.details.name').pipe(
      map((nameTitle) => ({
        title: nameTitle,
        text: [name || this.notApplicable],
      }))
    );
  }

  getAddressCardContent(billingAddress?: Address): Observable<Card> {
    return this.translation.translate('orgAccountSummary.details.address').pipe(
      map((addressTitle) => {
        const name = `${billingAddress?.title}, ${billingAddress?.firstName} ${billingAddress?.lastName}`;
        const address = billingAddress?.formattedAddress;
        const country = billingAddress?.country?.name;
        return {
          title: addressTitle,
          text: Boolean(billingAddress)
            ? [name, address, country]
            : [this.notApplicable],
        } as Card;
      })
    );
  }

  getCreditRepCardContent(creditRep?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.creditRep')
      .pipe(
        map((creditRepTitle) => ({
          title: creditRepTitle,
          text: [creditRep || this.notApplicable],
        }))
      );
  }

  getCreditLineCardContent(creditLine?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.creditLine')
      .pipe(
        map((creditLineTitle) => ({
          title: creditLineTitle,
          text: [creditLine || this.notApplicable],
        }))
      );
  }

  getCurrentBalanceCardContent(currentBalance?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.currentBalance')
      .pipe(
        map((currentBalanceTitle) => ({
          title: currentBalanceTitle,
          text: [currentBalance || this.notApplicable],
        }))
      );
  }

  getOpenBalanceCardContent(openBalance?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.openBalance')
      .pipe(
        map((openBalanceTitle) => ({
          title: openBalanceTitle,
          text: [openBalance || this.notApplicable],
        }))
      );
  }

  getPastDueBalanceCardContent(pastDueBalance?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.pastDueBalance')
      .pipe(
        map((pastDueBalanceTitle) => ({
          title: pastDueBalanceTitle,
          text: [pastDueBalance ?? this.notApplicable],
        }))
      );
  }
}
