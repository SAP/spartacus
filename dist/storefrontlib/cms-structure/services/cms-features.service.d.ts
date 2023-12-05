import { NgModuleRef } from '@angular/core';
import { CmsComponentMapping, ConfigInitializerService, FeatureModulesService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Service responsible for resolving cms config based feature modules.
 */
export declare class CmsFeaturesService {
    protected configInitializer: ConfigInitializerService;
    protected featureModules: FeatureModulesService;
    private featureModulesConfig?;
    private componentFeatureMap;
    private featureInstances;
    constructor(configInitializer: ConfigInitializerService, featureModules: FeatureModulesService);
    private initFeatureMap;
    /**
     * Check if there is feature module configuration that covers specified
     * component type
     */
    hasFeatureFor(componentType: string): boolean;
    /**
     * Return full CmsComponent mapping defined in feature module
     */
    getCmsMapping(componentType: string): Observable<CmsComponentMapping | undefined>;
    /**
     * Resolves feature module for provided component type
     *
     * @param componentType
     */
    getModule(componentType: string): NgModuleRef<any> | undefined;
    /**
     * Resolve feature based on feature name, if feature was not yet resolved
     *
     * It will first resolve all module dependencies if defined
     */
    private resolveFeatureInstance;
    /**
     * Create feature instance from feature's moduleRef
     */
    private createFeatureInstance;
    /**
     * Returns configuration provided in feature module
     */
    private resolveFeatureConfiguration;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsFeaturesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsFeaturesService>;
}
