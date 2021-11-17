import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import {
  discardPeriodicTasks,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { AuthService } from '@spartacus/core';
import { cold } from 'jasmine-marbles';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';
import { CpqAccessStorageService } from './cpq-access-storage.service';
import { CpqConfiguratorAuthConfig } from './cpq-configurator-auth.config';
import { defaultCpqConfiguratorAuthConfig } from './default-cpq-configurator-auth.config';
import createSpy = jasmine.createSpy;

const oneHour: number = 1000 * 60;
const accessData: CpqAccessData = {
  accessToken: 'validToken',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: Date.now() + oneHour,
};

const anotherAccessData: CpqAccessData = {
  accessToken: 'anotherValidToken',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: Date.now() + oneHour,
};
const expiredAccessData: CpqAccessData = {
  accessToken: 'expiredToken',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: Date.now() - oneHour,
};
const accessDataSoonExpiring: CpqAccessData = {
  accessToken: 'validTokenSoonExpiring',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: 0,
};
let accessDataObs: Observable<CpqAccessData>;
let authDataObs: Observable<Boolean>;
let accessDataSubject: Subject<CpqAccessData>;
let authDataSubject: Subject<Boolean>;
let httpBehaviour = true;
class CpqAccessLoaderServiceMock {
  getCpqAccessData = createSpy().and.callFake(() => {
    return httpBehaviour ? accessDataObs.pipe(take(1)) : accessDataObs;
  });
}

class AuthServiceMock {
  isUserLoggedIn = createSpy().and.callFake(() => authDataObs);
}

const TIME_UNTIL_TOKEN_EXPIRES = 60000; // one minute

describe('CpqAccessStorageService', () => {
  let serviceUnderTest: CpqAccessStorageService;
  let cpqAccessLoaderService: CpqAccessLoaderService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: CpqAccessLoaderService,
            useClass: CpqAccessLoaderServiceMock,
          },
          {
            provide: CpqConfiguratorAuthConfig,
            useValue: defaultCpqConfiguratorAuthConfig,
          },
          {
            provide: AuthService,
            useClass: AuthServiceMock,
          },
        ],
      });

      serviceUnderTest = TestBed.inject(
        CpqAccessStorageService as Type<CpqAccessStorageService>
      );
      cpqAccessLoaderService = TestBed.inject(
        CpqAccessLoaderService as Type<CpqAccessLoaderService>
      );

      accessDataSoonExpiring.accessTokenExpirationTime =
        Date.now() + TIME_UNTIL_TOKEN_EXPIRES;

      accessDataObs = accessDataSubject = new Subject<CpqAccessData>();
      authDataObs = authDataSubject = new BehaviorSubject<Boolean>(true);
      httpBehaviour = true;
    })
  );

  afterEach(() => {
    authDataSubject.next(false); // stops the auto pulling of access data
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should return access data', () => {
    accessDataObs = of(accessData);
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      expect(returnedData.accessToken).toEqual(accessData.accessToken);
      expect(returnedData.accessTokenExpirationTime).toEqual(
        accessData.accessTokenExpirationTime
      );
      expect(returnedData.endpoint).toEqual(accessData.endpoint);
    });
  });

  it('should cache access data', () => {
    let counter = 0;
    // first request
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      counter++;
    });
    // second request, while first is in progress ()
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      counter++;
    });

    // fulfill first request
    accessDataSubject.next(accessData);

    // third request
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      counter++;
    });

    expect(counter).toBe(3);
  });

  it('should not return access data if token is expired', fakeAsync(() => {
    accessDataObs = accessDataSubject = new BehaviorSubject<CpqAccessData>(
      expiredAccessData
    );
    let hasCpqAccessDataEmitted = false;
    serviceUnderTest.getCpqAccessData().subscribe(() => {
      hasCpqAccessDataEmitted = true;
    });
    discardPeriodicTasks();
    expect(hasCpqAccessDataEmitted).toBe(false);
  }));

  it('should do only one additional call when expired token is emitted followed by valid one', fakeAsync(() => {
    const subscription = serviceUnderTest.getCpqAccessData().subscribe();
    subscription.add(serviceUnderTest.getCpqAccessData().subscribe());
    subscription.add(serviceUnderTest.getCpqAccessData().subscribe());
    subscription.add(serviceUnderTest.getCpqAccessData().subscribe());
    accessDataSubject.next(expiredAccessData);
    accessDataSubject.next(accessData);

    tick(TIME_UNTIL_TOKEN_EXPIRES);
    expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(2);
    subscription.unsubscribe();
    discardPeriodicTasks();
  }));

  it('should accept token that soon expires', (done) => {
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(accessDataSoonExpiring);
      done();
    });
    accessDataSubject.next(accessDataSoonExpiring);
  });

  it('should not return emissions with tokens that are not valid at all', () => {
    httpBehaviour = false;
    accessDataObs = cold('--yxx', { x: accessData, y: expiredAccessData });
    const expectedObs = cold('---xx', { x: accessData });
    expect(serviceUnderTest.getCpqAccessData()).toBeObservable(expectedObs);
  });

  it('should trigger new call if token expires over time', fakeAsync(() => {
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(accessDataSoonExpiring);
    });
    accessDataSubject.next(accessDataSoonExpiring);

    tick(TIME_UNTIL_TOKEN_EXPIRES);
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(accessData);
    });
    accessDataSubject.next(accessData);
    discardPeriodicTasks();
  }));

  it('should use only one publication for multiple observables after cache refresh', fakeAsync(() => {
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(accessDataSoonExpiring);
    });
    const existingObs = takeOneCpqAccessData();
    existingObs.subscribe((returnedData) => {
      expect(returnedData).toBe(accessDataSoonExpiring);
      expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(1);
    });
    accessDataSubject.next(accessDataSoonExpiring);

    tick(TIME_UNTIL_TOKEN_EXPIRES);
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(accessData);
      existingObs.subscribe((data) => {
        expect(data).toBe(accessData);
        //We expect one more call to the backend as token expired
        expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(
          2
        );
      });
    });
    accessDataSubject.next(accessData);
    discardPeriodicTasks();
  }));

  it('should cancel refresh of expired token on user log out', fakeAsync(() => {
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(accessDataSoonExpiring);
    });
    accessDataSubject.next(accessDataSoonExpiring);
    authDataSubject.next(false);

    tick(TIME_UNTIL_TOKEN_EXPIRES);
    accessDataSubject.next(anotherAccessData);
    expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));

  it('should fetch new token after logoff/login cycle', fakeAsync(() => {
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(accessDataSoonExpiring);
    });
    accessDataSubject.next(accessDataSoonExpiring);
    authDataSubject.next(false);

    tick(TIME_UNTIL_TOKEN_EXPIRES);
    serviceUnderTest.getCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(anotherAccessData);
      //We expect one more call to the backend as token expired
      expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(2);
    });
    accessDataSubject.next(accessData); // nobody should receive this, as user is logged off

    flush();
    authDataSubject.next(true);
    accessDataSubject.next(anotherAccessData);
    discardPeriodicTasks();
  }));

  it('should get new token after refresh', (done) => {
    const obs = takeOneCpqAccessData();
    accessDataSubject.next(accessData);
    serviceUnderTest.renewCpqAccessData();
    accessDataSubject.next(anotherAccessData);
    obs.subscribe((returnedData) => {
      expect(returnedData).toBe(anotherAccessData);
      expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should not emit old token after refresh anymore', fakeAsync(() => {
    const obs = takeOneCpqAccessData();
    accessDataSubject.next(accessData);
    serviceUnderTest.renewCpqAccessData();
    obs.subscribe((returnedData) => {
      expect(returnedData).toBe(anotherAccessData);
      expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(2);
    });
    flush();
    accessDataSubject.next(anotherAccessData);
    discardPeriodicTasks();
  }));

  it('should not fail on refresh when not initialized', (done) => {
    serviceUnderTest.renewCpqAccessData();
    takeOneCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(accessData);
      expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(1);
      done();
    });
    accessDataSubject.next(accessData);
  });

  it('should only refresh when user is logged in', (done) => {
    //make sure obs is initiated (in contrast to previous test)
    const obs = serviceUnderTest.getCpqAccessData();
    accessDataSubject.next(accessData);
    authDataSubject.next(false);
    serviceUnderTest.renewCpqAccessData();
    accessDataSubject.next(anotherAccessData);
    obs.subscribe((returnedData) => {
      expect(returnedData).toBe(accessData);
      expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(2);
      done();
    });
    authDataSubject.next(true);
    accessDataSubject.next(accessData);
  });

  it('should be able to still fetch new access data after error', () => {
    takeOneCpqAccessData().subscribe(
      () => {
        fail('should throw an error');
      },
      (error) => {
        expect(error).toBeDefined();
        accessDataObs = of(accessData);
        takeOneCpqAccessData().subscribe((returnedData) => {
          expect(returnedData).toBe(accessData);
        });
      }
    );
    accessDataSubject.error('fail');
  });

  describe('fetchNextTokenIn', () => {
    it('should throw error in case auth configuration is incomplete', () => {
      serviceUnderTest['config'].productConfigurator.cpq = undefined;
      expect(() =>
        serviceUnderTest['fetchNextTokenIn'](accessData)
      ).toThrowError();
    });
  });

  describe('isTokenExpired', () => {
    it('should throw error in case auth configuration is incomplete', () => {
      serviceUnderTest['config'].productConfigurator.cpq = undefined;
      expect(() =>
        serviceUnderTest['isTokenExpired'](accessData)
      ).toThrowError();
    });
  });

  function takeOneCpqAccessData(): Observable<CpqAccessData> {
    return serviceUnderTest.getCpqAccessData().pipe(take(1));
  }
});
