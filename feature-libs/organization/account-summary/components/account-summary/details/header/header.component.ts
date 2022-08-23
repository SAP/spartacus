import { Component, OnInit } from '@angular/core';
import { Address, TranslationService } from '@spartacus/core';
import {
  AccountSummaryDetails,
  AccountSummaryFacade,
} from '@spartacus/organization/account-summary/root';
import { Card } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const notApplicable = 'n/a';

@Component({
  selector: 'cx-account-summary-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  headerDetails$: Observable<AccountSummaryDetails>;

  constructor(
    private accountSummaryFacade: AccountSummaryFacade,
    protected translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.headerDetails$ = this.accountSummaryFacade.getAccountSummary();
  }

  getIdCardContent(id?: string): Observable<Card> {
    return this.translation.translate('orgAccountSummary.details.uid').pipe(
      map((idTitle) => ({
        title: idTitle,
        text: [id || notApplicable],
      }))
    );
  }

  getNameCardContent(name?: string): Observable<Card> {
    return this.translation.translate('orgAccountSummary.details.name').pipe(
      map((nameTitle) => ({
        title: nameTitle,
        text: [name || notApplicable],
      }))
    );
  }

  getAddressCardContent(billingAddress?: Address | any): Observable<Card> {
    return this.translation.translate('orgAccountSummary.details.address').pipe(
      map((addressTitle) => {
        const name =
          billingAddress?.fullnameWithTitle ?? // sometimes fullnameWithTitle is not set
          `${billingAddress?.title}, ${billingAddress?.firstName} ${billingAddress?.lastName}`;
        const address = billingAddress?.formattedAddress;
        const country = billingAddress?.country?.name;
        return {
          title: addressTitle,
          text: Boolean(billingAddress)
            ? [name, address, country]
            : [notApplicable],
        };
      })
    );
  }

  getCreditRepCardContent(creditRep?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.creditRep')
      .pipe(
        map((creditRepTitle) => ({
          title: creditRepTitle,
          text: [creditRep || notApplicable],
        }))
      );
  }

  getCreditLineCardContent(creditLine?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.creditLine')
      .pipe(
        map((creditLineTitle) => ({
          title: creditLineTitle,
          text: [creditLine || notApplicable],
        }))
      );
  }

  getCurrentBalanceCardContent(currentBalance?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.currentBalance')
      .pipe(
        map((currentBalanceTitle) => ({
          title: currentBalanceTitle,
          text: [currentBalance || notApplicable],
        }))
      );
  }

  getOpenBalanceCardContent(openBalance?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.openBalance')
      .pipe(
        map((openBalanceTitle) => ({
          title: openBalanceTitle,
          text: [openBalance || notApplicable],
        }))
      );
  }

  getPastDueBalanceCardContent(pastDueBalance?: string): Observable<Card> {
    return this.translation
      .translate('orgAccountSummary.details.pastDueBalance')
      .pipe(
        map((pastDueBalanceTitle) => ({
          title: pastDueBalanceTitle,
          text: [pastDueBalance ?? notApplicable],
        }))
      );
  }
}
