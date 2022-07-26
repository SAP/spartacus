import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { AccountSummaryList, AccountSummaryDetails } from '../model';

export const ACCOUNT_SUMMARY_NORMALIZER = new InjectionToken<
  Converter<any, AccountSummaryDetails>
>('AccountSummaryNormalizer');

export const ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER = new InjectionToken<
  Converter<any, AccountSummaryList>
>('AccountSummaryDocumentNormalizer');
