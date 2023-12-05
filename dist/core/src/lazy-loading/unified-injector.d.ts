import { AbstractType, InjectionToken, Injector, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { LazyModulesService } from './lazy-modules.service';
import * as i0 from "@angular/core";
/**
 * UnifiedInjector provides a way to get instances of tokens not only once, from the root injector,
 * but also from lazy loaded module injectors that can be initialized over time.
 */
export declare class UnifiedInjector {
    protected rootInjector: Injector;
    protected lazyModules: LazyModulesService;
    /**
     * Gather all the injectors, with the root injector as a first one
     *
     */
    readonly injectors$: Observable<Injector>;
    constructor(rootInjector: Injector, lazyModules: LazyModulesService);
    /**
     * Gen instances for specified tokens.
     *
     * When notFoundValue is provided, it will consistently emit once per injector,
     * even if injector doesn't contain instances for specified token.
     * Otherwise, emissions will only involve cases, where new instances will be found.
     *
     * @param token
     * @param notFoundValue
     */
    get<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T): Observable<T>;
    /**
     * Get multi provided instances for a specified token
     *
     * @param token
     */
    getMulti<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>): Observable<T[]>;
    getMulti<T>(token: any): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnifiedInjector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnifiedInjector>;
}
