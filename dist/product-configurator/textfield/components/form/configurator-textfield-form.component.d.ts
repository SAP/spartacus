import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorTextfieldService } from '../../core/facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorTextfieldFormComponent {
    protected configuratorTextfieldService: ConfiguratorTextfieldService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    configuration$: Observable<ConfiguratorTextfield.Configuration>;
    isEditable$: Observable<boolean>;
    constructor(configuratorTextfieldService: ConfiguratorTextfieldService, configRouterExtractorService: ConfiguratorRouterExtractorService);
    /**
     * Updates a configuration attribute
     * @param attribute - Configuration attribute, always containing a string typed value
     */
    updateConfiguration(attribute: ConfiguratorTextfield.ConfigurationInfo): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorTextfieldFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorTextfieldFormComponent, "cx-configurator-textfield-form", never, {}, {}, never, never, false, never>;
}
