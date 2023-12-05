import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorConflictAndErrorMessagesComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    iconTypes: typeof ICON_TYPE;
    configuration$: Observable<Configurator.Configuration>;
    showWarnings: boolean;
    toggleWarnings(): void;
    showErrors: boolean;
    toggleErrors(): void;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorConflictAndErrorMessagesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorConflictAndErrorMessagesComponent, "cx-configuration-conflict-and-error-messages", never, {}, {}, never, never, false, never>;
}
