/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FederatedLoginService } from '../../../federated-login/services/federated-login.service';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { WindowRef } from '../../../window/window-ref';
import { AuthFlowRoutesService } from '../services/auth-flow-routes.service';
import { FederatedLoginGuard } from './federated-login.guard';

class MockFederatedLoginService implements Partial<FederatedLoginService> {
  enabled = false;
  isLoginDomain = false;
  origin: string | undefined = undefined;
}

class MockAuthFlowRoutesService implements Partial<AuthFlowRoutesService> {
  isAuthFlow = vi.fn().mockReturnValue(false);
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = vi.fn().mockImplementation((route: string) => `/${route}`);
}

class MockRouter implements Partial<Router> {
  parseUrl = vi
    .fn()
    .mockImplementation((url: string) => ({ root: url }) as unknown as UrlTree);
}

class MockWindowRef implements Partial<WindowRef> {
  location = { href: '' } as unknown as Location;
}

describe('FederatedLoginGuard', () => {
  let guard: FederatedLoginGuard;
  let federatedLoginService: MockFederatedLoginService;
  let authFlowRoutesService: MockAuthFlowRoutesService;
  let semanticPathService: MockSemanticPathService;
  let router: MockRouter;
  let windowRef: MockWindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FederatedLoginGuard,
        { provide: FederatedLoginService, useClass: MockFederatedLoginService },
        {
          provide: AuthFlowRoutesService,
          useClass: MockAuthFlowRoutesService,
        },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: Router, useClass: MockRouter },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });

    guard = TestBed.inject(FederatedLoginGuard);
    federatedLoginService = TestBed.inject(
      FederatedLoginService
    ) as MockFederatedLoginService;
    authFlowRoutesService = TestBed.inject(
      AuthFlowRoutesService
    ) as unknown as MockAuthFlowRoutesService;
    semanticPathService = TestBed.inject(
      SemanticPathService
    ) as unknown as MockSemanticPathService;
    router = TestBed.inject(Router) as unknown as MockRouter;
    windowRef = TestBed.inject(WindowRef) as MockWindowRef;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should continue when federated login is disabled', async () => {
    federatedLoginService.enabled = false;
    federatedLoginService.isLoginDomain = true;

    const guardResult = await firstValueFrom(
      guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );

    expect(guardResult).toBe(true);
  });

  describe('when federated login is enabled', () => {
    beforeEach(() => {
      federatedLoginService.enabled = true;
    });

    it('should continue when not on a login domain', async () => {
      federatedLoginService.isLoginDomain = false;

      const guardResult = await firstValueFrom(
        guard.canActivate(
          {} as ActivatedRouteSnapshot,
          {} as RouterStateSnapshot
        )
      );

      expect(guardResult).toBe(true);
    });

    describe('when on a login domain', () => {
      beforeEach(() => {
        federatedLoginService.isLoginDomain = true;
      });

      it('should continue when on a valid route', async () => {
        federatedLoginService.origin = 'https://storefront1.de';
        authFlowRoutesService.isAuthFlow.mockReturnValue(true);

        const guardResult = await firstValueFrom(
          guard.canActivate(
            {} as ActivatedRouteSnapshot,
            {} as RouterStateSnapshot
          )
        );

        expect(guardResult).toBe(true);
      });

      describe('when there is no context', () => {
        let activatedRoute: ActivatedRouteSnapshot;
        let routerState: RouterStateSnapshot;

        beforeEach(() => {
          federatedLoginService.origin = undefined;
          activatedRoute = {} as ActivatedRouteSnapshot;
          routerState = {
            url: '/login?ctx=',
          } as RouterStateSnapshot;
          (semanticPathService.get as Mock).mockReturnValue('/not-found');
        });

        it('should redirect to the notFound route', async () => {
          const guardResult = await firstValueFrom(
            guard.canActivate(activatedRoute, routerState)
          );

          expect(semanticPathService.get).toHaveBeenCalledWith('notFound');
          expect(router.parseUrl).toHaveBeenCalledWith('/not-found');
          expect(guardResult).toEqual({
            root: '/not-found',
          } as unknown as UrlTree);
        });

        it('should avoid an infinite loop when already on the notFound route', async () => {
          routerState.url = '/not-found';

          const guardResult = await firstValueFrom(
            guard.canActivate(activatedRoute, routerState)
          );

          expect(guardResult).toBe(true);
        });

        it('should avoid an infinite loop when already on the notFound route with site context path', async () => {
          routerState.url = '/electronics-spa/en/USD/not-found';

          const guardResult = await firstValueFrom(
            guard.canActivate(activatedRoute, routerState)
          );

          expect(guardResult).toBe(true);
        });

        it('should avoid an infinite loop when the notFound route is not configured', async () => {
          (semanticPathService.get as Mock).mockReturnValue(undefined);

          const guardResult = await firstValueFrom(
            guard.canActivate(activatedRoute, routerState)
          );

          expect(guardResult).toBe(true);
        });
      });

      describe('when there is a valid origin', () => {
        const storefrontOrigin = 'https://storefront1.de';

        beforeEach(() => {
          federatedLoginService.origin = storefrontOrigin;
        });

        it('should continue with a valid route', async () => {
          (authFlowRoutesService.isAuthFlow as Mock).mockReturnValue(true);
          const url = '/login';

          const guardResult = await firstValueFrom(
            guard.canActivate(
              {} as ActivatedRouteSnapshot,
              { url } as RouterStateSnapshot
            )
          );

          expect(guardResult).toBe(true);
        });

        it('should redirect when on an invalid route', async () => {
          (authFlowRoutesService.isAuthFlow as Mock).mockReturnValue(false);
          const url = '/login';
          const expectedRedirectURL = `${storefrontOrigin}${url}`;

          const guardResult = await firstValueFrom(
            guard.canActivate(
              {} as ActivatedRouteSnapshot,
              { url } as RouterStateSnapshot
            )
          );

          expect(windowRef.location.href).toBe(expectedRedirectURL);
          expect(guardResult).toBe(false);
        });
      });
    });
  });
});
