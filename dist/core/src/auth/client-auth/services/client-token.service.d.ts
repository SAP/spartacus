import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { ClientToken } from '../models/client-token.model';
import { StateWithClientAuth } from '../store/client-auth-state';
import * as i0 from "@angular/core";
/**
 * Serves a role of a facade on client token store.
 */
export declare class ClientTokenService {
    protected store: Store<StateWithClientAuth>;
    constructor(store: Store<StateWithClientAuth>);
    /**
     * Returns a client token. The client token from the store is returned if there is one.
     * Otherwise a new token is fetched from the backend and saved in the store.
     */
    getClientToken(): Observable<ClientToken | undefined>;
    /**
     * Fetches a clientToken from the backend and saves it in the store where getClientToken can use it.
     * The new clientToken is returned.
     */
    refreshClientToken(): Observable<ClientToken>;
    protected isClientTokenLoaded(state: LoaderState<ClientToken>): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClientTokenService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClientTokenService>;
}
