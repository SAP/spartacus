import { vi } from 'vitest';
import { NgModule, NgModuleRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  EventService,
  ModuleInitializedEvent,
} from '@spartacus/core';
import { firstValueFrom, lastValueFrom, Observable, zip } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { LazyModulesService } from './lazy-modules.service';

@NgModule({})
class MockLazyModule {}

describe('LazyModulesService', () => {
  let service: LazyModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('resolveModuleInstance', () => {
    it('should resolve module instance ', async () => {
      const moduleRef = await firstValueFrom(
        service.resolveModuleInstance(async () => MockLazyModule)
      );
      expect(moduleRef.instance).toBeInstanceOf(MockLazyModule);
    });

    it('should emit ModuleInitializedEvent', async () => {
      const events = TestBed.inject(EventService);

      const eventPromise = firstValueFrom(
        events.get(ModuleInitializedEvent).pipe(take(1))
      );

      service
        .resolveModuleInstance(async () => MockLazyModule, 'feature')
        .subscribe();

      const event = await eventPromise;
      expect(event.feature).toEqual('feature');
    });

    it('should resolve two module instances for the same module ', async () => {
      const moduleInstance$ = service.resolveModuleInstance(
        async () => MockLazyModule
      );

      const [module1, module2] = await firstValueFrom(
        zip(moduleInstance$, moduleInstance$)
      );
      expect(module1).not.toBe(module2);
    });
  });

  describe('resolveDependencyModuleInstance', () => {
    it('should resolve module instance ', async () => {
      const moduleRef = await firstValueFrom(
        service.resolveDependencyModuleInstance(async () => MockLazyModule)
      );
      expect(moduleRef.instance).toBeInstanceOf(MockLazyModule);
    });

    it('should emit ModuleInitializedEvent', async () => {
      const events = TestBed.inject(EventService);

      const eventPromise = firstValueFrom(
        events.get(ModuleInitializedEvent).pipe(take(1))
      );

      service.resolveModuleInstance(async () => MockLazyModule).subscribe();

      const event = await eventPromise;
      expect(event.moduleRef.instance).toBeInstanceOf(MockLazyModule);
    });

    it('should resolve only one instance for the same module', async () => {
      const moduleInstance$ = service.resolveDependencyModuleInstance(
        async () => MockLazyModule
      );

      const [module1, module2] = await firstValueFrom(
        zip(moduleInstance$, moduleInstance$)
      );
      expect(module1).toBe(module2);
    });
  });

  describe('runModuleInitializersForModule', () => {
    it('should run init functions provided by dependency injection and return module ref.', async () => {
      const initFuncion: () => {} = vi.fn();
      const mockInjector = { get: vi.fn() };
      mockInjector.get.mockReturnValue([initFuncion]);
      const mockModuleRef = {
        injector: mockInjector,
      } as NgModuleRef<any>;

      const result$: Observable<NgModuleRef<any>> =
        service.runModuleInitializersForModule(mockModuleRef);

      expect(initFuncion).toHaveBeenCalled();
      const result = await firstValueFrom(result$);
      expect(result).toBe(mockModuleRef);
    });
  });

  describe('runModuleInitializerFunctions', () => {
    it('should deal gracefully with falsy values and empty array', () => {
      expect(service.runModuleInitializerFunctions(undefined)).toEqual([]);
      expect(service.runModuleInitializerFunctions(null)).toEqual([]);
      expect(service.runModuleInitializerFunctions([])).toEqual([]);
    });
    it('should execute all the functions passed as an argument and return promises.', () => {
      const promiseResult = new Promise((resolve) => {
        resolve(123);
      });
      const f1: () => {} = vi.fn().mockReturnValue('');
      const f2: () => {} = vi.fn().mockReturnValue('');
      const f3: () => {} = vi.fn().mockReturnValue(promiseResult);
      const result = service.runModuleInitializerFunctions([f1, f2, f3]);
      expect(result.length).toEqual(1);
      expect(f1).toHaveBeenCalled();
      expect(f2).toHaveBeenCalled();
      expect(f3).toHaveBeenCalled();
    });
  });

  describe('modules$', () => {
    const module1: any = {};
    const module2: any = {};
    const event1 = createFrom(ModuleInitializedEvent, { moduleRef: module1 });
    const event2 = createFrom(ModuleInitializedEvent, { moduleRef: module2 });
    let events: EventService;

    beforeEach(() => {
      events = TestBed.inject(EventService);
    });

    it('should store lazy loaded module instances ', async () => {
      events.dispatch(event1);
      events.dispatch(event2);

      const modules = await firstValueFrom(
        service.modules$.pipe(take(2), toArray())
      );
      expect(modules).toEqual([module1, module2]);
    });

    it('should emit when new module is initialized', () => {
      const modules = [];

      service.modules$.pipe(take(2)).subscribe((module) => {
        modules.push(module);
      });
      events.dispatch(event1);
      expect(modules.length).toBe(1);
      events.dispatch(event2);
      expect(modules.length).toBe(2);
    });

    it('should replay previous emissions for late subscribers', async () => {
      events.dispatch(event1);
      events.dispatch(event2);

      const modules = await lastValueFrom(
        service.modules$.pipe(take(2), toArray())
      );
      expect(modules).toEqual([module1, module2]);
    });
  });
});
