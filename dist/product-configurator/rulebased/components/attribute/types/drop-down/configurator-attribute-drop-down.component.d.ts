import { OnInit } from '@angular/core';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeDropDownComponent extends ConfiguratorAttributeSingleSelectionBaseComponent implements OnInit {
    protected quantityService: ConfiguratorAttributeQuantityService;
    protected translation: TranslationService;
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService | undefined;
    attributeDropDownForm: UntypedFormControl;
    group: string;
    constructor(quantityService: ConfiguratorAttributeQuantityService, translation: TranslationService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService, configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService);
    /**
     * @deprecated since 6.2
     */
    constructor(quantityService: ConfiguratorAttributeQuantityService, translation: TranslationService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService);
    ngOnInit(): void;
    getSelectedValue(): Configurator.Value | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeDropDownComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeDropDownComponent, "cx-configurator-attribute-drop-down", never, {}, {}, never, never, false, never>;
}
