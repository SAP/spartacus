import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
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
    expect(serviceUnderTest.getCpqAccessData()).toBeObservable(
      cold('x', { x: accessData })
    );
  });

  it('should cache access data', () => {
    accessDataObs = of(accessData);
    accessDataSubject.next(accessData);
    expect(serviceUnderTest.getCpqAccessData()).toBeObservable(
      cold('x', { x: accessData })
    );
  });
});
