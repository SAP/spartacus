/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { LoggerService, OccEndpointsService } from '@spartacus/core';
import { MockOccEndpointsService } from 'core-libs/core/src/occ/adapters/user/unit-test.helper';
import { OccB2bUnitSelectionAdapter } from './occ-b2b-unit-selection.adapter';

const userId = 'current';
const unitUid = 'Rustic';

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('OccB2bUnitSelectionAdapter', () => {
  let adapter: OccB2bUnitSelectionAdapter;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccB2bUnitSelectionAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccB2bUnitSelectionAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ── loadDefaultOrgUnitName ───────────────────────────────────────────────

  describe('loadDefaultOrgUnitName()', () => {
    it('should call the orgUser endpoint', fakeAsync(() => {
      adapter.loadDefaultOrgUnitName(userId).subscribe();

      httpMock.expectOne((req: HttpRequest<void>) => req.method === 'GET');

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('orgUser', {
        urlParams: { userId },
      });
    }));

    it('should return the orgUnit name from the response', (done) => {
      adapter.loadDefaultOrgUnitName(userId).subscribe((name) => {
        expect(name).toBe('Rustic');
        done();
      });

      httpMock
        .expectOne((req: HttpRequest<void>) => req.method === 'GET')
        .flush({ orgUnit: { name: 'Rustic' } });
    });

    it('should return undefined when orgUnit is missing from response', (done) => {
      adapter.loadDefaultOrgUnitName(userId).subscribe((name) => {
        expect(name).toBeUndefined();
        done();
      });

      httpMock
        .expectOne((req: HttpRequest<void>) => req.method === 'GET')
        .flush({});
    });

    it('should rethrow a normalised error on HTTP failure', (done) => {
      adapter.loadDefaultOrgUnitName(userId).subscribe({
        error: (err) => {
          expect(err).toBeDefined();
          done();
        },
      });

      httpMock
        .expectOne((req: HttpRequest<void>) => req.method === 'GET')
        .flush('error', { status: 500, statusText: 'Server Error' });
    });
  });

  // ── loadOrgUnits ─────────────────────────────────────────────────────────

  describe('loadOrgUnits()', () => {
    it('should call the orgUserUnits endpoint', fakeAsync(() => {
      adapter.loadOrgUnits(userId).subscribe();

      httpMock.expectOne((req: HttpRequest<void>) => req.method === 'GET');

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'orgUserUnits',
        {
          urlParams: { userId },
        }
      );
    }));

    it('should return the units array from the response', (done) => {
      const mockUnits = [{ uid: 'unit-1', name: 'Rustic' }];

      adapter.loadOrgUnits(userId).subscribe((units) => {
        expect(units).toEqual(mockUnits);
        done();
      });

      httpMock
        .expectOne((req: HttpRequest<void>) => req.method === 'GET')
        .flush({ orgUnits: mockUnits });
    });

    it('should return an empty array when orgUnits is missing', (done) => {
      adapter.loadOrgUnits(userId).subscribe((units) => {
        expect(units).toEqual([]);
        done();
      });

      httpMock
        .expectOne((req: HttpRequest<void>) => req.method === 'GET')
        .flush({});
    });

    it('should rethrow a normalised error on HTTP failure', (done) => {
      adapter.loadOrgUnits(userId).subscribe({
        error: (err) => {
          expect(err).toBeDefined();
          done();
        },
      });

      httpMock
        .expectOne((req: HttpRequest<void>) => req.method === 'GET')
        .flush('error', { status: 404, statusText: 'Not Found' });
    });
  });

  // ── setDefaultOrgUnit ────────────────────────────────────────────────────

  describe('setDefaultOrgUnit()', () => {
    it('should call the orgUserDefaultUnit endpoint with PUT', fakeAsync(() => {
      adapter.setDefaultOrgUnit(userId, unitUid).subscribe();

      const req = httpMock.expectOne(
        (r: HttpRequest<any>) => r.method === 'PUT'
      );
      expect(req.request.body).toEqual({ uid: unitUid });

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'orgUserDefaultUnit',
        { urlParams: { userId } }
      );
    }));

    it('should complete (and not error) on success', (done) => {
      adapter.setDefaultOrgUnit(userId, unitUid).subscribe({
        error: () => fail('should not error'),
        complete: done,
      });

      httpMock
        .expectOne((req: HttpRequest<any>) => req.method === 'PUT')
        .flush(null);
    });

    it('should rethrow a normalised error on HTTP failure', (done) => {
      adapter.setDefaultOrgUnit(userId, unitUid).subscribe({
        error: (err) => {
          expect(err).toBeDefined();
          done();
        },
      });

      httpMock
        .expectOne((req: HttpRequest<any>) => req.method === 'PUT')
        .flush('error', { status: 400, statusText: 'Bad Request' });
    });
  });
});
