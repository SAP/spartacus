/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { RoutingConfig, UrlParsingService } from '@spartacus/core';
import { of } from 'rxjs';
import { CsAgentAuthService } from './csagent-auth.service';
import { AsmProtectedRoutesService } from './asm-protected-routes.service';

class MockUrlParsingService implements Partial<UrlParsingService> {
  matchPath(urlSegments: string[], pathSegments: string[]): boolean {
    return urlSegments.join('/') === pathSegments.join('/');
  }
}

class MockCsAgentAuthService implements Partial<CsAgentAuthService> {
  isCustomerSupportAgentLoggedIn() {
    return of(false);
  }
}

describe('AsmProtectedRoutesService', () => {
  let service: AsmProtectedRoutesService;
  let csAgentAuthService: CsAgentAuthService;

  function beforeEachWithConfig(routingConfig: RoutingConfig['routing']) {
    const mockConfig: RoutingConfig = {
      routing: routingConfig,
    };

    TestBed.configureTestingModule({
      providers: [
        AsmProtectedRoutesService,
        {
          provide: RoutingConfig,
          useValue: mockConfig,
        },
        {
          provide: UrlParsingService,
          useClass: MockUrlParsingService,
        },
        {
          provide: CsAgentAuthService,
          useClass: MockCsAgentAuthService,
        },
      ],
    });

    service = TestBed.inject(AsmProtectedRoutesService);
    csAgentAuthService = TestBed.inject(CsAgentAuthService);
  }

  describe('isUrlProtected', () => {
    describe('when CS Agent is logged in', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'] },
            cart: { paths: ['cart'] },
          },
        });
        vi.spyOn(
          csAgentAuthService,
          'isCustomerSupportAgentLoggedIn'
        ).mockReturnValue(of(true));
      });

      it('should return false for any URL', () => {
        expect(service.isUrlProtected(['login'])).toBe(false);
        expect(service.isUrlProtected(['cart'])).toBe(false);
        expect(service.isUrlProtected(['any-other-url'])).toBe(false);
      });
    });

    describe('when CS Agent is NOT logged in', () => {
      describe('and global protection is enabled', () => {
        beforeEach(() => {
          beforeEachWithConfig({
            protected: true,
            routes: {
              login: { paths: ['login'], protected: false },
              cart: { paths: ['cart'] },
            },
          });
          vi.spyOn(
            csAgentAuthService,
            'isCustomerSupportAgentLoggedIn'
          ).mockReturnValue(of(false));
        });

        it('should return true for protected URLs', () => {
          expect(service.isUrlProtected(['cart'])).toBe(true);
        });

        it('should return false for non-protected URLs', () => {
          expect(service.isUrlProtected(['login'])).toBe(false);
        });
      });

      describe('and global protection is disabled', () => {
        beforeEach(() => {
          beforeEachWithConfig({
            protected: false,
            routes: {
              login: { paths: ['login'] },
              cart: { paths: ['cart'] },
            },
          });
          vi.spyOn(
            csAgentAuthService,
            'isCustomerSupportAgentLoggedIn'
          ).mockReturnValue(of(false));
        });

        it('should return false for all URLs', () => {
          expect(service.isUrlProtected(['login'])).toBe(false);
          expect(service.isUrlProtected(['cart'])).toBe(false);
        });
      });
    });

    describe('when user is logged in (not CS Agent)', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'], protected: false },
            cart: { paths: ['cart'] },
            checkout: { paths: ['checkout'] },
          },
        });
        vi.spyOn(
          csAgentAuthService,
          'isCustomerSupportAgentLoggedIn'
        ).mockReturnValue(of(false));
      });

      it('should delegate to parent implementation for protected URLs', () => {
        expect(service.isUrlProtected(['cart'])).toBe(true);
        expect(service.isUrlProtected(['checkout'])).toBe(true);
      });

      it('should delegate to parent implementation for non-protected URLs', () => {
        expect(service.isUrlProtected(['login'])).toBe(false);
      });
    });
  });
});
