import {
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FacadeFactoryService } from './facade-factory.service';
import {
  BehaviorSubject,
  isObservable,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { Injectable, NgModule } from '@angular/core';
import { EventService } from '../../event/event.service';
import { getLastValueSync } from '../../util/rxjs/get-last-value-sync';
import { ModuleInitializedEvent } from '../events/module-initialized-event';
import { CmsConfig } from '../../cms/config/cms-config';
import { take } from 'rxjs/operators';
import { facadeFactory } from './facade-factory';
import { FacadeDescriptor } from './facade-descriptor';

@Injectable({
  providedIn: 'root',
  useFactory: testFacadeFactory,
})
abstract class TestFacade {
  abstract testProperty: Observable<number>;
  abstract testProperty2: Observable<string>;
  abstract testMethod(par1: string, par2: number): Observable<string>;
  abstract testMethod2(par1: string): void;
}

const TEST_FEATURE_NAME = 'testFeature';

const testFacadeDescriptor: FacadeDescriptor<TestFacade> = {
  facade: TestFacade,
  feature: TEST_FEATURE_NAME,
  methods: ['testMethod', 'testMethod2'],
  properties: ['testProperty', 'testProperty2'],
};

function testFacadeFactory() {
  return facadeFactory(testFacadeDescriptor);
}

class TestFacadeService implements TestFacade {
  testProperty = of(333);
  testProperty2 = new BehaviorSubject('');

  constructor() {
    setTimeout(() => {
      this.testProperty2.next('async initialized');
    }, 0);
  }

  testMethod(par1: string, par2: number): Observable<string> {
    return of(par1 + par2);
  }
  testMethod2(par1: string): void {
    this.testProperty2.next(par1);
  }
}

@NgModule({
  providers: [
    {
      provide: TestFacade,
      useClass: TestFacadeService,
    },
  ],
})
class TestModuleImplementation {}

const MockCmsConfig: CmsConfig = {
  featureModules: {
    [TEST_FEATURE_NAME]: {
      module: async () => TestModuleImplementation,
    },
  },
};

describe('FacadeFactoryService', () => {
  let service: FacadeFactoryService;
  let moduleInitializedEvent: ModuleInitializedEvent;
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsConfig,
          useValue: MockCmsConfig,
        },
      ],
    });
    service = TestBed.inject(FacadeFactoryService);
    moduleInitializedEvent = undefined;
    subscription = TestBed.inject(EventService)
      .get(ModuleInitializedEvent)
      .subscribe((event) => (moduleInitializedEvent = event));
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should return object with methods and properties', () => {
      const facade = service.create(testFacadeDescriptor);
      expect(facade.testMethod).toBeTruthy();
      expect(facade.testMethod2).toBeTruthy();
      expect(facade.testProperty).toBeTruthy();
    });

    it('should not trigger lazy loading', fakeAsync(() => {
      service.create(testFacadeDescriptor);
      flushMicrotasks();
      expect(moduleInitializedEvent).toBeUndefined();
    }));

    describe('async option', () => {
      it('should not delay initialization if set to false', async () => {
        const facade = service.create(testFacadeDescriptor);
        const result = await facade.testProperty2.pipe(take(1)).toPromise();
        expect(result).toEqual('');
      });
      it('should delay initialization if set to true', async () => {
        const facade = service.create({ ...testFacadeDescriptor, async: true });
        const result = await facade.testProperty2.pipe(take(1)).toPromise();
        expect(result).toEqual('async initialized');
      });
    });
  });

  describe('proxy facade', () => {
    let facade: TestFacade;

    beforeEach(() => {
      facade = TestBed.inject(TestFacade);
    });

    it('should be created', () => {
      expect(facade).toBeTruthy();
    });

    describe('method call', () => {
      it('should trigger lazy loading', fakeAsync(() => {
        const a = facade.testMethod('a', 1);
        expect(a).toBeTruthy();
        expect(isObservable(a)).toBeTruthy();
        flushMicrotasks();
        expect(moduleInitializedEvent).toBeDefined();
        tick(); // to finish running timers in the test implementation
      }));
      it('should proxy return observable from the method', async () => {
        const result = await facade.testMethod('a', 1).toPromise();
        expect(result).toEqual('a1');
      });
      it('should call the method logic without subscribing', fakeAsync(() => {
        facade.testMethod2('test1');
        flushMicrotasks();
        expect(getLastValueSync(facade.testProperty2)).toEqual('test1');
        tick(); // to finish running timers in the test implementation
      }));
    });

    describe('property get', () => {
      it('should not trigger lazy loading without subscribing', fakeAsync(() => {
        const a = facade.testProperty;
        expect(a).toBeTruthy();
        expect(isObservable(a)).toBeTruthy();
        flushMicrotasks();
        expect(moduleInitializedEvent).toBeUndefined();
      }));
      it('should  trigger lazy load on subscribe', async () => {
        await facade.testProperty.toPromise();
        expect(moduleInitializedEvent).toBeDefined();
        expect(moduleInitializedEvent.feature).toEqual(TEST_FEATURE_NAME);
      });
      it('should proxy return observable from the property', async () => {
        const result = await facade.testProperty.toPromise();
        expect(result).toEqual(333);
      });
    });
  });
});
