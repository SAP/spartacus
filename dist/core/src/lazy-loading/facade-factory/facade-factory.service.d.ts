import { AbstractType, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureModulesService } from '../feature-modules.service';
import { FacadeDescriptor } from './facade-descriptor';
import * as i0 from "@angular/core";
/**
 * Service that can create proxy facade, which is a service that will expose
 * methods and properties from a facade implemented in the lazy loaded module.
 *
 * Returned proxy facade will lazy load the feature and facade implementation
 * at first method call or when first property observable will be subscribed.
 */
export declare class FacadeFactoryService {
    protected featureModules: FeatureModulesService;
    protected injector: Injector;
    constructor(featureModules: FeatureModulesService, injector: Injector);
    protected getResolver<T>(feature: string, facadeClass: AbstractType<T>, async?: boolean): Observable<T>;
    /**
     * Calls a method on a facade
     *
     * Method should either return an observable or void. Any other return type
     * than observable is ignored.
     *
     * @param resolver$
     * @param method
     * @param args
     * @protected
     */
    protected call(resolver$: Observable<any>, method: string, args: unknown[]): Observable<unknown>;
    /**
     * Get the property value from the facade
     *
     * Property has to be an aobservable
     *
     * @param resolver$
     * @param property
     * @protected
     */
    protected get(resolver$: Observable<any>, property: string): Observable<unknown>;
    create<T extends object>({ facade, feature, methods, properties, async, }: FacadeDescriptor<T>): T;
    /**
     * isProxyFacadeInstance tests if the provided facade is labeled as a proxy instance.
     * Facade proxy instances contain an object key to label them as such.
     * @param facade The facade object to evaluate
     */
    isProxyFacadeInstance(facade: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<FacadeFactoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FacadeFactoryService>;
}
