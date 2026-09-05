/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthConfigService } from '../../user-auth/services/auth-config.service';
import { provideMockFeatureToggles } from '../../../features-config/feature-toggles/testing/mock-feature-toggles';
import { CrossSiteRequestForgeryService } from './cross-site-request-forgery.service';

class MockAuthConfigService implements Partial<AuthConfigService> {
  getCsrfEndpoint() {
    return 'https://api.example.com/authorizationserver/csrf';
  }
}

describe('CrossSiteRequestForgeryService', () => {
  let service: CrossSiteRequestForgeryService;
  let httpMock: HttpTestingController;

  function setup(concurrentLoginPagesSupport: boolean) {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CrossSiteRequestForgeryService,
        { provide: AuthConfigService, useClass: MockAuthConfigService },
        provideMockFeatureToggles({ concurrentLoginPagesSupport }),
      ],
    });
    service = TestBed.inject(CrossSiteRequestForgeryService);
    httpMock = TestBed.inject(HttpTestingController);
  }

  afterEach(() => {
    httpMock.verify();
  });

  describe('when concurrentLoginPagesSupport is disabled (default)', () => {
    beforeEach(() => setup(false));

    it('should fetch CSRF token from plain URL even when authReqId is provided', () => {
      service.getCsrfToken('some-req-id').subscribe();

      const req = httpMock.expectOne(
        'https://api.example.com/authorizationserver/csrf'
      );
      expect(req.request.url).toBe(
        'https://api.example.com/authorizationserver/csrf'
      );
      req.flush({ token: 'tok', headerName: 'X-CSRF', parameterName: '_csrf' });
    });

    it('should fetch CSRF token from plain URL when no authReqId', () => {
      service.getCsrfToken().subscribe();

      const req = httpMock.expectOne(
        'https://api.example.com/authorizationserver/csrf'
      );
      expect(req.request.url).toBe(
        'https://api.example.com/authorizationserver/csrf'
      );
      req.flush({ token: 'tok', headerName: 'X-CSRF', parameterName: '_csrf' });
    });

    it('should use withCredentials', () => {
      service.getCsrfToken().subscribe();
      const req = httpMock.expectOne(
        'https://api.example.com/authorizationserver/csrf'
      );
      expect(req.request.withCredentials).toBe(true);
      req.flush({});
    });
  });

  describe('when concurrentLoginPagesSupport is enabled', () => {
    beforeEach(() => setup(true));

    it('should append auth_req_id to the URL when provided', () => {
      service.getCsrfToken('abc123').subscribe();

      const req = httpMock.expectOne((r) => r.url.includes('auth_req_id'));
      expect(req.request.url).toBe(
        'https://api.example.com/authorizationserver/csrf?auth_req_id=abc123'
      );
      req.flush({ token: 'tok', headerName: 'X-CSRF', parameterName: '_csrf' });
    });

    it('should URL-encode special characters in auth_req_id', () => {
      service.getCsrfToken('a b+c').subscribe();

      const req = httpMock.expectOne((r) => r.url.includes('auth_req_id'));
      expect(req.request.url).toContain('auth_req_id=a+b%2Bc');
      req.flush({});
    });

    it('should NOT append auth_req_id when it is undefined', () => {
      service.getCsrfToken(undefined).subscribe();

      const req = httpMock.expectOne(
        'https://api.example.com/authorizationserver/csrf'
      );
      expect(req.request.url).not.toContain('auth_req_id');
      req.flush({});
    });

    it('should use withCredentials', () => {
      service.getCsrfToken('id').subscribe();
      const req = httpMock.expectOne((r) => r.url.includes('auth_req_id'));
      expect(req.request.withCredentials).toBe(true);
      req.flush({});
    });
  });
});
