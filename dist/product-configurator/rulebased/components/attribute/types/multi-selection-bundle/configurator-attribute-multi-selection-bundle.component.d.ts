import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';
import * as i0 from "@angular/core";
interface SelectionValue {
    name?: string;
    quantity?: number;
    selected?: boolean;
    valueCode: string;
}
export declare class ConfiguratorAttributeMultiSelectionBundleComponent extends ConfiguratorAttributeMultiSelectionBaseComponent implements OnInit {
    preventAction$: BehaviorSubject<boolean>;
    multipleSelectionValues: SelectionValue[];
    ngOnInit(): void;
    /**
     * Initializes selection values and peventAction observable
     */
    protected initialize(): void;
    /**
     * Updates the value dependent on the provided state
     *
     * @param  {any} valueCode - value code to be updated
     * @param  {any} state - selected state
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    protected updateMultipleSelectionValues(valueCode: any, state: any): ConfigFormUpdateEvent;
    /**
     * Updates the quantity of the given value
     *
     * @param  eventValue - event value
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    protected updateMultipleSelectionValuesQuantity(eventValue: {
        valueCode: string;
        quantity: number;
    }): ConfigFormUpdateEvent | undefined;
    onSelect(eventValue: any): void;
    onDeselect(eventValue: any): void;
    onDeselectAll(): void;
    onChangeValueQuantity(eventValue: any): void;
    onChangeAttributeQuantity(eventObject: any): void;
    /**
     * Extract corresponding price formula parameters
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions;
    /**
     * Extract corresponding product card parameters
     * @param {boolean} disableAllButtons - Prevent all actions, e.g. while loading
     * @param {boolean} hideRemoveButton - hide remove action, e.g. if only value required attribute
     * @param {Configurator.Value} value - Value
     * @param {number} index - index of current value in list of values of attribute
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(disableAllButtons: boolean | null, hideRemoveButton: boolean | null, value: Configurator.Value, index: number): ConfiguratorAttributeProductCardComponentOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeMultiSelectionBundleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeMultiSelectionBundleComponent, "cx-configurator-attribute-multi-selection-bundle", never, {}, {}, never, never, false, never>;
}
export {};
