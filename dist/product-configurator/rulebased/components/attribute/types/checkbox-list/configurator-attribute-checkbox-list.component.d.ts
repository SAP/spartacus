import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { LoggerService } from '@spartacus/core';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeCheckBoxListComponent extends ConfiguratorAttributeMultiSelectionBaseComponent implements OnInit {
    protected configUtilsService: ConfiguratorStorefrontUtilsService;
    protected quantityService: ConfiguratorAttributeQuantityService;
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    attributeCheckBoxForms: UntypedFormControl[];
    group: string;
    protected logger: LoggerService;
    constructor(configUtilsService: ConfiguratorStorefrontUtilsService, quantityService: ConfiguratorAttributeQuantityService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService);
    ngOnInit(): void;
    get allowZeroValueQuantity(): boolean;
    onSelect(): void;
    onChangeValueQuantity(eventObject: any, valueCode: string, formIndex: number): void;
    onChangeQuantity(eventObject: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeCheckBoxListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeCheckBoxListComponent, "cx-configurator-attribute-checkbox-list", never, {}, {}, never, never, false, never>;
}
