import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorMessageConfig } from '../config/configurator-message.config';
import * as i0 from "@angular/core";
export declare class ConfiguratorUpdateMessageComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected config: ConfiguratorMessageConfig;
    hasPendingChanges$: Observable<boolean>;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService, config: ConfiguratorMessageConfig);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorUpdateMessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorUpdateMessageComponent, "cx-configurator-update-message", never, {}, {}, never, never, false, never>;
}
