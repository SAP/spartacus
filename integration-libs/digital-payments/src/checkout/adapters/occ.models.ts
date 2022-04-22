export interface OccDpPaymentRequest {
  postUrl?: string;
  parameters?: {
    entry?: Array<{ key?: string; value?: string }>;
  };
}
