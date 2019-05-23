import { OccConfig } from '../../occ/config/occ-config';

export abstract class AuthConfig extends OccConfig {
  authentication?: {
    client_id?: string;
    client_secret?: string;
    kyma_client_id?: string;
    kyma_client_secret?: string;
  };
}
