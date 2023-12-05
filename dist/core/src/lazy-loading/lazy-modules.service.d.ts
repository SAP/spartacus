import { Compiler, Injector, NgModuleRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from '../event/event.service';
import { LoggerService } from '../logger';
import * as i0 from "@angular/core";
/**
 * Utility service for managing dynamic imports of Angular services
 */
export declare class LazyModulesService implements OnDestroy {
    protected compiler: Compiler;
    protected injector: Injector;
    protected events: EventService;
    protected logger: LoggerService;
    /**
     * Expose lazy loaded module references
     */
    readonly modules$: Observable<NgModuleRef<any>>;
    private readonly dependencyModules;
    private readonly eventSubscription;
    constructor(compiler: Compiler, injector: Injector, events: EventService);
    /**
     * Resolves module instance based dynamic import wrapped in an arrow function
     *
     * New module instance will be created with each call.
     *
     * @param moduleFunc
     * @param feature
     */
    resolveModuleInstance(moduleFunc: () => Promise<any>, feature?: string, dependencyModuleRefs?: NgModuleRef<any>[]): Observable<NgModuleRef<any>>;
    /**
     * Returns dependency module instance and initializes it when needed.
     *
     * Module will be instantiated only once, at first request for a this specific module class
     */
    resolveDependencyModuleInstance(moduleFunc: () => Promise<any>): Observable<NgModuleRef<any>>;
    /**
     * The purpose of this function is to run MODULE_INITIALIZER logic that can be provided
     * by a lazy loaded module.  The module is recieved as a function parameter.
     * This function returns an Observable to the module reference passed as an argument.
     *
     * @param {NgModuleRef<any>} moduleRef
     *
     * @returns {Observable<NgModuleRef<any>>}
     */
    runModuleInitializersForModule(moduleRef: NgModuleRef<any>): Observable<NgModuleRef<any>>;
    /**
     * This function accepts an array of functions and runs them all. For each function that returns a promise,
     * the resulting promise is stored in an array of promises.  That array of promises is returned.
     * It is not required for the functions to return a Promise.  All functions are run.  The return values
     * that are not a Promise are simply not stored and returned.
     *
     * @param {(() => any)[]} initFunctions An array of functions too be run.
     *
     * @return {Promise<any>[]} An array of Promise returned by the functions, if any,
     */
    runModuleInitializerFunctions(initFunctions: (() => any)[]): Promise<any>[];
    /**
     * Determine if the argument is shaped like a Promise
     */
    private isObjectPromise;
    /**
     * Resolve any Angular module from an function that return module or moduleFactory
     */
    private resolveModuleFactory;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LazyModulesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LazyModulesService>;
}
