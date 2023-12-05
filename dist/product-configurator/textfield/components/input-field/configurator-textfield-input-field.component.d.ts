import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorTextfieldInputFieldComponent implements OnInit {
    PREFIX_TEXTFIELD: string;
    attributeInputForm: UntypedFormControl;
    attribute: ConfiguratorTextfield.ConfigurationInfo;
    inputChange: EventEmitter<ConfiguratorTextfield.ConfigurationInfo>;
    constructor();
    ngOnInit(): void;
    /**
     * Triggered if an attribute value is changed. Triggers the emission of the inputChange event emitter that is
     * in turn received in the form component
     */
    onInputChange(): void;
    /**
     * Compiles an ID for the attribute label by using the label from the backend and a prefix 'label'
     * @param attribute Textfield configurator attribute. Carries the attribute label information from the backend
     * @returns ID
     */
    getIdLabel(attribute: ConfiguratorTextfield.ConfigurationInfo): string;
    /**
     * Compiles an ID for the attribute value by using the label from the backend
     * @param attribute Textfield configurator attribute. Carries the attribute label information from the backend
     * @returns ID
     */
    getId(attribute: ConfiguratorTextfield.ConfigurationInfo): string;
    protected getLabelForIdGeneration(attribute: ConfiguratorTextfield.ConfigurationInfo): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorTextfieldInputFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorTextfieldInputFieldComponent, "cx-configurator-textfield-input-field", never, { "attribute": "attribute"; }, { "inputChange": "inputChange"; }, never, never, false, never>;
}
