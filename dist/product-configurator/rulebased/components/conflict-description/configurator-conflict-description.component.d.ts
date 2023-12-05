import { ICON_TYPE } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorConflictDescriptionComponent {
    currentGroup: Configurator.Group;
    groupType: typeof Configurator.GroupType;
    iconTypes: typeof ICON_TYPE;
    tabindex: string;
    constructor();
    /**
     * Verifies whether the  conflict description should be displayed for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
     */
    displayConflictDescription(group: Configurator.Group): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorConflictDescriptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorConflictDescriptionComponent, "cx-configurator-conflict-description", never, { "currentGroup": "currentGroup"; }, {}, never, never, false, never>;
}
