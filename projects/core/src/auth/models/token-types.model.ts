export interface UserToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string[];
  userId: string;
  expiration_time?: Date;
}

export interface ClientToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export type AuthenticationToken = UserToken | ClientToken;
