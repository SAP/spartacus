import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorUISettingsConfig } from '../../config/configurator-ui-settings.config';
import * as i0 from "@angular/core";
export interface ConfiguratorAttributeQuantityComponentOptions {
    allowZero?: boolean;
    initialQuantity?: number;
    disableQuantityActions$?: Observable<boolean>;
}
export declare class ConfiguratorAttributeQuantityComponent implements OnDestroy, OnInit {
    protected config: ConfiguratorUISettingsConfig;
    quantity: UntypedFormControl;
    optionsChangeSub: Subscription;
    quantityChangeSub: Subscription;
    quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
    changeQuantity: EventEmitter<number>;
    constructor(config: ConfiguratorUISettingsConfig);
    ngOnInit(): void;
    protected subscribeToQuantityChange(): Subscription;
    ngOnDestroy(): void;
    onChangeQuantity(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeQuantityComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeQuantityComponent, "cx-configurator-attribute-quantity", never, { "quantityOptions": "quantityOptions"; }, { "changeQuantity": "changeQuantity"; }, never, never, false, never>;
}
