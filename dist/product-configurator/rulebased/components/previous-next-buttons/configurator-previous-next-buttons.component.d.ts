import { CommonConfigurator, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorPreviousNextButtonsComponent {
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configUtils: ConfiguratorStorefrontUtilsService;
    configuration$: Observable<Configurator.Configuration>;
    constructor(configuratorGroupsService: ConfiguratorGroupsService, configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService, configUtils: ConfiguratorStorefrontUtilsService);
    onPrevious(configuration: Configurator.Configuration): void;
    onNext(configuration: Configurator.Configuration): void;
    isFirstGroup(owner: CommonConfigurator.Owner): Observable<boolean>;
    isLastGroup(owner: CommonConfigurator.Owner): Observable<boolean>;
    protected focusFirstAttribute(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorPreviousNextButtonsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorPreviousNextButtonsComponent, "cx-configurator-previous-next-buttons", never, {}, {}, never, never, false, never>;
}
