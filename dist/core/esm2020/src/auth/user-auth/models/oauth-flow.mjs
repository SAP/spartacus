/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Supported OAuth flows.
 */
export var OAuthFlow;
(function (OAuthFlow) {
    /**
     * Flow when username and password is passed to the application and then the application through API fetches tokens from OAuth server.
     */
    OAuthFlow[OAuthFlow["ResourceOwnerPasswordFlow"] = 0] = "ResourceOwnerPasswordFlow";
    /**
     * Flow with redirect to OAuth server where user inputs credentials and the are redirected back with token.
     */
    OAuthFlow[OAuthFlow["ImplicitFlow"] = 1] = "ImplicitFlow";
    /**
     * Similar to Implicit flow, but user is redirected with code that need to later exchange through API for a token.
     */
    OAuthFlow[OAuthFlow["AuthorizationCode"] = 2] = "AuthorizationCode";
})(OAuthFlow || (OAuthFlow = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgtZmxvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL21vZGVscy9vYXV0aC1mbG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSDs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLFNBYVg7QUFiRCxXQUFZLFNBQVM7SUFDbkI7O09BRUc7SUFDSCxtRkFBeUIsQ0FBQTtJQUN6Qjs7T0FFRztJQUNILHlEQUFZLENBQUE7SUFDWjs7T0FFRztJQUNILG1FQUFpQixDQUFBO0FBQ25CLENBQUMsRUFiVyxTQUFTLEtBQVQsU0FBUyxRQWFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbi8qKlxuICogU3VwcG9ydGVkIE9BdXRoIGZsb3dzLlxuICovXG5leHBvcnQgZW51bSBPQXV0aEZsb3cge1xuICAvKipcbiAgICogRmxvdyB3aGVuIHVzZXJuYW1lIGFuZCBwYXNzd29yZCBpcyBwYXNzZWQgdG8gdGhlIGFwcGxpY2F0aW9uIGFuZCB0aGVuIHRoZSBhcHBsaWNhdGlvbiB0aHJvdWdoIEFQSSBmZXRjaGVzIHRva2VucyBmcm9tIE9BdXRoIHNlcnZlci5cbiAgICovXG4gIFJlc291cmNlT3duZXJQYXNzd29yZEZsb3csXG4gIC8qKlxuICAgKiBGbG93IHdpdGggcmVkaXJlY3QgdG8gT0F1dGggc2VydmVyIHdoZXJlIHVzZXIgaW5wdXRzIGNyZWRlbnRpYWxzIGFuZCB0aGUgYXJlIHJlZGlyZWN0ZWQgYmFjayB3aXRoIHRva2VuLlxuICAgKi9cbiAgSW1wbGljaXRGbG93LFxuICAvKipcbiAgICogU2ltaWxhciB0byBJbXBsaWNpdCBmbG93LCBidXQgdXNlciBpcyByZWRpcmVjdGVkIHdpdGggY29kZSB0aGF0IG5lZWQgdG8gbGF0ZXIgZXhjaGFuZ2UgdGhyb3VnaCBBUEkgZm9yIGEgdG9rZW4uXG4gICAqL1xuICBBdXRob3JpemF0aW9uQ29kZSxcbn1cbiJdfQ==