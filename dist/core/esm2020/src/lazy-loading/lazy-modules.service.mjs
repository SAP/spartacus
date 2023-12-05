/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, NgModuleFactory, inject, } from '@angular/core';
import { combineLatest, from, of, queueScheduler, throwError, } from 'rxjs';
import { catchError, concatMap, map, observeOn, publishReplay, switchMap, tap, } from 'rxjs/operators';
import { LoggerService } from '../logger';
import { CombinedInjector } from '../util/combined-injector';
import { createFrom } from '../util/create-from';
import { ModuleInitializedEvent } from './events/module-initialized-event';
import { MODULE_INITIALIZER } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "../event/event.service";
/**
 * Utility service for managing dynamic imports of Angular services
 */
export class LazyModulesService {
    constructor(compiler, injector, events) {
        this.compiler = compiler;
        this.injector = injector;
        this.events = events;
        this.logger = inject(LoggerService);
        /**
         * Expose lazy loaded module references
         */
        this.modules$ = this.events
            .get(ModuleInitializedEvent)
            .pipe(map((event) => event.moduleRef), publishReplay());
        this.dependencyModules = new Map();
        this.eventSubscription = this.modules$.connect();
    }
    /**
     * Resolves module instance based dynamic import wrapped in an arrow function
     *
     * New module instance will be created with each call.
     *
     * @param moduleFunc
     * @param feature
     */
    resolveModuleInstance(moduleFunc, feature, dependencyModuleRefs = []) {
        let parentInjector;
        if (!dependencyModuleRefs.length) {
            parentInjector = this.injector;
        }
        else if (dependencyModuleRefs.length === 1) {
            parentInjector = dependencyModuleRefs[0].injector;
        }
        else {
            parentInjector = new CombinedInjector(this.injector, dependencyModuleRefs.map((moduleRef) => moduleRef.injector));
        }
        return this.resolveModuleFactory(moduleFunc).pipe(map(([moduleFactory]) => moduleFactory.create(parentInjector)), concatMap((moduleRef) => this.runModuleInitializersForModule(moduleRef)), tap((moduleRef) => this.events.dispatch(createFrom(ModuleInitializedEvent, {
            feature,
            moduleRef,
        }))));
    }
    /**
     * Returns dependency module instance and initializes it when needed.
     *
     * Module will be instantiated only once, at first request for a this specific module class
     */
    resolveDependencyModuleInstance(moduleFunc) {
        // We grab moduleFactory symbol from module function and if there is no
        // such a module created yet, we create it and store it in a
        // dependencyModules map
        return this.resolveModuleFactory(moduleFunc).pipe(map(([moduleFactory, module]) => {
            if (!this.dependencyModules.has(module)) {
                const moduleRef = moduleFactory.create(this.injector);
                this.dependencyModules.set(module, moduleRef);
            }
            return this.dependencyModules.get(module);
        }), concatMap((moduleRef) => this.runModuleInitializersForModule(moduleRef)), tap((moduleRef) => this.events.dispatch(createFrom(ModuleInitializedEvent, {
            moduleRef,
        }))));
    }
    /**
     * The purpose of this function is to run MODULE_INITIALIZER logic that can be provided
     * by a lazy loaded module.  The module is recieved as a function parameter.
     * This function returns an Observable to the module reference passed as an argument.
     *
     * @param {NgModuleRef<any>} moduleRef
     *
     * @returns {Observable<NgModuleRef<any>>}
     */
    runModuleInitializersForModule(moduleRef) {
        const moduleInits = moduleRef.injector.get(MODULE_INITIALIZER, [], { self: true });
        const asyncInitPromises = this.runModuleInitializerFunctions(moduleInits);
        if (asyncInitPromises.length) {
            return from(Promise.all(asyncInitPromises)).pipe(catchError((error) => {
                this.logger.error('MODULE_INITIALIZER promise was rejected while lazy loading a module.', error);
                return throwError(error);
            }), switchMap(() => of(moduleRef)));
        }
        else {
            return of(moduleRef);
        }
    }
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
    runModuleInitializerFunctions(initFunctions) {
        const initPromises = [];
        try {
            if (initFunctions) {
                for (let i = 0; i < initFunctions.length; i++) {
                    const initResult = initFunctions[i]();
                    if (this.isObjectPromise(initResult)) {
                        initPromises.push(initResult);
                    }
                }
            }
            return initPromises;
        }
        catch (error) {
            this.logger.error(`MODULE_INITIALIZER init function throwed an error. `, error);
            throw error;
        }
    }
    /**
     * Determine if the argument is shaped like a Promise
     */
    isObjectPromise(obj) {
        return !!obj && typeof obj.then === 'function';
    }
    /**
     * Resolve any Angular module from an function that return module or moduleFactory
     */
    resolveModuleFactory(moduleFunc) {
        return from(moduleFunc()).pipe(switchMap((module) => module instanceof NgModuleFactory
            ? of([module, module])
            : combineLatest([
                // using compiler here is for jit compatibility, there is no overhead
                // for aot production builds as it will be stubbed
                from(this.compiler.compileModuleAsync(module)),
                of(module),
            ])), observeOn(queueScheduler));
    }
    ngOnDestroy() {
        if (this.eventSubscription) {
            this.eventSubscription.unsubscribe();
        }
        // clean up all initialized dependency modules
        this.dependencyModules.forEach((dependency) => dependency.destroy());
    }
}
LazyModulesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LazyModulesService, deps: [{ token: i0.Compiler }, { token: i0.Injector }, { token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
LazyModulesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LazyModulesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LazyModulesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.Compiler }, { type: i0.Injector }, { type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1tb2R1bGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9sYXp5LWxvYWRpbmcvbGF6eS1tb2R1bGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCxVQUFVLEVBRVYsZUFBZSxFQUdmLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBSUwsYUFBYSxFQUNiLElBQUksRUFDSixFQUFFLEVBQ0YsY0FBYyxFQUNkLFVBQVUsR0FDWCxNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULEdBQUcsRUFDSCxTQUFTLEVBQ1QsYUFBYSxFQUNiLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQUU5Qzs7R0FFRztBQUlILE1BQU0sT0FBTyxrQkFBa0I7SUFnQjdCLFlBQ1ksUUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsTUFBb0I7UUFGcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWM7UUFsQnRCLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFekM7O1dBRUc7UUFDTSxhQUFRLEdBQWlDLElBQUksQ0FBQyxNQUFNO2FBQzFELEdBQUcsQ0FBQyxz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dCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21waWxlcixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIE5nTW9kdWxlRmFjdG9yeSxcbiAgTmdNb2R1bGVSZWYsXG4gIE9uRGVzdHJveSxcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSxcbiAgT2JzZXJ2YWJsZSxcbiAgU3Vic2NyaXB0aW9uLFxuICBjb21iaW5lTGF0ZXN0LFxuICBmcm9tLFxuICBvZixcbiAgcXVldWVTY2hlZHVsZXIsXG4gIHRocm93RXJyb3IsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY2F0Y2hFcnJvcixcbiAgY29uY2F0TWFwLFxuICBtYXAsXG4gIG9ic2VydmVPbixcbiAgcHVibGlzaFJlcGxheSxcbiAgc3dpdGNoTWFwLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEV2ZW50U2VydmljZSB9IGZyb20gJy4uL2V2ZW50L2V2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBDb21iaW5lZEluamVjdG9yIH0gZnJvbSAnLi4vdXRpbC9jb21iaW5lZC1pbmplY3Rvcic7XG5pbXBvcnQgeyBjcmVhdGVGcm9tIH0gZnJvbSAnLi4vdXRpbC9jcmVhdGUtZnJvbSc7XG5pbXBvcnQgeyBNb2R1bGVJbml0aWFsaXplZEV2ZW50IH0gZnJvbSAnLi9ldmVudHMvbW9kdWxlLWluaXRpYWxpemVkLWV2ZW50JztcbmltcG9ydCB7IE1PRFVMRV9JTklUSUFMSVpFUiB9IGZyb20gJy4vdG9rZW5zJztcblxuLyoqXG4gKiBVdGlsaXR5IHNlcnZpY2UgZm9yIG1hbmFnaW5nIGR5bmFtaWMgaW1wb3J0cyBvZiBBbmd1bGFyIHNlcnZpY2VzXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXp5TW9kdWxlc1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgbGF6eSBsb2FkZWQgbW9kdWxlIHJlZmVyZW5jZXNcbiAgICovXG4gIHJlYWRvbmx5IG1vZHVsZXMkOiBPYnNlcnZhYmxlPE5nTW9kdWxlUmVmPGFueT4+ID0gdGhpcy5ldmVudHNcbiAgICAuZ2V0KE1vZHVsZUluaXRpYWxpemVkRXZlbnQpXG4gICAgLnBpcGUoXG4gICAgICBtYXAoKGV2ZW50KSA9PiBldmVudC5tb2R1bGVSZWYpLFxuICAgICAgcHVibGlzaFJlcGxheSgpXG4gICAgKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRlcGVuZGVuY3lNb2R1bGVzID0gbmV3IE1hcDxhbnksIE5nTW9kdWxlUmVmPGFueT4+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29tcGlsZXI6IENvbXBpbGVyLFxuICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJvdGVjdGVkIGV2ZW50czogRXZlbnRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb24gPSAoXG4gICAgICB0aGlzLm1vZHVsZXMkIGFzIENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxOZ01vZHVsZVJlZjxhbnk+PlxuICAgICkuY29ubmVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIG1vZHVsZSBpbnN0YW5jZSBiYXNlZCBkeW5hbWljIGltcG9ydCB3cmFwcGVkIGluIGFuIGFycm93IGZ1bmN0aW9uXG4gICAqXG4gICAqIE5ldyBtb2R1bGUgaW5zdGFuY2Ugd2lsbCBiZSBjcmVhdGVkIHdpdGggZWFjaCBjYWxsLlxuICAgKlxuICAgKiBAcGFyYW0gbW9kdWxlRnVuY1xuICAgKiBAcGFyYW0gZmVhdHVyZVxuICAgKi9cbiAgcHVibGljIHJlc29sdmVNb2R1bGVJbnN0YW5jZShcbiAgICBtb2R1bGVGdW5jOiAoKSA9PiBQcm9taXNlPGFueT4sXG4gICAgZmVhdHVyZT86IHN0cmluZyxcbiAgICBkZXBlbmRlbmN5TW9kdWxlUmVmczogTmdNb2R1bGVSZWY8YW55PltdID0gW11cbiAgKTogT2JzZXJ2YWJsZTxOZ01vZHVsZVJlZjxhbnk+PiB7XG4gICAgbGV0IHBhcmVudEluamVjdG9yOiBJbmplY3RvcjtcblxuICAgIGlmICghZGVwZW5kZW5jeU1vZHVsZVJlZnMubGVuZ3RoKSB7XG4gICAgICBwYXJlbnRJbmplY3RvciA9IHRoaXMuaW5qZWN0b3I7XG4gICAgfSBlbHNlIGlmIChkZXBlbmRlbmN5TW9kdWxlUmVmcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHBhcmVudEluamVjdG9yID0gZGVwZW5kZW5jeU1vZHVsZVJlZnNbMF0uaW5qZWN0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudEluamVjdG9yID0gbmV3IENvbWJpbmVkSW5qZWN0b3IoXG4gICAgICAgIHRoaXMuaW5qZWN0b3IsXG4gICAgICAgIGRlcGVuZGVuY3lNb2R1bGVSZWZzLm1hcCgobW9kdWxlUmVmKSA9PiBtb2R1bGVSZWYuaW5qZWN0b3IpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc29sdmVNb2R1bGVGYWN0b3J5KG1vZHVsZUZ1bmMpLnBpcGUoXG4gICAgICBtYXAoKFttb2R1bGVGYWN0b3J5XSkgPT4gbW9kdWxlRmFjdG9yeS5jcmVhdGUocGFyZW50SW5qZWN0b3IpKSxcbiAgICAgIGNvbmNhdE1hcCgobW9kdWxlUmVmKSA9PiB0aGlzLnJ1bk1vZHVsZUluaXRpYWxpemVyc0Zvck1vZHVsZShtb2R1bGVSZWYpKSxcbiAgICAgIHRhcCgobW9kdWxlUmVmKSA9PlxuICAgICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaChcbiAgICAgICAgICBjcmVhdGVGcm9tKE1vZHVsZUluaXRpYWxpemVkRXZlbnQsIHtcbiAgICAgICAgICAgIGZlYXR1cmUsXG4gICAgICAgICAgICBtb2R1bGVSZWYsXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBkZXBlbmRlbmN5IG1vZHVsZSBpbnN0YW5jZSBhbmQgaW5pdGlhbGl6ZXMgaXQgd2hlbiBuZWVkZWQuXG4gICAqXG4gICAqIE1vZHVsZSB3aWxsIGJlIGluc3RhbnRpYXRlZCBvbmx5IG9uY2UsIGF0IGZpcnN0IHJlcXVlc3QgZm9yIGEgdGhpcyBzcGVjaWZpYyBtb2R1bGUgY2xhc3NcbiAgICovXG4gIHB1YmxpYyByZXNvbHZlRGVwZW5kZW5jeU1vZHVsZUluc3RhbmNlKFxuICAgIG1vZHVsZUZ1bmM6ICgpID0+IFByb21pc2U8YW55PlxuICApOiBPYnNlcnZhYmxlPE5nTW9kdWxlUmVmPGFueT4+IHtcbiAgICAvLyBXZSBncmFiIG1vZHVsZUZhY3Rvcnkgc3ltYm9sIGZyb20gbW9kdWxlIGZ1bmN0aW9uIGFuZCBpZiB0aGVyZSBpcyBub1xuICAgIC8vIHN1Y2ggYSBtb2R1bGUgY3JlYXRlZCB5ZXQsIHdlIGNyZWF0ZSBpdCBhbmQgc3RvcmUgaXQgaW4gYVxuICAgIC8vIGRlcGVuZGVuY3lNb2R1bGVzIG1hcFxuICAgIHJldHVybiB0aGlzLnJlc29sdmVNb2R1bGVGYWN0b3J5KG1vZHVsZUZ1bmMpLnBpcGUoXG4gICAgICBtYXAoKFttb2R1bGVGYWN0b3J5LCBtb2R1bGVdKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5kZXBlbmRlbmN5TW9kdWxlcy5oYXMobW9kdWxlKSkge1xuICAgICAgICAgIGNvbnN0IG1vZHVsZVJlZiA9IG1vZHVsZUZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgICAgICAgIHRoaXMuZGVwZW5kZW5jeU1vZHVsZXMuc2V0KG1vZHVsZSwgbW9kdWxlUmVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRlcGVuZGVuY3lNb2R1bGVzLmdldChtb2R1bGUpIGFzIE5nTW9kdWxlUmVmPGFueT47XG4gICAgICB9KSxcbiAgICAgIGNvbmNhdE1hcCgobW9kdWxlUmVmKSA9PiB0aGlzLnJ1bk1vZHVsZUluaXRpYWxpemVyc0Zvck1vZHVsZShtb2R1bGVSZWYpKSxcbiAgICAgIHRhcCgobW9kdWxlUmVmKSA9PlxuICAgICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaChcbiAgICAgICAgICBjcmVhdGVGcm9tKE1vZHVsZUluaXRpYWxpemVkRXZlbnQsIHtcbiAgICAgICAgICAgIG1vZHVsZVJlZixcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIHJ1biBNT0RVTEVfSU5JVElBTElaRVIgbG9naWMgdGhhdCBjYW4gYmUgcHJvdmlkZWRcbiAgICogYnkgYSBsYXp5IGxvYWRlZCBtb2R1bGUuICBUaGUgbW9kdWxlIGlzIHJlY2lldmVkIGFzIGEgZnVuY3Rpb24gcGFyYW1ldGVyLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0byB0aGUgbW9kdWxlIHJlZmVyZW5jZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7TmdNb2R1bGVSZWY8YW55Pn0gbW9kdWxlUmVmXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPE5nTW9kdWxlUmVmPGFueT4+fVxuICAgKi9cbiAgcHVibGljIHJ1bk1vZHVsZUluaXRpYWxpemVyc0Zvck1vZHVsZShcbiAgICBtb2R1bGVSZWY6IE5nTW9kdWxlUmVmPGFueT5cbiAgKTogT2JzZXJ2YWJsZTxOZ01vZHVsZVJlZjxhbnk+PiB7XG4gICAgY29uc3QgbW9kdWxlSW5pdHM6IGFueVtdID0gbW9kdWxlUmVmLmluamVjdG9yLmdldDxhbnlbXT4oXG4gICAgICBNT0RVTEVfSU5JVElBTElaRVIsXG4gICAgICBbXSxcbiAgICAgIHsgc2VsZjogdHJ1ZSB9XG4gICAgKTtcbiAgICBjb25zdCBhc3luY0luaXRQcm9taXNlczogUHJvbWlzZTxhbnk+W10gPVxuICAgICAgdGhpcy5ydW5Nb2R1bGVJbml0aWFsaXplckZ1bmN0aW9ucyhtb2R1bGVJbml0cyk7XG4gICAgaWYgKGFzeW5jSW5pdFByb21pc2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5hbGwoYXN5bmNJbml0UHJvbWlzZXMpKS5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgJ01PRFVMRV9JTklUSUFMSVpFUiBwcm9taXNlIHdhcyByZWplY3RlZCB3aGlsZSBsYXp5IGxvYWRpbmcgYSBtb2R1bGUuJyxcbiAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gb2YobW9kdWxlUmVmKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZihtb2R1bGVSZWYpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW4gYXJyYXkgb2YgZnVuY3Rpb25zIGFuZCBydW5zIHRoZW0gYWxsLiBGb3IgZWFjaCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlLFxuICAgKiB0aGUgcmVzdWx0aW5nIHByb21pc2UgaXMgc3RvcmVkIGluIGFuIGFycmF5IG9mIHByb21pc2VzLiAgVGhhdCBhcnJheSBvZiBwcm9taXNlcyBpcyByZXR1cm5lZC5cbiAgICogSXQgaXMgbm90IHJlcXVpcmVkIGZvciB0aGUgZnVuY3Rpb25zIHRvIHJldHVybiBhIFByb21pc2UuICBBbGwgZnVuY3Rpb25zIGFyZSBydW4uICBUaGUgcmV0dXJuIHZhbHVlc1xuICAgKiB0aGF0IGFyZSBub3QgYSBQcm9taXNlIGFyZSBzaW1wbHkgbm90IHN0b3JlZCBhbmQgcmV0dXJuZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7KCgpID0+IGFueSlbXX0gaW5pdEZ1bmN0aW9ucyBBbiBhcnJheSBvZiBmdW5jdGlvbnMgdG9vIGJlIHJ1bi5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+W119IEFuIGFycmF5IG9mIFByb21pc2UgcmV0dXJuZWQgYnkgdGhlIGZ1bmN0aW9ucywgaWYgYW55LFxuICAgKi9cbiAgcHVibGljIHJ1bk1vZHVsZUluaXRpYWxpemVyRnVuY3Rpb25zKFxuICAgIGluaXRGdW5jdGlvbnM6ICgoKSA9PiBhbnkpW11cbiAgKTogUHJvbWlzZTxhbnk+W10ge1xuICAgIGNvbnN0IGluaXRQcm9taXNlczogUHJvbWlzZTxhbnk+W10gPSBbXTtcbiAgICB0cnkge1xuICAgICAgaWYgKGluaXRGdW5jdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0RnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgaW5pdFJlc3VsdCA9IGluaXRGdW5jdGlvbnNbaV0oKTtcbiAgICAgICAgICBpZiAodGhpcy5pc09iamVjdFByb21pc2UoaW5pdFJlc3VsdCkpIHtcbiAgICAgICAgICAgIGluaXRQcm9taXNlcy5wdXNoKGluaXRSZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGluaXRQcm9taXNlcztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgIGBNT0RVTEVfSU5JVElBTElaRVIgaW5pdCBmdW5jdGlvbiB0aHJvd2VkIGFuIGVycm9yLiBgLFxuICAgICAgICBlcnJvclxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgaWYgdGhlIGFyZ3VtZW50IGlzIHNoYXBlZCBsaWtlIGEgUHJvbWlzZVxuICAgKi9cbiAgcHJpdmF0ZSBpc09iamVjdFByb21pc2U8VCA9IGFueT4ob2JqOiBhbnkpOiBvYmogaXMgUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuICEhb2JqICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlIGFueSBBbmd1bGFyIG1vZHVsZSBmcm9tIGFuIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIG1vZHVsZSBvciBtb2R1bGVGYWN0b3J5XG4gICAqL1xuICBwcml2YXRlIHJlc29sdmVNb2R1bGVGYWN0b3J5KFxuICAgIG1vZHVsZUZ1bmM6ICgpID0+IFByb21pc2U8YW55PlxuICApOiBPYnNlcnZhYmxlPFtOZ01vZHVsZUZhY3Rvcnk8YW55PiwgYW55XT4ge1xuICAgIHJldHVybiBmcm9tKG1vZHVsZUZ1bmMoKSkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgobW9kdWxlKSA9PlxuICAgICAgICBtb2R1bGUgaW5zdGFuY2VvZiBOZ01vZHVsZUZhY3RvcnlcbiAgICAgICAgICA/IChvZihbbW9kdWxlLCBtb2R1bGVdKSBhcyBPYnNlcnZhYmxlPFtOZ01vZHVsZUZhY3Rvcnk8YW55PiwgYW55XT4pXG4gICAgICAgICAgOiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICAgICAgICAgLy8gdXNpbmcgY29tcGlsZXIgaGVyZSBpcyBmb3Igaml0IGNvbXBhdGliaWxpdHksIHRoZXJlIGlzIG5vIG92ZXJoZWFkXG4gICAgICAgICAgICAgIC8vIGZvciBhb3QgcHJvZHVjdGlvbiBidWlsZHMgYXMgaXQgd2lsbCBiZSBzdHViYmVkXG4gICAgICAgICAgICAgIGZyb20odGhpcy5jb21waWxlci5jb21waWxlTW9kdWxlQXN5bmMobW9kdWxlIGFzIGFueSkpLFxuICAgICAgICAgICAgICBvZihtb2R1bGUpLFxuICAgICAgICAgICAgXSlcbiAgICAgICksXG4gICAgICBvYnNlcnZlT24ocXVldWVTY2hlZHVsZXIpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV2ZW50U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLy8gY2xlYW4gdXAgYWxsIGluaXRpYWxpemVkIGRlcGVuZGVuY3kgbW9kdWxlc1xuICAgIHRoaXMuZGVwZW5kZW5jeU1vZHVsZXMuZm9yRWFjaCgoZGVwZW5kZW5jeSkgPT4gZGVwZW5kZW5jeS5kZXN0cm95KCkpO1xuICB9XG59XG4iXX0=