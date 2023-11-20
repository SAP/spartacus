export interface SpikeQueryParams {
  backendUrl?: string;
  backendUrlFields?: string;
  backendTimeout?: number;
  backendCallsNumber?: number;

  loggerInterceptor?: boolean | 'stressOnly';
}
