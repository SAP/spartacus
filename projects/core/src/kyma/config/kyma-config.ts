import { OccConfig } from '../../occ/config/occ-config';

export abstract class KymaConfig extends OccConfig {
  authentication?: {
    /**
     * If set to `true`, the integration with kyma will be enabled, and Open ID token will be retrieved when registering/logging in,
     */
    kyma_enabled?: boolean;
    kyma_client_id?: string;
    kyma_client_secret?: string;
  };
}
