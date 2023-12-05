import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorPriceSummaryComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    configuration$: Observable<Configurator.Configuration>;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorPriceSummaryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorPriceSummaryComponent, "cx-configurator-price-summary", never, {}, {}, never, never, false, never>;
}
