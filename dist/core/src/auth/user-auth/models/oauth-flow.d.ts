/**
 * Supported OAuth flows.
 */
export declare enum OAuthFlow {
    /**
     * Flow when username and password is passed to the application and then the application through API fetches tokens from OAuth server.
     */
    ResourceOwnerPasswordFlow = 0,
    /**
     * Flow with redirect to OAuth server where user inputs credentials and the are redirected back with token.
     */
    ImplicitFlow = 1,
    /**
     * Similar to Implicit flow, but user is redirected with code that need to later exchange through API for a token.
     */
    AuthorizationCode = 2
}
