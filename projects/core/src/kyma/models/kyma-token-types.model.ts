import { UserToken } from '../../auth/models/token-types.model';

export interface OpenIdToken extends UserToken {
  id_token: string;
}
