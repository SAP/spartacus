import { OnInit } from '@angular/core';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeRadioButtonComponent extends ConfiguratorAttributeSingleSelectionBaseComponent implements OnInit {
    protected quantityService: ConfiguratorAttributeQuantityService;
    protected translation: TranslationService;
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService | undefined;
    attributeRadioButtonForm: UntypedFormControl;
    constructor(quantityService: ConfiguratorAttributeQuantityService, translation: TranslationService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService, configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService);
    /**
     * @deprecated since 6.2
     */
    constructor(quantityService: ConfiguratorAttributeQuantityService, translation: TranslationService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeRadioButtonComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeRadioButtonComponent, "cx-configurator-attribute-radio-button", never, {}, {}, never, never, false, never>;
}
