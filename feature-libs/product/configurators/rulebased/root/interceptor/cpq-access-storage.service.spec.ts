import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '@spartacus/core';
import { cold } from 'jasmine-marbles';
import {
  BehaviorSubject,
  interval,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';
import {
  CpqAccessStorageService,
  CpqConfiguratorTokenConfig,
} from './cpq-access-storage.service';
import createSpy = jasmine.createSpy;

const accessData: CpqAccessData = {
  accessToken: 'validToken',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: 2605693178233,
};

const anotherAccessData: CpqAccessData = {
  accessToken: 'anotherValidToken',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: 2605693178233,
};
const expiredAccessData: CpqAccessData = {
  accessToken: 'expiredToken',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: -10,
};
const accessDataSoonExpiring: CpqAccessData = {
  accessToken: 'validTokenSoonExpiring',
  endpoint: 'https://cpq',
};
let accessDataObs: Observable<CpqAccessData>;
let authDataObs: Observable<Boolean>;
let accessDataSubject: Subject<CpqAccessData>;
let authDataSubject: Subject<Boolean>;
class CpqAccessLoaderServiceMock {
  getCpqAccessData = createSpy().and.callFake(() => accessDataObs);
}

class AuthServiceMock {
  isUserLoggedIn = createSpy().and.callFake(() => authDataObs);
}

const TestCpqConfiguratorTokenConfig: CpqConfiguratorTokenConfig = {
  cpqConfigurator: {
    tokenExpirationBuffer: 10, // ten ms
    tokenMaxValidity: 24 * 60 * 60 * 1000, //one day
  },
};

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
            provide: CpqConfiguratorTokenConfig,
            useValue: TestCpqConfiguratorTokenConfig,
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

      accessDataSoonExpiring.accessTokenExpirationTime = Date.now() + 20;

      accessDataObs = accessDataSubject = new Subject<CpqAccessData>();
      authDataObs = authDataSubject = new BehaviorSubject<Boolean>(true);
    })
  );

  afterEach(() => {
    authDataSubject.next(false);
    waitForAsync(() => {}); // Guard to ensure that all aysnc is stopped
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should return access data', () => {
    accessDataObs = of(accessData);
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
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
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      counter++;
    });
    // second request, while first is in progress ()
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      counter++;
    });

    // fullfill first request
    accessDataSubject.next(accessData);

    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      counter++;
    });

    expect(counter).toBe(3, '3 consumes should have been called each once');
  });

  it('should transparently fetch new token, when access data has expired', (done) => {
    accessDataObs = accessDataSubject = new ReplaySubject<CpqAccessData>(1);
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      expect(returnedData).toBe(accessData); //make sure that second/valid token data is returned
      done();
    });
    accessDataSubject.next(expiredAccessData);
    accessDataSubject.next(accessData);
  });

  it('should do only one additional call when expired token is emitted followed by valid one', (done) => {
    serviceUnderTest.getCachedCpqAccessData().subscribe();
    serviceUnderTest.getCachedCpqAccessData().subscribe();
    serviceUnderTest.getCachedCpqAccessData().subscribe();
    serviceUnderTest.getCachedCpqAccessData().subscribe();
    serviceUnderTest.getCachedCpqAccessData().subscribe();
    accessDataSubject.next(expiredAccessData);
    accessDataSubject.next(accessData);
    interval(15)
      .pipe(take(1))
      .subscribe(() => {
        expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(
          2
        );
        done();
      });
  });

  it('should accept token that soon expires', (done) => {
    const subscription = serviceUnderTest
      .getCachedCpqAccessData()
      .subscribe((returnedData) => {
        expect(returnedData).toBe(accessDataSoonExpiring);
        subscription.unsubscribe();
        done();
      });
    accessDataSubject.next(accessDataSoonExpiring);
  });

  it('should not return emissions with tokens that are not valid at all', () => {
    accessDataObs = cold('--yxx', { x: accessData, y: expiredAccessData });
    const expectedObs = cold('---xx', { x: accessData });
    expect(serviceUnderTest.getCachedCpqAccessData()).toBeObservable(
      expectedObs
    );
  });

  it('should trigger new call if token expires over time', (done) => {
    serviceUnderTest
      .getCachedCpqAccessData()
      .subscribe((returnedData) => {
        expect(returnedData).toBe(accessDataSoonExpiring);
      })
      .unsubscribe();
    interval(20)
      .pipe(
        take(1),
        switchMap(() => serviceUnderTest.getCachedCpqAccessData())
      )
      .subscribe((returnedData) => {
        expect(returnedData).toBe(accessData);
        done();
      });
    accessDataSubject.next(accessDataSoonExpiring);
    interval(30)
      .pipe(take(1))
      .subscribe(() => {
        accessDataSubject.next(accessData);
      });
  });

  it('should use only one publication for multiple observables after cache refresh', (done) => {
    serviceUnderTest
      .getCachedCpqAccessData()
      .pipe(take(1))
      .subscribe((returnedData) => {
        expect(returnedData).toBe(accessDataSoonExpiring);
      });
    const existingSubscription = serviceUnderTest.getCachedCpqAccessData();
    existingSubscription.pipe(take(1)).subscribe((returnedData) => {
      expect(returnedData).toBe(accessDataSoonExpiring);
      expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(1);
    });

    interval(30)
      .pipe(
        take(1),
        switchMap(() => serviceUnderTest.getCachedCpqAccessData())
      )
      .subscribe((returnedData) => {
        expect(returnedData).toBe(accessData);
        existingSubscription.subscribe((data) => {
          expect(data).toBe(accessData);
          //We expect one more call to the backend as token expired
          expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(
            2
          );
          done();
        });
      });

    accessDataSubject.next(accessDataSoonExpiring);
    interval(40)
      .pipe(take(1))
      .subscribe(() => {
        accessDataSubject.next(accessData);
      });
  });

  it('should cancel refresh of expired token on user log out', (done) => {
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBe(accessDataSoonExpiring);
    });
    accessDataSubject.next(accessDataSoonExpiring);
    authDataSubject.next(false);
    interval(30)
      .pipe(take(1))
      .subscribe(() => {
        expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(
          1
        );
        done();
      });
  });

  it('should fetch new token after logoff/login cycle', (done) => {
    serviceUnderTest
      .getCachedCpqAccessData()
      .subscribe((returnedData) => {
        expect(returnedData).toBe(accessDataSoonExpiring);
      })
      .unsubscribe();
    interval(20)
      .pipe(
        take(1),
        switchMap(() => serviceUnderTest.getCachedCpqAccessData())
      )
      .subscribe((returnedData) => {
        expect(returnedData).toBe(anotherAccessData);
        //We expect one more call to the backend as token expired
        expect(cpqAccessLoaderService.getCpqAccessData).toHaveBeenCalledTimes(
          2
        );
        done();
      });
    accessDataSubject.next(accessDataSoonExpiring);
    authDataSubject.next(false);
    interval(10)
      .pipe(take(1))
      .subscribe(() => {
        accessDataSubject.next(accessData); // nobody should receive this, as user is logged off
      });

    interval(30)
      .pipe(take(1))
      .subscribe(() => {
        authDataSubject.next(true);
        accessDataSubject.next(anotherAccessData);
      });
  });
});
