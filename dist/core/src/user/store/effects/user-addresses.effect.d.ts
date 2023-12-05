import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/index';
import { LoggerService } from '../../../logger';
import { UserAddressConnector } from '../../connectors/address/user-address.connector';
import { UserAddressService } from '../../facade/user-address.service';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class UserAddressesEffects {
    private actions$;
    private userAddressConnector;
    private userAddressService;
    private messageService;
    protected logger: LoggerService;
    loadUserAddresses$: Observable<UserActions.UserAddressesAction>;
    addUserAddress$: Observable<UserActions.UserAddressesAction>;
    updateUserAddress$: Observable<UserActions.UserAddressesAction>;
    deleteUserAddress$: Observable<UserActions.UserAddressesAction>;
    /**
     *  Reload addresses and notify about add success
     */
    showGlobalMessageOnAddSuccess$: Observable<never> & import("@ngrx/effects").CreateEffectMetadata;
    /**
     *  Reload addresses and notify about update success
     */
    showGlobalMessageOnUpdateSuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
    /**
     *  Reload addresses and notify about delete success
     */
    showGlobalMessageOnDeleteSuccess$: Observable<never> & import("@ngrx/effects").CreateEffectMetadata;
    constructor(actions$: Actions, userAddressConnector: UserAddressConnector, userAddressService: UserAddressService, messageService: GlobalMessageService);
    /**
     * Show global confirmation message with provided text
     */
    private showGlobalMessage;
    private loadAddresses;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAddressesEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAddressesEffects>;
}
