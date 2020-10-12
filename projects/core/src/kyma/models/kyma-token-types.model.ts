import { UserToken } from '../../auth/user-auth/models/user-token.model';

export interface OpenIdToken extends UserToken {
  id_token: string;
}
