import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorTextfieldInputFieldReadonlyComponent {
    PREFIX_TEXTFIELD: string;
    attribute: ConfiguratorTextfield.ConfigurationInfo;
    /**
     * Compiles an ID for the attribute label by using the label from the backend and a prefix 'label'
     * @param {ConfiguratorTextfield.ConfigurationInfo} attribute Textfield configurator attribute. Carries the attribute label information from the backend
     * @returns {string} ID
     */
    getIdLabel(attribute: ConfiguratorTextfield.ConfigurationInfo): string;
    protected getLabelForIdGeneration(attribute: ConfiguratorTextfield.ConfigurationInfo): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorTextfieldInputFieldReadonlyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorTextfieldInputFieldReadonlyComponent, "cx-configurator-textfield-input-field-readonly", never, { "attribute": "attribute"; }, {}, never, never, false, never>;
}
