import {
  Compiler,
  Injectable,
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
} from 'rxjs';
import { map, observeOn, publishReplay, switchMap, tap } from 'rxjs/operators';
import { createFrom } from '../util';
import { ModuleInitializedEvent } from './events/module-initialized-event';
import { EventService } from '../event/event.service';

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
    ) as ConnectableObservable<NgModuleRef<any>>;

  private readonly dependencyModules = new Map<any, NgModuleRef<any>>();
  private readonly eventSubscription: Subscription;

  constructor(
    protected compiler: Compiler,
    protected injector: Injector,
    protected events: EventService
  ) {
    this.eventSubscription = (this.modules$ as ConnectableObservable<
      NgModuleRef<any>
    >).connect();
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
    feature?: string
  ): Observable<NgModuleRef<any>> {
    return this.resolveModuleFactory(moduleFunc).pipe(
      map(([moduleFactory]) => moduleFactory.create(this.injector)),
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

          this.events.dispatch(
            createFrom(ModuleInitializedEvent, {
              moduleRef,
            })
          );
        }
        return this.dependencyModules.get(module);
      })
    );
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
