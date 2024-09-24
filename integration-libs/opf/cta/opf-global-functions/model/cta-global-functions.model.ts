declare module '@spartacus/opf/payment/root' {
  /**
   * Endpoint to get CTA (Call To Action) Scripts
   */
  interface GlobalOpfPaymentMethods {
    scriptReady?(scriptIdentifier: string): void;
  }
}
