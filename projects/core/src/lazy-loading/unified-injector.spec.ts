import { TestBed } from '@angular/core/testing';

import { UnifiedInjector } from './unified-injector';
import { LazyModulesService } from '@spartacus/core';
import { of, ReplaySubject } from 'rxjs';
import { InjectionToken, Injector, NgModuleRef } from '@angular/core';
import { delay, take, tap, toArray } from 'rxjs/operators';

class MockLazyModulesService implements Partial<LazyModulesService> {
  modules$ = new ReplaySubject<NgModuleRef<any>>();
}

const TEST_TOKEN = new InjectionToken('test');
const TEST_MULTI_TOKEN = new InjectionToken('test_multi');

const emptyModuleInstance: any = {
  injector: Injector.create({
    providers: [],
  }),
};

const moduleInstanceWithTestToken: any = {
  injector: Injector.create({
    providers: [{ provide: TEST_TOKEN, useValue: 'lazy' }],
  }),
};

const moduleInstanceWithTestMultiToken: any = {
  injector: Injector.create({
    providers: [
      { provide: TEST_MULTI_TOKEN, useValue: 'lazy1', multi: true },
      { provide: TEST_MULTI_TOKEN, useValue: 'lazy2', multi: true },
    ],
  }),
};

describe('UnifiedInjector', () => {
  let service: UnifiedInjector;
  let lazyModules: MockLazyModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LazyModulesService,
          useClass: MockLazyModulesService,
        },
        {
          provide: TEST_TOKEN,
          useValue: 'root',
        },
        {
          provide: TEST_MULTI_TOKEN,
          useValue: 'root1',
          multi: true,
        },
        {
          provide: TEST_MULTI_TOKEN,
          useValue: 'root2',
          multi: true,
        },
      ],
    });
    service = TestBed.inject(UnifiedInjector);
    lazyModules = TestBed.inject<MockLazyModulesService>(
      LazyModulesService as any
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should emit instances from root injector', (done) => {
      service
        .get(TEST_TOKEN)
        .subscribe((instance) => {
          expect(instance).toEqual('root');
          done();
        })
        .unsubscribe();
    });

    it('should emit instances if they appear in lazy loaded modules', () => {
      const instances = [];
      service
        .get(TEST_TOKEN)
        .pipe(take(3))
        .subscribe((instance) => {
          instances.push(instance);
        });
      expect(instances.length).toBe(1);

      lazyModules.modules$.next(moduleInstanceWithTestToken);
      expect(instances.length).toBe(2);

      lazyModules.modules$.next(emptyModuleInstance);
      expect(instances.length).toBe(2);

      lazyModules.modules$.next(moduleInstanceWithTestToken);
      expect(instances.length).toBe(3);

      expect(instances).toEqual(['root', 'lazy', 'lazy']);
    });

    it('should emit default values if instance is missing in lazy loaded module', () => {
      const instances = [];
      service
        .get(TEST_TOKEN, 'default')
        .pipe(take(3))
        .subscribe((instance) => {
          instances.push(instance);
        });
      expect(instances.length).toBe(1);

      lazyModules.modules$.next(moduleInstanceWithTestToken);
      expect(instances.length).toBe(2);

      lazyModules.modules$.next(emptyModuleInstance);
      expect(instances.length).toBe(3);

      expect(instances).toEqual(['root', 'lazy', 'default']);
    });
  });

  describe('getMulti', () => {
    it('should emit instances from root injector', (done) => {
      service
        .getMulti(TEST_MULTI_TOKEN)
        .pipe(take(1))
        .subscribe((instances) => {
          expect(instances).toEqual(['root1', 'root2']);
          done();
        });
    });

    it('should return multi instances from root and lazy modules', (done) => {
      lazyModules.modules$.next(moduleInstanceWithTestMultiToken);

      service
        .getMulti(TEST_MULTI_TOKEN)
        .pipe(take(2), toArray())
        .subscribe((instances) => {
          console.log(instances);
          expect(instances).toEqual([
            ['root1', 'root2'],
            ['root1', 'root2', 'lazy1', 'lazy2'],
          ]);
          done();
        });
    });

    it('should re-emit new values if new instances are provided with new lazy module', (done) => {
      const testLogic$ = of(null).pipe(
        delay(0), // postpone next step to next macro task to trigger asap emissions
        tap(() => {
          lazyModules.modules$.next(moduleInstanceWithTestMultiToken);
        }),
        delay(0), // postpone next step to next macro task to trigger asap emissions
        tap(() => {
          lazyModules.modules$.next(moduleInstanceWithTestMultiToken);
        })
      );

      service
        .getMulti(TEST_MULTI_TOKEN)
        .pipe(take(3), toArray())
        .subscribe((result) => {
          expect(result).toEqual([
            ['root1', 'root2'],
            ['root1', 'root2', 'lazy1', 'lazy2'],
            ['root1', 'root2', 'lazy1', 'lazy2', 'lazy1', 'lazy2'],
          ]);
          done();
        });

      testLogic$.subscribe();
    });

    it('should not re-emit new values if no new instances exists in new lazy module', (done) => {
      const testLogic$ = of(null).pipe(
        delay(0), // postpone next step to next macro task to trigger asap emissions
        tap(() => {
          lazyModules.modules$.next(emptyModuleInstance);
        }),
        delay(0), // postpone next step to next macro task to trigger asap emissions
        tap(() => {
          lazyModules.modules$.next(moduleInstanceWithTestMultiToken);
        })
      );

      service
        .getMulti(TEST_MULTI_TOKEN)
        .pipe(take(2), toArray())
        .subscribe((result) => {
          expect(result).toEqual([
            ['root1', 'root2'],
            ['root1', 'root2', 'lazy1', 'lazy2'],
          ]);
          done();
        });

      testLogic$.subscribe();
    });
  });
});
