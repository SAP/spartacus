import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { interval, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Cpq } from '../../cpq/cpq.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';
import { CpqAccessStorageService } from './cpq-access-storage.service';
import createSpy = jasmine.createSpy;

const accessData: Cpq.AccessData = {
  accessToken: 'validToken',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: 2605693178233,
};
const expiredAccessData: Cpq.AccessData = {
  accessToken: 'expiredToken',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: -10,
};
const accessDataSoonExpiring: Cpq.AccessData = {
  accessToken: 'validTokenSoonExpiring',
  endpoint: 'https://cpq',
};
let accessDataObs: Observable<Cpq.AccessData>;
let accessDataSubject: Subject<Cpq.AccessData>;
class CpqAccessLoaderServiceMock {
  getCpqAccessData = createSpy().and.callFake(() => accessDataObs);
}

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
            provide: CpqAccessStorageService.TOKEN_EXPIRATION_BUFFER,
            useValue: 10,
          },
        ],
      });

      serviceUnderTest = TestBed.inject(
        CpqAccessStorageService as Type<CpqAccessStorageService>
      );
      cpqAccessLoaderService = TestBed.inject(
        CpqAccessLoaderService as Type<CpqAccessLoaderService>
      );

      //serviceUnderTest.clearCachedCpqAccessData();
      accessDataSoonExpiring.accessTokenExpirationTime = Date.now() + 20;
    })
  );

  afterEach(() => {
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
    accessDataSubject = new Subject<Cpq.AccessData>();
    accessDataObs = accessDataSubject;

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
    accessDataSubject = new ReplaySubject<Cpq.AccessData>(1);
    accessDataObs = accessDataSubject;
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      expect(returnedData).toBe(accessData); //make sure that second/valid token data is returned
      done();
    });
    accessDataSubject.next(expiredAccessData);
    accessDataSubject.next(accessData);
  });

  it('should do only one additional call when expired token is emitted followed by valid one', (done) => {
    accessDataSubject = new Subject<Cpq.AccessData>();
    accessDataObs = accessDataSubject;
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
    accessDataSubject = new Subject<Cpq.AccessData>();
    accessDataObs = accessDataSubject;
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
    accessDataSubject = new Subject<Cpq.AccessData>();
    accessDataObs = accessDataSubject;
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
    accessDataSubject = new Subject<Cpq.AccessData>();
    accessDataObs = accessDataSubject;
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
});
