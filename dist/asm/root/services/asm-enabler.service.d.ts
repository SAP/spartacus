import { Location } from '@angular/common';
import { FeatureModulesService, WindowRef } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import * as i0 from "@angular/core";
/**
 * The AsmEnablerService is used to enable ASM for those scenario's
 * where it's actually used. This service is added to avoid any polution
 * of the UI and runtime performance for the ordinary production user.
 */
export declare class AsmEnablerService {
    protected location: Location;
    protected winRef: WindowRef;
    protected launchDialogService: LaunchDialogService;
    protected featureModules: FeatureModulesService;
    constructor(location: Location, winRef: WindowRef, launchDialogService: LaunchDialogService, featureModules: FeatureModulesService);
    /**
     * Loads the ASM UI if needed. The ASM UI will be added based on the
     * existence of a URL parameter or previous usage given by local storage.
     */
    load(): void;
    /**
     * Indicates whether the ASM module is enabled.
     */
    isEnabled(): boolean;
    /**
     * Indicates whether ASM is launched through the URL,
     * using the asm flag in the URL.
     */
    protected isLaunched(): boolean;
    /**
     * check whether try to emulate customer from deeplink
     * */
    isEmulateInURL(): boolean;
    /**
     * Evaluates local storage where we persist the usage of ASM.
     */
    protected isUsedBefore(): boolean;
    /**
     * Adds the ASM UI by using the `cx-storefront` outlet.
     */
    protected addUi(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmEnablerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmEnablerService>;
}
