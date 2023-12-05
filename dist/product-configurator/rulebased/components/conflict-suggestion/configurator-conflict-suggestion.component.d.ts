import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorConflictSuggestionComponent {
    currentGroup: Configurator.Group;
    attribute: Configurator.Attribute;
    suggestionNumber: number;
    groupType: typeof Configurator.GroupType;
    tabindex: string;
    constructor();
    /**
     * Verifies whether the conflict suggestion should be displayed for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
     */
    displayConflictSuggestion(group: Configurator.Group): boolean;
    createSuggestionUiKey(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorConflictSuggestionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorConflictSuggestionComponent, "cx-configurator-conflict-suggestion", never, { "currentGroup": "currentGroup"; "attribute": "attribute"; "suggestionNumber": "suggestionNumber"; }, {}, never, never, false, never>;
}
