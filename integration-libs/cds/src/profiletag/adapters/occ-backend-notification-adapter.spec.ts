/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccEndpointsService, UserIdService } from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
import { OccBackendNotification } from '@spartacus/cds';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

const BASE_URL = '/occ/v2/electronics-spa';
const MOCK_USER_ID = 'test-user-123';

class MockOccEndpointsService {
  getBaseUrl(): string {
    return BASE_URL;
  }
}

class MockUserIdService {
  takeUserId(_loggedIn?: boolean): Observable<string> {
    return of(MOCK_USER_ID);
  }
}

describe('OccBackendNotification', () => {
  let adapter: OccBackendNotification;
  let httpMock: HttpTestingController;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccBackendNotification,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: UserIdService, useClass: MockUserIdService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccBackendNotification);
    httpMock = TestBed.inject(HttpTestingController);
    userIdService = TestBed.inject(UserIdService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('notifySuccessfulLogin', () => {
    it('should POST to the login notification endpoint with the dynamic userId', () => {
      adapter.notifySuccessfulLogin().subscribe();

      const req = httpMock.expectOne(
        `${BASE_URL}/users/${MOCK_USER_ID}/loginnotification`
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});
      req.flush({});
    });

    it('should use the userId from UserIdService, not a hardcoded value', () => {
      spyOn(userIdService, 'takeUserId').and.returnValue(of('emulated-user'));

      adapter.notifySuccessfulLogin().subscribe();

      const req = httpMock.expectOne(
        `${BASE_URL}/users/emulated-user/loginnotification`
      );
      req.flush({});
      expect(userIdService.takeUserId).toHaveBeenCalledWith(true);
    });

    it('should complete without emitting a value on success', (done) => {
      const emitted: unknown[] = [];

      adapter.notifySuccessfulLogin().subscribe({
        next: (val) => emitted.push(val),
        complete: () => {
          expect(emitted.length).toBe(0);
          done();
        },
      });

      httpMock
        .expectOne(`${BASE_URL}/users/${MOCK_USER_ID}/loginnotification`)
        .flush({});
    });

    it('should propagate an error when UserIdService throws (anonymous user)', (done) => {
      spyOn(userIdService, 'takeUserId').and.returnValue(
        throwError(
          () =>
            new Error(
              'Requested user id for logged user while user is not logged in.'
            )
        )
      );

      adapter.notifySuccessfulLogin().subscribe({
        error: (err: Error) => {
          expect(err.message).toContain('not logged in');
          done();
        },
      });

      httpMock.expectNone(`${BASE_URL}/users/anonymous/loginnotification`);
    });
  });
});
