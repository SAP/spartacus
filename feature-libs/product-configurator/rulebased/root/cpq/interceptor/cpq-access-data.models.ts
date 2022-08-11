/**
 *
 * Authorization data required for communicating with CPQ
 */
export interface CpqAccessData {
  /**
   * CPQ Access token
   */
  accessToken: string;
  /**
   * Token expiration time in milliseconds
   */
  accessTokenExpirationTime: number;
  /**
   * CPQ endpoint url
   */
  endpoint: string;
}
