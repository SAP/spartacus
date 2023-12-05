import { Actions } from '@ngrx/effects';
import { CartActions } from '@spartacus/cart/base/core';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ConfiguratorTextfieldConnector } from '../../connectors/configurator-textfield.connector';
import { ConfiguratorTextfieldActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ConfiguratorTextfieldEffects {
    private actions$;
    private configuratorTextfieldConnector;
    protected logger: LoggerService;
    createConfiguration$: Observable<ConfiguratorTextfieldActions.CreateConfigurationSuccess | ConfiguratorTextfieldActions.CreateConfigurationFail>;
    addToCart$: Observable<ConfiguratorTextfieldActions.RemoveConfiguration | ConfiguratorTextfieldActions.AddToCartFail | CartActions.LoadCart>;
    updateCartEntry$: Observable<ConfiguratorTextfieldActions.RemoveConfiguration | ConfiguratorTextfieldActions.UpdateCartEntryConfigurationFail | CartActions.LoadCart>;
    readConfigurationForCartEntry$: Observable<ConfiguratorTextfieldActions.ReadCartEntryConfigurationSuccess | ConfiguratorTextfieldActions.ReadCartEntryConfigurationFail>;
    readConfigurationForOrderEntry$: Observable<ConfiguratorTextfieldActions.ReadOrderEntryConfigurationSuccess | ConfiguratorTextfieldActions.ReadOrderEntryConfigurationFail>;
    constructor(actions$: Actions, configuratorTextfieldConnector: ConfiguratorTextfieldConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorTextfieldEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorTextfieldEffects>;
}
