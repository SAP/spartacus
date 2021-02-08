import { TestBed } from '@angular/core/testing';

import { LazyModulesService } from './lazy-modules.service';
import { NgModule } from '@angular/core';
import {
  createFrom,
  EventService,
  ModuleInitializedEvent,
} from '@spartacus/core';
import { take, toArray } from 'rxjs/operators';
import { zip } from 'rxjs';

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
