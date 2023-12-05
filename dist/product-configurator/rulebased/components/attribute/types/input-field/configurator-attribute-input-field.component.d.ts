import { OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Observable, Subscription } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeInputFieldComponent extends ConfiguratorAttributeBaseComponent implements OnInit, OnDestroy {
    protected config: ConfiguratorUISettingsConfig;
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService | undefined;
    attributeInputForm: UntypedFormControl;
    protected sub: Subscription;
    attribute: Configurator.Attribute;
    group: string;
    owner: CommonConfigurator.Owner;
    ownerKey: string;
    ownerType: CommonConfigurator.OwnerType;
    showRequiredErrorMessage$: Observable<boolean>;
    /**
     * In case no config is injected, or when the debounce time is not configured at all,
     * this value will be used as fallback.
     */
    protected readonly FALLBACK_DEBOUNCE_TIME = 500;
    constructor(config: ConfiguratorUISettingsConfig, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService, configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService);
    /**
     * @deprecated since 6.2
     */
    constructor(config: ConfiguratorUISettingsConfig, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService);
    ngOnInit(): void;
    onChange(): void;
    ngOnDestroy(): void;
    /**
     * Verifies if the user input has a non-blank value.
     * @returns {boolean} - 'True' if the user input is undefined, empty or contains only blanks, otherwise 'false'.
     */
    get isUserInputEmpty(): boolean;
    /**
     * Checks if the component needs to be marked as required.
     * This is never the case if it is used as sub component for an attribute type which allows an additional value
     * @returns Required?
     */
    get isRequired(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeInputFieldComponent, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeInputFieldComponent, "cx-configurator-attribute-input-field", never, {}, {}, never, never, false, never>;
}
