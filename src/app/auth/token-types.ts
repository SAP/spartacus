export const Y_USER_TOKEN = 'y-user-token';

export interface TokenRequest {
  clientId: string;
  clientSecret: string;
  grantType: string;
  username: string;
  password: string;
}

export interface Token {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  scope: string[];
  username: string;
}
