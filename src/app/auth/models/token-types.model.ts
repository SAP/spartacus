export const Y_USER_TOKEN = 'y-user-token';

export interface UserToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string[];
  username: string;
}
