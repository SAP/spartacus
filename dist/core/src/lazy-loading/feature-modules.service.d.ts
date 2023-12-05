import { NgModuleRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsConfig, FeatureModuleConfig } from '../cms/config/cms-config';
import { LazyModulesService } from './lazy-modules.service';
import * as i0 from "@angular/core";
export declare class FeatureModulesService {
    protected cmsConfig: CmsConfig;
    protected lazyModules: LazyModulesService;
    private features;
    constructor(cmsConfig: CmsConfig, lazyModules: LazyModulesService);
    /**
     * Check if feature is configured properly by providing module the shell app
     *
     * @param featureName
     */
    isConfigured(featureName: string): boolean;
    /**
     * Resolve feature based on feature name, if feature was not yet resolved
     *
     * It will first resolve all module dependencies if defined
     */
    resolveFeature(featureName: string): Observable<NgModuleRef<any>>;
    /**
     * Resolve
     * @param featureName
     * @protected
     */
    protected getFeatureConfig(featureName: string): FeatureModuleConfig | undefined;
    /**
     * Will return target feature name, resolving optional feature to feature
     * string mapping
     *
     * @param featureName
     * @protected
     */
    protected resolveFeatureAlias(featureName: string): string;
    /**
     * Resolve dependency modules for the feature
     *
     * @param dependencies
     * @protected
     */
    protected resolveDependencies(dependencies?: any[]): Observable<NgModuleRef<any>[] | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FeatureModulesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FeatureModulesService>;
}
