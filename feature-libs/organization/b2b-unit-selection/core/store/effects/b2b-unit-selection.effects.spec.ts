/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  AuthActions,
  B2BUnit,
  LoggerService,
  OAuthLibWrapperService,
  RoutingService,
  UserIdService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
// Side-effect import: registers LAUNCH_CALLER.B2B_UNIT_SELECTION enum extension.
import '../../../root/model/augmented-core.model';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { B2bUnitSelectionConfig } from '../../../root/config/b2b-unit-selection.config';
import { B2bRedirectCoordinator } from '../../../root/b2b-redirect-coordinator.service';
import { B2bUnitSelectionConnector } from '../../connectors/b2b-unit-selection.connector';
import { B2bUnitSelectorStateService } from '../../services/b2b-unit-selector-state.service';
import * as B2bUnitSelectionActions from '../actions/b2b-unit-selection.actions';
import { B2bUnitSelectionEffects } from './b2b-unit-selection.effects';
import createSpy = jasmine.createSpy;

const mockUnits: B2BUnit[] = [
  { uid: 'unit-1', name: 'Rustic' },
  { uid: 'unit-2', name: 'Rustic Services' },
];
const mockUserId = 'current';
const mockDefaultUid = 'Rustic';
const mockError = new HttpErrorResponse({ error: 'test-error' });

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

class MockB2bUnitSelectionConnector {
  loadOrgUnits = createSpy('loadOrgUnits').and.returnValue(of(mockUnits));
  loadDefaultOrgUnitUid = createSpy('loadDefaultOrgUnitUid').and.returnValue(
    of(mockDefaultUid)
  );
  setDefaultOrgUnit = createSpy('setDefaultOrgUnit').and.returnValue(of(void 0));
}

class MockB2bUnitSelectorStateService {
  setOrgUnits = createSpy('setOrgUnits');
  setActiveUnit = createSpy('setActiveUnit');
}

class MockLaunchDialogService {
  openDialogAndSubscribe = createSpy('openDialogAndSubscribe');
  closeDialog = createSpy('closeDialog');
}

class MockUserIdService {
  takeUserId = createSpy('takeUserId').and.returnValue(of(mockUserId));
}

class MockRoutingService {
  go = createSpy('go');
}

class MockB2bRedirectCoordinator {
  allowRedirect = createSpy('allowRedirect');
  isBlocked = createSpy('isBlocked').and.returnValue(false);
}

class MockOAuthLibWrapperService {
  refreshToken = createSpy('refreshToken');
}

