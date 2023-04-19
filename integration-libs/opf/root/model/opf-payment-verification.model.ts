export interface OpfPaymentVerificationPayload {
  responseMap: KeyValuePair[];
}

export interface KeyValuePair {
  key: string;
  value: string;
}

export interface OpfPaymentVerificationResponse {
  result: string;
}
export enum OpfPaymentVerificationResult {
  AUTHORIZED = 'AUTHORIZED',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export enum OpfPaymenVerificationUrlInput {
  PAYMENT_SESSION_ID = 'paymentSessionId',
}
