import {
  StateWithDigitalPayments,
  DIGITAL_PAYMENTS_FEATURE,
} from '../digital-payments-state';
import { DigitalPaymentsState } from '../digital-payments-state';
import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

export const getDigitalPaymentsState: MemoizedSelector<
  StateWithDigitalPayments,
  DigitalPaymentsState
> = createFeatureSelector<DigitalPaymentsState>(DIGITAL_PAYMENTS_FEATURE);
