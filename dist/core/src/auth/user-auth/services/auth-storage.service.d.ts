import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { AuthToken } from '../models/auth-token.model';
import * as i0 from "@angular/core";
/**
 * Storage service for AuthToken. Used as a storage for angular-oauth2-oidc library.
 */
export declare class AuthStorageService extends OAuthStorage {
    /**
     * Extracted keys that are not `JSON.stringify` from reading the angular-oauth2-oidc source code
     */
    protected static readonly nonStringifiedOAuthLibKeys: string[];
    protected _token$: Observable<AuthToken>;
    protected decode(key: string, value: any): any;
    protected encode(key: string, value: any): any;
    /**
     * Returns complete token (all fields).
     *
     * @return observable emitting AuthToken
     */
    getToken(): Observable<AuthToken>;
    /**
     * Set current value of token.
     *
     * @param token
     */
    setToken(token: AuthToken): void;
    /**
     * Get parameter from the token (eg. access_token)
     *
     * @param key
     */
    getItem(key: string): any;
    /**
     * Removes parameter from the token (eg. access_token)
     *
     * @param key
     */
    removeItem(key: string): void;
    /**
     * Sets parameter of the token (eg. access_token)
     *
     * @param key
     */
    setItem(key: string, data: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthStorageService>;
}
