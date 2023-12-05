import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ConfiguratorCoreConfig } from '../../config/configurator-core.config';
import { RulebasedConfiguratorConnector } from '../../connectors/rulebased-configurator.connector';
import { ConfiguratorActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ConfiguratorVariantEffects {
    protected actions$: Actions;
    protected configuratorCommonsConnector: RulebasedConfiguratorConnector;
    protected configuratorCoreConfig: ConfiguratorCoreConfig;
    protected logger: LoggerService;
    searchVariants$: Observable<ConfiguratorActions.SearchVariantsSuccess | ConfiguratorActions.SearchVariantsFail>;
    constructor(actions$: Actions, configuratorCommonsConnector: RulebasedConfiguratorConnector, configuratorCoreConfig: ConfiguratorCoreConfig);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorVariantEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorVariantEffects>;
}
