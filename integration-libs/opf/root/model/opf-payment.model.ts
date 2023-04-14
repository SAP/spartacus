export interface PaymentInitiationConfig {
  configurationId?: string;
  cartId?: string;
  resultURL?: string;
  cancelURL?: string;
  channel?: string;
  browserInfo?: PaymentBrowserInfo;
}

export interface PaymentBrowserInfo {
  acceptHeader?: string;
  colorDepth?: number;
  javaEnabled?: boolean;
  javaScriptEnabled?: boolean;
  language?: string;
  screenHeight?: number;
  screenWidth?: number;
  userAgent?: string;
  timeZoneOffset?: number;
  ipAddress?: string;
  originUrl?: string;
}

export interface PaymentSessionData {
  paymentSessionId?: string;
  relayResultUrl?: string;
  relayCancelUrl?: string;
  paymentIntent?: string;
  pattern?: string;
  destination?: PaymentSessionDestination;
}

export interface PaymentSessionFormField {
  name?: string;
  value?: string;
}

export interface PaymentSessionDestination {
  url?: string;
  method?: string;
  contentType?: string;
  body?: string;
  authenticationIds?: number[];
  form?: PaymentSessionFormField[];
}
