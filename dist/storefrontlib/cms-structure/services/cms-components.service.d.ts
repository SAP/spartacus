import { NgModuleRef } from '@angular/core';
import { Route } from '@angular/router';
import { CmsComponent, CmsComponentChildRoutesConfig, CMSComponentConfig, CmsComponentMapping, CmsConfig, ConfigInitializerService, DeferLoadingStrategy, LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsFeaturesService } from './cms-features.service';
import * as i0 from "@angular/core";
/**
 * Service with logic related to resolving component from cms mapping
 */
export declare class CmsComponentsService {
    protected config: CmsConfig;
    protected platformId: Object;
    protected featureModules: CmsFeaturesService;
    protected configInitializer: ConfigInitializerService;
    protected missingComponents: string[];
    protected mappings: {
        [componentType: string]: CmsComponentMapping;
    };
    protected staticCmsConfig: CMSComponentConfig | undefined;
    protected mappingResolvers: Map<string, Observable<CmsComponentMapping>>;
    protected logger: LoggerService;
    constructor(config: CmsConfig, platformId: Object, featureModules: CmsFeaturesService, configInitializer: ConfigInitializerService);
    /**
     * Should be called to make sure all component mappings are determined,
     * especially lazy loaded ones.
     *
     * It's recommended way to make sure all other methods of CmsComponentService
     * will be able to work synchronously for asked component types and avoid risk
     * of potential errors that could be thrown otherwise.
     */
    determineMappings(componentTypes: string[]): Observable<string[]>;
    private getFeatureMappingResolver;
    /**
     * Returns the feature module for a cms component.
     * It will only work for cms components provided by feature modules.
     *
     * @param componentType
     */
    getModule(componentType: string): NgModuleRef<any> | undefined;
    /**
     * Return collection of component mapping configuration for specified list of
     * component types.
     *
     * If component mapping can't be determined synchronously, for example, lazy
     * loaded one, it will throw an error.
     *
     * To make sure component mapping is available, determineMappings()
     * should be called and completed first.
     */
    getMapping(componentType: string): CmsComponentMapping;
    /**
     * Checks, if component should be rendered as some components
     * could be disabled for server side renderings
     */
    shouldRender(componentType: string): boolean;
    /**
     * Return DeferLoadingStrategy for component type.
     */
    getDeferLoadingStrategy(componentType: string): DeferLoadingStrategy | undefined;
    /**
     * Get cms driven child routes for components
     */
    getChildRoutes(componentTypes: string[]): CmsComponentChildRoutesConfig;
    /**
     * Returns the static data for the component type.
     */
    getStaticData<T extends CmsComponent = CmsComponent>(componentType: string): T | undefined;
    /**
     * Standardizes the format of `childRoutes` config.
     *
     * Some `childRoutes` configs are simple arrays of Routes (without the notion of the parent route).
     * But some configs can be an object with children routes and their parent defined in separate property.
     */
    protected standardizeChildRoutes(childRoutesConfigs: (Route[] | CmsComponentChildRoutesConfig)[]): CmsComponentChildRoutesConfig;
    /**
     * Get cms driven guards for components
     */
    getGuards(componentTypes: string[]): any[];
    /**
     * Get i18n keys associated with components
     */
    getI18nKeys(componentTypes: string[]): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsComponentsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsComponentsService>;
}
