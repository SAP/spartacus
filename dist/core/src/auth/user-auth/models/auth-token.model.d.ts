/**
 * Structure of token used by the OAuth lib and across `UserAuthModule`.
 */
export interface AuthToken {
    /**
     * Token used for `Authorization` header.
     */
    access_token: string;
    /**
     * Token to refresh the `access_token` when it expires.
     */
    refresh_token?: string;
    /**
     * Time when `access_token` expires.
     */
    expires_at?: string;
    /**
     * Scopes granted by the OAuth server.
     */
    granted_scopes?: string[];
    /**
     * Time when `access_token` was fetched from OAuth server and saved.
     */
    access_token_stored_at: string;
    /**
     * Type of the `access_token`. Most often `Bearer`.
     */
    token_type?: string;
}
