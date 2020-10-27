/**
 * Supported OAuth flows.
 */
export enum OAuthFlow {
  /**
   * Flow when username and password is passed to the application and then the application through API fetches tokens from OAuth server.
   */
  ResourceOwnerPasswordFlow,
  /**
   * Flow with redirect to OAuth server where user inputs credentials and the are redirected back with token.
   */
  ImplicitFlow,
  /**
   * Similar to Implicit flow, but user is redirected with code that need to later exchange through API for a token.
   */
  AuthorizationCode,
}