describe('B2bUnitSelectionEffects', () => {
  let effects: B2bUnitSelectionEffects;
  let connector: MockB2bUnitSelectionConnector;
  let stateService: MockB2bUnitSelectorStateService;
  let launchDialogService: MockLaunchDialogService;
  let coordinator: MockB2bRedirectCoordinator;
  let routingService: MockRoutingService;
  let oAuthLibWrapperService: MockOAuthLibWrapperService;
  let actions$: Observable<Action>;
  let applicationRef: any;

  beforeEach(() => {
    applicationRef = {
      components: [{}] as any[],
      afterTick: { subscribe: jasmine.createSpy().and.returnValue({ unsubscribe: () => {} }) },
    };

    TestBed.configureTestingModule({
      providers: [
        B2bUnitSelectionEffects,
        { provide: B2bUnitSelectionConnector, useClass: MockB2bUnitSelectionConnector },
        { provide: B2bUnitSelectorStateService, useClass: MockB2bUnitSelectorStateService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: B2bRedirectCoordinator, useClass: MockB2bRedirectCoordinator },
        { provide: OAuthLibWrapperService, useClass: MockOAuthLibWrapperService },
        { provide: ApplicationRef, useValue: applicationRef },
        { provide: LoggerService, useClass: MockLoggerService },
        {
          provide: B2bUnitSelectionConfig,
          useValue: { b2bUnitSelection: { enabled: true } },
        },
        provideMockActions(() => actions$),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    effects = TestBed.inject(B2bUnitSelectionEffects);
    connector = TestBed.inject(B2bUnitSelectionConnector) as any;
    stateService = TestBed.inject(B2bUnitSelectorStateService) as any;
    launchDialogService = TestBed.inject(LaunchDialogService) as any;
    coordinator = TestBed.inject(B2bRedirectCoordinator) as any;
    routingService = TestBed.inject(RoutingService) as any;
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService) as any;
  });

  // ── checkOrgUnitsOnLogin$ ─────────────────────────────────────────────────

  describe('checkOrgUnitsOnLogin$', () => {
    it('should dispatch LoadUserOrgUnitsSuccess on successful login with multiple units', () => {
      const action = new AuthActions.Login();
      const completion = new B2bUnitSelectionActions.LoadUserOrgUnitsSuccess(mockUnits);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.checkOrgUnitsOnLogin$).toBeObservable(expected);
    });

    it('should write units and active unit to the state service', () => {
      const action = new AuthActions.Login();
      actions$ = hot('-a', { a: action });

      effects.checkOrgUnitsOnLogin$.subscribe();

      expect(stateService.setOrgUnits).toHaveBeenCalledWith(mockUnits);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(mockDefaultUid);
    });

    it('should open the dialog when orgUnits.length > 0', fakeAsync(() => {
      const action = new AuthActions.Login();
      actions$ = hot('-a', { a: action });

      effects.checkOrgUnitsOnLogin$.subscribe();
      tick();

      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
        LAUNCH_CALLER.B2B_UNIT_SELECTION,
        undefined,
        { orgUnits: mockUnits, defaultUnitUid: mockDefaultUid }
      );
    }));

    it('should call allowRedirect() when orgUnits is empty', () => {
      connector.loadOrgUnits.and.returnValue(of([]));
      connector.loadDefaultOrgUnitUid.and.returnValue(of(undefined));

      const action = new AuthActions.Login();
      actions$ = hot('-a', { a: action });

      effects.checkOrgUnitsOnLogin$.subscribe();

      expect(coordinator.allowRedirect).toHaveBeenCalled();
      expect(launchDialogService.openDialogAndSubscribe).not.toHaveBeenCalled();
    });

    it('should dispatch LoadUserOrgUnitsFail and call allowRedirect() on connector error', () => {
      connector.loadOrgUnits.and.returnValue(throwError(() => mockError));

      const action = new AuthActions.Login();
      const completion = new B2bUnitSelectionActions.LoadUserOrgUnitsFail(
        tryNormalizeHttpError(mockError, new MockLoggerService())
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.checkOrgUnitsOnLogin$).toBeObservable(expected);
    });

    it('should degrade gracefully when loadDefaultOrgUnitUid fails', () => {
      connector.loadDefaultOrgUnitUid.and.returnValue(throwError(() => mockError));

      const action = new AuthActions.Login();
      const completion = new B2bUnitSelectionActions.LoadUserOrgUnitsSuccess(mockUnits);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.checkOrgUnitsOnLogin$).toBeObservable(expected);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(null);
    });

    it('should return EMPTY and call allowRedirect() when feature is disabled', () => {
      TestBed.overrideProvider(B2bUnitSelectionConfig, {
        useValue: { b2bUnitSelection: { enabled: false } },
      });
      effects = TestBed.inject(B2bUnitSelectionEffects);

      const action = new AuthActions.Login();
      actions$ = hot('-a', { a: action });
      const expected = cold('-');

      expect(effects.checkOrgUnitsOnLogin$).toBeObservable(expected);
    });
  });

  // ── setDefaultOrgUnit$ ────────────────────────────────────────────────────

  describe('setDefaultOrgUnit$', () => {
    const payload = { userId: mockUserId, unitUid: 'Rustic Services' };

    it('should dispatch SetDefaultOrgUnitSuccess', () => {
      const action = new B2bUnitSelectionActions.SetDefaultOrgUnit(payload);
      const completion = new B2bUnitSelectionActions.SetDefaultOrgUnitSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.setDefaultOrgUnit$).toBeObservable(expected);
    });

    it('should refresh token, allow redirect, close dialog, and update state', () => {
      const action = new B2bUnitSelectionActions.SetDefaultOrgUnit(payload);
      actions$ = hot('-a', { a: action });

      effects.setDefaultOrgUnit$.subscribe();

      expect(oAuthLibWrapperService.refreshToken).toHaveBeenCalled();
      expect(coordinator.allowRedirect).toHaveBeenCalled();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('CONFIRMED');
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(payload.unitUid);
    });

    it('should navigate to home when redirectToHome is true', () => {
      const action = new B2bUnitSelectionActions.SetDefaultOrgUnit({
        ...payload,
        redirectToHome: true,
      });
      actions$ = hot('-a', { a: action });

      effects.setDefaultOrgUnit$.subscribe();

      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });

    it('should NOT navigate to home when redirectToHome is false/undefined', () => {
      const action = new B2bUnitSelectionActions.SetDefaultOrgUnit(payload);
      actions$ = hot('-a', { a: action });

      effects.setDefaultOrgUnit$.subscribe();

      expect(routingService.go).not.toHaveBeenCalled();
    });

    it('should dispatch SetDefaultOrgUnitFail on connector error', () => {
      connector.setDefaultOrgUnit.and.returnValue(throwError(() => mockError));

      const action = new B2bUnitSelectionActions.SetDefaultOrgUnit(payload);
      const completion = new B2bUnitSelectionActions.SetDefaultOrgUnitFail(
        tryNormalizeHttpError(mockError, new MockLoggerService())
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.setDefaultOrgUnit$).toBeObservable(expected);
    });
  });

  // ── clearOnLogout$ ────────────────────────────────────────────────────────

  describe('clearOnLogout$', () => {
    it('should clear state service on LOGOUT', () => {
      const action = new AuthActions.Logout();
      actions$ = hot('-a', { a: action });

      effects.clearOnLogout$.subscribe();

      expect(stateService.setOrgUnits).toHaveBeenCalledWith([]);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(null);
    });
  });
});
