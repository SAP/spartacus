import { Configurator } from '../../model/configurator.model';
import * as i0 from "@angular/core";
/**
 * Service that provides helper methods for the basic configurator effects,
 * in order to enhance them without the need to introduce new effects
 */
export declare class ConfiguratorBasicEffectService {
    /**
     * Finds first attribute group with attributes for a configuration (ignores conflict groups per default).
     * If optional parameter 'includeConflicts' is set to true it finds first group with attributes including conflict groups.
     * Throws error if such a group does not exist, as this is an illegal state
     * @param configuration
     * @param includeConflicts (optional) if true it includes also conflict groups in the search
     * @returns Group id
     *
     */
    getFirstGroupWithAttributes(configuration: Configurator.Configuration, includeConflicts?: boolean): string;
    /**
     * Finds first group with attributes in a list of groups. Dependent on 'includeConflicts' parameters it includes conflict groups in the search or it ignores them.
     * @param groups
     * @param includeConflicts set to true in order to include conflict groups in the seach
     * @returns Group id
     */
    protected getFirstGroupWithAttributesForList(groups: Configurator.Group[], includeConflicts: boolean): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorBasicEffectService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorBasicEffectService>;
}
