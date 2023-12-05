import { OnInit } from '@angular/core';
import { FeatureConfigService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../composition/configurator-attribute-composition.model';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeFooterComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    protected configUtils: ConfiguratorStorefrontUtilsService;
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected featureConfigService?: FeatureConfigService | undefined;
    attribute: Configurator.Attribute;
    owner: CommonConfigurator.Owner;
    groupId: string;
    constructor(configUtils: ConfiguratorStorefrontUtilsService, attributeComponentContext: ConfiguratorAttributeCompositionContext, featureConfigService?: FeatureConfigService);
    /**
     * @deprecated since 6.2
     */
    constructor(configUtils: ConfiguratorStorefrontUtilsService, attributeComponentContext: ConfiguratorAttributeCompositionContext);
    iconType: typeof ICON_TYPE;
    showRequiredMessageForUserInput$: Observable<boolean>;
    ngOnInit(): void;
    protected needsRequiredAttributeErrorMsg(): boolean;
    protected needsDropDownMsg(): boolean;
    /**
     * Checks if attribute is a user input typed attribute with empty value.
     * Method will return false for domain based attributes
     * @param {string} input - user input
     */
    isUserInputEmpty(input?: string): boolean;
    protected needsUserInputMsg(): boolean;
    /**
     * @deprecated since 6.2
     *
     * `needsUserInputMsg` method will be called instead.
     */
    protected needsUserInputMessage(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeFooterComponent, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeFooterComponent, "cx-configurator-attribute-footer", never, {}, {}, never, never, false, never>;
}
