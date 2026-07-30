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
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  AuthActions,
  B2BUnit,
  LoggerService,
  UserIdService,
  WindowRef,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
// Side-effect import: ensures the LAUNCH_CALLER runtime assignment runs before tests.
import '../../../root/model/augmented-core.model';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable, of, Subject, throwError } from 'rxjs';
import { B2bUnitSelectionConfig } from '../../../root/config/b2b-unit-selection.config';
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
  loadDefaultOrgUnitName = createSpy('loadDefaultOrgUnitName').and.returnValue(
    of(mockDefaultUid)
  );
  setDefaultOrgUnit = createSpy('setDefaultOrgUnit').and.returnValue(
    of(void 0)
  );
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

class MockWindowRef {
  nativeWindow = {
    location: {
      assign: createSpy('assign'),
      reload: createSpy('reload'),
    },
  };
}

describe('B2bUnitSelectionEffects', () => {
  let effects: B2bUnitSelectionEffects;
  let connector: MockB2bUnitSelectionConnector;
  let stateService: MockB2bUnitSelectorStateService;
  let launchDialogService: MockLaunchDialogService;
  let windowRef: MockWindowRef;
  let actions$: Observable<Action>;
  let applicationRef: any;

  beforeEach(() => {
    applicationRef = {
      // Simulate AppComponent already mounted (manual ROPC login).
      components: [{}],
      // Required by Angular's ChangeDetectionSchedulerImpl (Angular 18+):
      // - isStable: used by older internal code paths
      // - afterTick: Subject subscribed to in the constructor
      // - _tick: called by fakeAsync zone integration to trigger change detection
      isStable: of(true),
      afterTick: new Subject<void>(),
      _tick: () => {},
    };

    TestBed.configureTestingModule({
      providers: [
        B2bUnitSelectionEffects,
        {
          provide: B2bUnitSelectionConnector,
          useClass: MockB2bUnitSelectionConnector,
        },
        {
          provide: B2bUnitSelectorStateService,
          useClass: MockB2bUnitSelectorStateService,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: WindowRef, useClass: MockWindowRef },
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
    windowRef = TestBed.inject(WindowRef) as any;
  });

  // ── checkOrgUnitsOnLogin$ ─────────────────────────────────────────────────

  describe('checkOrgUnitsOnLogin$', () => {
    it('should dispatch LoadUserOrgUnitsSuccess on successful login with multiple units', () => {
      const action = new AuthActions.Login();
      const completion = new B2bUnitSelectionActions.LoadUserOrgUnitsSuccess(
        mockUnits
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.checkOrgUnitsOnLogin$).toBeObservable(expected);
    });

    it('should write units and active unit to the state service', () => {
      const action = new AuthActions.Login();
      actions$ = hot('-a', { a: action });

      effects.checkOrgUnitsOnLogin$.subscribe();
      getTestScheduler().flush();

      expect(stateService.setOrgUnits).toHaveBeenCalledWith(mockUnits);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(mockDefaultUid);
    });

    it('should open the dialog when orgUnits.length > 0', () => {
      const action = new AuthActions.Login();
      actions$ = hot('-a', { a: action });

      effects.checkOrgUnitsOnLogin$.subscribe();
      getTestScheduler().flush();

      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
        (LAUNCH_CALLER as any)['B2B_UNIT_SELECTION'],
        undefined,
        { orgUnits: mockUnits, defaultUnitName: mockDefaultUid }
      );
    });

    it('should NOT open the dialog when orgUnits is empty', () => {
      connector.loadOrgUnits.and.returnValue(of([]));
      connector.loadDefaultOrgUnitName.and.returnValue(of(undefined));

      const action = new AuthActions.Login();
      actions$ = hot('-a', { a: action });

      effects.checkOrgUnitsOnLogin$.subscribe();
      getTestScheduler().flush();

      expect(launchDialogService.openDialogAndSubscribe).not.toHaveBeenCalled();
    });

    it('should dispatch LoadUserOrgUnitsFail on connector error', () => {
      connector.loadOrgUnits.and.returnValue(throwError(() => mockError));

      const action = new AuthActions.Login();
      const completion = new B2bUnitSelectionActions.LoadUserOrgUnitsFail(
        tryNormalizeHttpError(mockError, new MockLoggerService())
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.checkOrgUnitsOnLogin$).toBeObservable(expected);
    });

    it('should degrade gracefully when loadDefaultOrgUnitName fails', () => {
      connector.loadDefaultOrgUnitName.and.returnValue(
        throwError(() => mockError)
      );

      const action = new AuthActions.Login();
      const completion = new B2bUnitSelectionActions.LoadUserOrgUnitsSuccess(
        mockUnits
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.checkOrgUnitsOnLogin$).toBeObservable(expected);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(null);
    });

    it('should open the dialog via polling when AppComponent is not yet mounted (OAuth flow)', fakeAsync(() => {
      // Simulate OAuth / page-refresh: components array is empty on LOGIN.
      applicationRef.components = [];

      const action = new AuthActions.Login();
      actions$ = hot('-a', { a: action });

      effects.checkOrgUnitsOnLogin$.subscribe();
      getTestScheduler().flush();

      // Dialog not yet opened — AppComponent not mounted.
      expect(launchDialogService.openDialogAndSubscribe).not.toHaveBeenCalled();

      // AppComponent mounts → next polling tick opens the dialog.
      applicationRef.components = [{}];
      tick(51); // advance past the 50 ms polling interval

      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    }));

    it('should still open dialog via timer fallback when AppComponent never mounts', fakeAsync(() => {
      // Simulate OAuth / page-refresh: components array is empty on LOGIN.
      applicationRef.components = [];
      // AppComponent never mounts — components stays empty.

      const action = new AuthActions.Login();
      actions$ = hot('-a', { a: action });

      effects.checkOrgUnitsOnLogin$.subscribe();
      getTestScheduler().flush();

      // Fast-forward past STABLE_TIMEOUT_MS so the timer fallback fires.
      tick((effects as any).STABLE_TIMEOUT_MS + 1);

      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    }));
  });

  // ── setDefaultOrgUnit$ ────────────────────────────────────────────────────

  describe('setDefaultOrgUnit$', () => {
    const payload = { userId: mockUserId, unitName: 'Rustic Services' };

    it('should dispatch SetDefaultOrgUnitSuccess', () => {
      const action = new B2bUnitSelectionActions.SetDefaultOrgUnit(payload);
      const completion = new B2bUnitSelectionActions.SetDefaultOrgUnitSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.setDefaultOrgUnit$).toBeObservable(expected);
    });

    it('should close dialog and update state', () => {
      const action = new B2bUnitSelectionActions.SetDefaultOrgUnit(payload);
      actions$ = hot('-a', { a: action });

      effects.setDefaultOrgUnit$.subscribe();
      getTestScheduler().flush();

      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('CONFIRMED');
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(payload.unitName);
    });

    it('should call location.reload() when redirectToHome is false (dialog confirmation)', () => {
      const action = new B2bUnitSelectionActions.SetDefaultOrgUnit(payload);
      actions$ = hot('-a', { a: action });

      effects.setDefaultOrgUnit$.subscribe();
      getTestScheduler().flush();

      expect(windowRef.nativeWindow.location.reload).toHaveBeenCalled();
      expect(windowRef.nativeWindow.location.assign).not.toHaveBeenCalled();
    });

    it('should call location.assign("/") when redirectToHome is true (header selector)', () => {
      const action = new B2bUnitSelectionActions.SetDefaultOrgUnit({
        ...payload,
        redirectToHome: true,
      });
      actions$ = hot('-a', { a: action });

      effects.setDefaultOrgUnit$.subscribe();
      getTestScheduler().flush();

      expect(windowRef.nativeWindow.location.assign).toHaveBeenCalledWith('/');
      expect(windowRef.nativeWindow.location.reload).not.toHaveBeenCalled();
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
      getTestScheduler().flush();

      expect(stateService.setOrgUnits).toHaveBeenCalledWith([]);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(null);
    });
  });
});

// ── B2bUnitSelectionEffects (feature disabled) ────────────────────────────
// Isolated top-level describe so TestBed can be freshly configured without
// interference from the parent describe's beforeEach which calls inject().

describe('B2bUnitSelectionEffects (feature disabled)', () => {
  let effects: B2bUnitSelectionEffects;
  let actions$: Observable<Action>;

  beforeEach(() => {
    const appRef: any = {
      components: [{}],
      // Required by Angular's ChangeDetectionSchedulerImpl (Angular 18+):
      // - isStable: used by older internal code paths
      // - afterTick: Subject subscribed to in the constructor
      isStable: of(true),
      afterTick: new Subject<void>(),
    };

    TestBed.configureTestingModule({
      providers: [
        B2bUnitSelectionEffects,
        {
          provide: B2bUnitSelectionConnector,
          useClass: MockB2bUnitSelectionConnector,
        },
        {
          provide: B2bUnitSelectorStateService,
          useClass: MockB2bUnitSelectorStateService,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: ApplicationRef, useValue: appRef },
        { provide: LoggerService, useClass: MockLoggerService },
        {
          provide: B2bUnitSelectionConfig,
          useValue: { b2bUnitSelection: { enabled: false } },
        },
        provideMockActions(() => actions$),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    effects = TestBed.inject(B2bUnitSelectionEffects);
  });

  it('checkOrgUnitsOnLogin$ should return EMPTY when the feature is disabled', () => {
    const action = new AuthActions.Login();
    actions$ = hot('-a', { a: action });
    const expected = cold('|');

    expect(effects.checkOrgUnitsOnLogin$).toBeObservable(expected);
  });

  it('setDefaultOrgUnit$ should return EMPTY when the feature is disabled', () => {
    const action = new B2bUnitSelectionActions.SetDefaultOrgUnit({
      userId: 'current',
      unitName: 'Rustic',
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('|');

    expect(effects.setDefaultOrgUnit$).toBeObservable(expected);
  });

  it('clearOnLogout$ should return EMPTY when the feature is disabled', () => {
    const action = new AuthActions.Logout();
    actions$ = hot('-a', { a: action });
    const expected = cold('|');

    expect(effects.clearOnLogout$).toBeObservable(expected);
  });
});
