import { AbstractType, InjectionToken, InjectOptions, Injector, Type } from '@angular/core';
/**
 * CombinedInjector is able to combine more than one injector together.
 *
 * Can be used to instantiate lazy loaded modules with dependency modules,
 * so lazy loaded module can use instances provided in all dependency modules.
 *
 * Injector tries to resolve token in all Injector, taking into account the order
 * in which they were provided in complementaryInjectors and fallbacks to the
 * mainInjector.
 */
export declare class CombinedInjector implements Injector {
    private mainInjector;
    private complementaryInjectors;
    /**
     * @param mainInjector Component hierarchical injector
     * @param complementaryInjectors Additional injector that will be taken into an account when resolving dependencies
     */
    constructor(mainInjector: Injector, complementaryInjectors: Injector[]);
    get<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, optional?: InjectOptions): T;
    get(token: any, notFoundValue?: any): any;
}
