export interface OAuthTryLoginResult {
  result: boolean;

  /**
   * It's true only when received the token from URL params.
   * Note: it's false in particular, when the token was retrieved from the storage.
   */
  tokenReceived: boolean;
}
