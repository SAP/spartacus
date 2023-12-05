import { ConfiguratorTextfieldService } from '../../core/facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorTextfieldAddToCartButtonComponent {
    protected configuratorTextfieldService: ConfiguratorTextfieldService;
    configuration: ConfiguratorTextfield.Configuration;
    productCode: string;
    constructor(configuratorTextfieldService: ConfiguratorTextfieldService);
    /**
     * Adds the textfield configuration to the cart or updates it
     */
    onAddToCart(): void;
    /**
     * Returns button description. Button will display 'addToCart' or 'done' in case configuration indicates that owner is a cart entry
     * @returns Resource key of button description
     */
    getButtonText(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorTextfieldAddToCartButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorTextfieldAddToCartButtonComponent, "cx-configurator-textfield-add-to-cart-button", never, { "configuration": "configuration"; "productCode": "productCode"; }, {}, never, never, false, never>;
}
