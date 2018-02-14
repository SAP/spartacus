export const Y_USER_TOKEN = 'y-user-token';

export interface UserToken {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  scope: string[];
  username: string;
}
