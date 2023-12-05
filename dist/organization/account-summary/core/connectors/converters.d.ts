import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { AccountSummaryDetails, AccountSummaryList } from '@spartacus/organization/account-summary/root';
export declare const ACCOUNT_SUMMARY_NORMALIZER: InjectionToken<Converter<any, AccountSummaryDetails>>;
export declare const ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER: InjectionToken<Converter<any, AccountSummaryList>>;
