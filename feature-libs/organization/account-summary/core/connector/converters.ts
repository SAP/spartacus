import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { AccountSummary } from '../model';

//TODO Modify models

export const ACCOUNT_SUMMARY_NORMALIZER = new InjectionToken<
  Converter<any, AccountSummary>
>('AccountSummaryNormalizer');

export const ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER = new InjectionToken<
  Converter<any, any>
>('AccountSummaryDocumentNormalizer');
