import {
  Compiler,
  Injectable,
  InjectFlags,
  Injector,
  NgModuleFactory,
  NgModuleRef,
  OnDestroy,
} from '@angular/core';
import {
  combineLatest,
  ConnectableObservable,
  from,
  Observable,
  of,
  queueScheduler,
  Subscription,
  throwError,
} from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  observeOn,
  publishReplay,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';
import { EventService } from '../event/event.service';
import { CombinedInjector } from '../util/combined-injector';
import { createFrom } from '../util/create-from';
import { ModuleInitializedEvent } from './events/module-initialized-event';
import { MODULE_INITIALIZER } from './tokens';

/**
 * Utility service for managing dynamic imports of Angular services
 */
@Injectable({
  providedIn: 'root',
})
export class LazyModulesService implements OnDestroy {
  /**
   * Expose lazy loaded module references
   */
  readonly modules$: Observable<NgModuleRef<any>> = this.events
    .get(ModuleInitializedEvent)
    .pipe(
      map((event) => event.moduleRef),
      publishReplay()
    );

  private readonly dependencyModules = new Map<any, NgModuleRef<any>>();
  private readonly eventSubscription: Subscription;

  constructor(
    protected compiler: Compiler,
    protected injector: Injector,
    protected events: EventService
  ) {
    this.eventSubscription = (
      this.modules$ as ConnectableObservable<NgModuleRef<any>>
    ).connect();
  }

  /**
   * Resolves module instance based dynamic import wrapped in an arrow function
   *
   * New module instance will be created with each call.
   *
   * @param moduleFunc
   * @param feature
   */
  public resolveModuleInstance(
    moduleFunc: () => Promise<any>,
    feature?: string,
    dependencyModuleRefs: NgModuleRef<any>[] = []
  ): Observable<NgModuleRef<any>> {
    let parentInjector: Injector;

    if (!dependencyModuleRefs.length) {
      parentInjector = this.injector;
    } else if (dependencyModuleRefs.length === 1) {
      parentInjector = dependencyModuleRefs[0].injector;
    } else {
      parentInjector = new CombinedInjector(
        this.injector,
        dependencyModuleRefs.map((moduleRef) => moduleRef.injector)
      );
    }

    return this.resolveModuleFactory(moduleFunc).pipe(
      map(([moduleFactory]) => moduleFactory.create(parentInjector)),
      concatMap((moduleRef) => this.runModuleInitializersForModule(moduleRef)),
      tap((moduleRef) =>
        this.events.dispatch(
          createFrom(ModuleInitializedEvent, {
            feature,
            moduleRef,
          })
        )
      )
    );
  }

  /**
   * Returns dependency module instance and initializes it when needed.
   *
   * Module will be instantiated only once, at first request for a this specific module class
   */
  public resolveDependencyModuleInstance(
    moduleFunc: () => Promise<any>
  ): Observable<NgModuleRef<any>> {
    // We grab moduleFactory symbol from module function and if there is no
    // such a module created yet, we create it and store it in a
    // dependencyModules map
    return this.resolveModuleFactory(moduleFunc).pipe(
      map(([moduleFactory, module]) => {
        if (!this.dependencyModules.has(module)) {
          const moduleRef = moduleFactory.create(this.injector);
          this.dependencyModules.set(module, moduleRef);
        }

        return this.dependencyModules.get(module);
      }),
      concatMap((moduleRef) => this.runModuleInitializersForModule(moduleRef)),
      tap((moduleRef) =>
        this.events.dispatch(
          createFrom(ModuleInitializedEvent, {
            moduleRef,
          })
        )
      )
    );
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
  public runModuleInitializersForModule(
    moduleRef: NgModuleRef<any>
  ): Observable<NgModuleRef<any>> {
    const moduleInits: any[] = moduleRef.injector.get<any[]>(
      MODULE_INITIALIZER,
      [],
      InjectFlags.Self
    );
    const asyncInitPromises: Promise<any>[] =
      this.runModuleInitializerFunctions(moduleInits);
    if (asyncInitPromises.length) {
      return from(Promise.all(asyncInitPromises)).pipe(
        catchError((error) => {
          console.error(
            'MODULE_INITIALIZER promise was rejected while lazy loading a module.',
            error
          );
          return throwError(error);
        }),
        switchMapTo(of(moduleRef))
      );
    } else {
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
  public runModuleInitializerFunctions(
    initFunctions: (() => any)[]
  ): Promise<any>[] {
    const initPromises: Promise<any>[] = [];
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
    } catch (error) {
      console.error(
        `MODULE_INITIALIZER init function throwed an error. `,
        error
      );
      throw error;
    }
  }

  /**
   * Determine if the argument is shaped like a Promise
   */
  private isObjectPromise<T = any>(obj: any): obj is Promise<T> {
    return !!obj && typeof obj.then === 'function';
  }

  /**
   * Resolve any Angular module from an function that return module or moduleFactory
   */
  private resolveModuleFactory(
    moduleFunc: () => Promise<any>
  ): Observable<[NgModuleFactory<any>, any]> {
    return from(moduleFunc()).pipe(
      switchMap((module) =>
        module instanceof NgModuleFactory
          ? (of([module, module]) as Observable<[NgModuleFactory<any>, any]>)
          : combineLatest([
              // using compiler here is for jit compatibility, there is no overhead
              // for aot production builds as it will be stubbed
              from(this.compiler.compileModuleAsync(module as any)),
              of(module),
            ])
      ),
      observeOn(queueScheduler)
    );
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }

    // clean up all initialized dependency modules
    this.dependencyModules.forEach((dependency) => dependency.destroy());
  }
}
