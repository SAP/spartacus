import { BreakpointService } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewAttributeComponent {
    protected breakpointService: BreakpointService;
    attributeOverview: Configurator.AttributeOverview;
    constructor(breakpointService: BreakpointService);
    extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions;
    /**
     * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
     */
    isDesktop(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewAttributeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewAttributeComponent, "cx-configurator-overview-attribute", never, { "attributeOverview": "attributeOverview"; }, {}, never, never, false, never>;
}
