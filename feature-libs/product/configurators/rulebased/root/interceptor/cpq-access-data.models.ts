/**
 *
 * Authorization data required for communicating with CPQ
 */
export interface CpqAccessData {
  /**
   * CPQ Access token
   */
  accessToken?: string;
  /**
   * Token expiration time in milli seconds
   */
  accessTokenExpirationTime?: number;
  /**
   * CPQ endpoint url
   */
  endpoint?: string;
}
