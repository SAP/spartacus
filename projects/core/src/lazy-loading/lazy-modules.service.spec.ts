import { NgModule, NgModuleRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  EventService,
  ModuleInitializedEvent,
} from '@spartacus/core';
import { Observable, zip } from 'rxjs';
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
    it('should resolve module instance ', (done) => {
      service
        .resolveModuleInstance(async () => MockLazyModule)
        .subscribe((moduleRef) => {
          expect(moduleRef.instance).toBeInstanceOf(MockLazyModule);
          done();
        });
    });

    it('should emit ModuleInitializedEvent', (done) => {
      const events = TestBed.inject(EventService);

      events
        .get(ModuleInitializedEvent)
        .pipe(take(1))
        .subscribe((event) => {
          expect(event.feature).toEqual('feature');
          done();
        });

      service
        .resolveModuleInstance(async () => MockLazyModule, 'feature')
        .subscribe();
    });

    it('should resolve two module instances for the same module ', (done) => {
      const moduleInstance$ = service.resolveModuleInstance(
        async () => MockLazyModule
      );

      zip(moduleInstance$, moduleInstance$).subscribe(([module1, module2]) => {
        expect(module1).not.toBe(module2);
        done();
      });
    });
  });

  describe('resolveDependencyModuleInstance', () => {
    it('should resolve module instance ', (done) => {
      service
        .resolveDependencyModuleInstance(async () => MockLazyModule)
        .subscribe((moduleRef) => {
          expect(moduleRef.instance).toBeInstanceOf(MockLazyModule);
          done();
        });
    });

    it('should emit ModuleInitializedEvent', (done) => {
      const events = TestBed.inject(EventService);

      events
        .get(ModuleInitializedEvent)
        .pipe(take(1))
        .subscribe((event) => {
          expect(event.moduleRef.instance).toBeInstanceOf(MockLazyModule);
          done();
        });

      service.resolveModuleInstance(async () => MockLazyModule).subscribe();
    });

    it('should resolve only one instance for the same module', (done) => {
      const moduleInstance$ = service.resolveDependencyModuleInstance(
        async () => MockLazyModule
      );

      zip(moduleInstance$, moduleInstance$).subscribe(([module1, module2]) => {
        expect(module1).toBe(module2);
        done();
      });
    });
  });

  describe('runModuleInitializersForModule', () => {
    it('should run init functions provided by dependency injection and return module ref.', (done) => {
      const initFuncion: () => {} = jasmine.createSpy('initFuncion');
      const mockInjector = jasmine.createSpyObj('mockInjector', ['get']);
      mockInjector.get.and.returnValue([initFuncion]);
      const mockModuleRef = {
        injector: mockInjector,
      } as NgModuleRef<any>;

      const result$: Observable<NgModuleRef<any>> =
        service.runModuleInitializersForModule(mockModuleRef);

      expect(initFuncion).toHaveBeenCalled();
      result$.subscribe((result) => {
        expect(result).toBe(mockModuleRef);
        done();
      });
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
      const f1: () => {} = jasmine.createSpy().and.returnValue('');
      const f2: () => {} = jasmine.createSpy().and.returnValue('');
      const f3: () => {} = jasmine.createSpy().and.returnValue(promiseResult);
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

    it('should store lazy loaded module instances ', (done) => {
      events.dispatch(event1);
      events.dispatch(event2);

      service.modules$.pipe(take(2), toArray()).subscribe((modules) => {
        expect(modules).toEqual([module1, module2]);
        done();
      });
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

    it('should replay previous emissions for late subscribers', (done) => {
      events.dispatch(event1);
      events.dispatch(event2);

      service.modules$.pipe(take(2), toArray()).subscribe((modules) => {
        expect(modules).toEqual([module1, module2]);
        done();
      });
    });
  });
});
