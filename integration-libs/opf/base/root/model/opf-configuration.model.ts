import { DigitalWalletQuickBuy } from './opf-quick-buy.model';

export interface ActiveConfiguration {
  description?: string;
  id?: number;
  merchantId?: string;
  providerType?: OpfPaymentProviderType;
  displayName?: string;
  acquirerCountryCode?: string;
  digitalWalletQuickBuy?: DigitalWalletQuickBuy[];
}

export enum OpfPaymentProviderType {
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
}
