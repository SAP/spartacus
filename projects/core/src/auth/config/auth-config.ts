import { OccConfig } from '../../occ/config/occ-config';

export abstract class AuthConfig extends OccConfig {
  authentication?: {
    client_id?: string;
    client_secret?: string;
  };
}
