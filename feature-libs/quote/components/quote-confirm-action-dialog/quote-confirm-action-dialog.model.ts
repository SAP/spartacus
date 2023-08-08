import { Quote } from "@spartacus/quote/root";

export interface ConfirmationContext {
    quote: Quote;
    title: string;
    confirmNote: string;
    warningNote?: string;
    validity?: string;
    successMessage?: string;
  }

export type ConfirmActionDialogConfig = {
  i18nKey: string;
  showWarningNote: boolean;
  showExpirationDate: boolean;
  showSuccessMessage: boolean;
};

/**
 * default confirm action dialog configuration
 */
export const defaultConfirmActionDialogConfig = {
  showWarningNote: false,
  showExpirationDate: false,
  showSuccessMessage: true,
};

/**
 * confirm action dialog configuration - if  not provided for a given state/action combination dialog will be skipped
 */
export const confirmActionDialogConfigs: Map<
  string,
  Partial<ConfirmActionDialogConfig>
> = new Map([
  ['buyer.submit', {}],
  [
    'buyer_offer.edit',
    {
      showWarningNote: true,
      showExpirationDate: true,
      showSuccessMessage: false,
    },
  ],
  ['buyer_offer.cancel', {}],
  ['buyer.cancel', {}],
  ['seller.submit', {}],
  ['sellerapprover.submit', {}],
  ['sellerapprover.reject', {}],
]);
