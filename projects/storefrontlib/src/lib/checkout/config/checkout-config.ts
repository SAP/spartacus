export abstract class CheckoutConfig {
  checkout?: {
    steps: Array<string>;
    deliveryMode?: string;
  };
}
