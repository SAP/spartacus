/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApplicationRef, ComponentRef } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import {
  B2BUnit,
  EventService,
  LoggerService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  B2bUnitSelectionConfig,
  B2bUnitSwitchedEvent,
  B2bUnitSwitchFailedEvent,
} from '@spartacus/organization/b2b-unit-selection/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { B2bUnitSelectionConnector } from '../connectors/b2b-unit-selection.connector';
import { B2bUnitSelectorStateService } from './b2b-unit-selector-state.service';
import { B2bUnitSelectionService } from './b2b-unit-selection.service';
import createSpy = jasmine.createSpy;

const mockUnits: B2BUnit[] = [
  { uid: 'unit-1', name: 'Rustic' },
  { uid: 'unit-2', name: 'Rustic Services' },
];
const mockUserId = 'current';
const mockDefaultUnitName = 'Rustic';

class MockUserIdService {
  private userId$ = new BehaviorSubject<string>(OCC_USER_ID_ANONYMOUS);
  getUserId = createSpy('getUserId').and.callFake(() => this.userId$);
  setUserId(id: string): void {
    this.userId$.next(id);
  }
}

class MockB2bUnitSelectionConnector {
  loadOrgUnits = createSpy('loadOrgUnits').and.returnValue(of(mockUnits));
  loadDefaultOrgUnitName = createSpy('loadDefaultOrgUnitName').and.returnValue(
    of(mockDefaultUnitName)
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

class MockEventService {
  dispatch = createSpy('dispatch');
}

class MockLoggerService {
  error = createSpy('error');
  warn = createSpy('warn');
}

/**
 * Mock WindowRef: proxies sessionStorage to the real window.sessionStorage
 * so session-flag tests work, but stubs location.reload/assign to prevent
 * real browser page reloads during Karma tests.
 */
class MockWindowRef {
  nativeWindow = {
    location: {
      reload: createSpy('reload'),
      assign: createSpy('assign'),
    },
  };

  get sessionStorage(): Storage {
    return window.sessionStorage;
  }
}

describe('B2bUnitSelectionService', () => {
  let service: B2bUnitSelectionService;
  let userIdService: MockUserIdService;
  let connector: MockB2bUnitSelectionConnector;
  let stateService: MockB2bUnitSelectorStateService;
  let launchDialogService: MockLaunchDialogService;
  let eventService: MockEventService;

  function createService(
    enabled = true,
    mockComponents: ComponentRef<any>[] = [{}] as any
  ): void {
    TestBed.configureTestingModule({
      providers: [
        B2bUnitSelectionService,
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: B2bUnitSelectionConnector,
          useClass: MockB2bUnitSelectionConnector,
        },
        {
          provide: B2bUnitSelectorStateService,
          useClass: MockB2bUnitSelectorStateService,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: EventService, useClass: MockEventService },
        { provide: LoggerService, useClass: MockLoggerService },
        {
          provide: B2bUnitSelectionConfig,
          useValue: { b2bUnitSelection: { enabled } },
        },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });

    service = TestBed.inject(B2bUnitSelectionService);
    userIdService = TestBed.inject(UserIdService) as any;
    connector = TestBed.inject(B2bUnitSelectionConnector) as any;
    stateService = TestBed.inject(B2bUnitSelectorStateService) as any;
    launchDialogService = TestBed.inject(LaunchDialogService) as any;
    eventService = TestBed.inject(EventService) as any;

    // Override `components` on the real ApplicationRef instead of replacing
    // the whole service. Replacing ApplicationRef with a bare object breaks
    // Angular internals (ChangeDetectionSchedulerImpl) that access properties
    // our mock does not provide.
    (TestBed.inject(ApplicationRef) as any).components = mockComponents;
  }

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  // ── constructor / feature flag ──────────────────────────────────────────

  describe('constructor', () => {
    it('should be created', () => {
      createService();
      expect(service).toBeTruthy();
    });

    it('should NOT subscribe to userId changes when feature is disabled', () => {
      createService(false);
      // Force a login-like emission
      (userIdService as any).setUserId(mockUserId);

      expect(connector.loadOrgUnits).not.toHaveBeenCalled();
    });

    it('should subscribe to userId changes when feature is enabled', () => {
      createService(true);
      (userIdService as any).setUserId(mockUserId);

      expect(connector.loadOrgUnits).toHaveBeenCalledWith(mockUserId);
    });
  });

  // ── subscribeToUserIdChanges – logout ───────────────────────────────────

  describe('subscribeToUserIdChanges() – logout path', () => {
    beforeEach(() => createService());

    it('should clear state when userId is anonymous', () => {
      // Already anonymous from initial BehaviorSubject value.
      expect(stateService.setOrgUnits).toHaveBeenCalledWith([]);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(null);
    });

    it('should clear state when userId becomes anonymous after login', () => {
      (userIdService as any).setUserId(mockUserId);
      stateService.setOrgUnits.calls.reset();
      stateService.setActiveUnit.calls.reset();

      (userIdService as any).setUserId(OCC_USER_ID_ANONYMOUS);

      expect(stateService.setOrgUnits).toHaveBeenCalledWith([]);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(null);
    });

    it('should clear state when userId becomes empty string', () => {
      (userIdService as any).setUserId(mockUserId);
      stateService.setOrgUnits.calls.reset();
      stateService.setActiveUnit.calls.reset();

      (userIdService as any).setUserId('');

      expect(stateService.setOrgUnits).toHaveBeenCalledWith([]);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(null);
    });

    it('should NOT load org units for anonymous userId', () => {
      expect(connector.loadOrgUnits).not.toHaveBeenCalled();
    });
  });

  // ── subscribeToUserIdChanges – login ────────────────────────────────────

  describe('subscribeToUserIdChanges() – login path', () => {
    beforeEach(() => createService());

    it('should call loadOrgUnits and loadDefaultOrgUnitName with userId', () => {
      (userIdService as any).setUserId(mockUserId);

      expect(connector.loadOrgUnits).toHaveBeenCalledWith(mockUserId);
      expect(connector.loadDefaultOrgUnitName).toHaveBeenCalledWith(mockUserId);
    });

    it('should populate state with loaded org units and default unit name', () => {
      (userIdService as any).setUserId(mockUserId);

      expect(stateService.setOrgUnits).toHaveBeenCalledWith(mockUnits);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(
        mockDefaultUnitName
      );
    });

    it('should fall back to null activeUnit when loadDefaultOrgUnitName errors', () => {
      connector.loadDefaultOrgUnitName.and.returnValue(
        throwError(() => new HttpErrorResponse({ status: 500 }))
      );

      (userIdService as any).setUserId(mockUserId);

      expect(stateService.setActiveUnit).toHaveBeenCalledWith(null);
    });

    it('should NOT duplicate reactions when userId emits same value twice (distinctUntilChanged)', () => {
      (userIdService as any).setUserId(mockUserId);
      connector.loadOrgUnits.calls.reset();

      // Same value again — should be swallowed by distinctUntilChanged.
      (userIdService as any).setUserId(mockUserId);

      expect(connector.loadOrgUnits).not.toHaveBeenCalled();
    });

    it('should log error and continue when loadOrgUnits errors', () => {
      const loggerService = TestBed.inject(LoggerService) as any;
      // Provide a proper error body so tryNormalizeHttpError does not throw
      // before logger.error is reached.
      connector.loadOrgUnits.and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              status: 500,
              error: { message: 'Server Error' },
            })
        )
      );

      (userIdService as any).setUserId(mockUserId);

      expect(loggerService.error).toHaveBeenCalled();
      // Stream should still be alive after error (handled via catchError → of(null)).
    });

    it('should NOT open dialog when orgUnits is empty', fakeAsync(() => {
      connector.loadOrgUnits.and.returnValue(of([]));

      (userIdService as any).setUserId(mockUserId);
      tick(100);

      expect(launchDialogService.openDialogAndSubscribe).not.toHaveBeenCalled();
    }));

    it('should NOT open dialog when orgUnits has only one unit', fakeAsync(() => {
      connector.loadOrgUnits.and.returnValue(of([mockUnits[0]]));

      (userIdService as any).setUserId(mockUserId);
      tick(100);

      expect(launchDialogService.openDialogAndSubscribe).not.toHaveBeenCalled();
    }));
  });

  // ── openDialogWhenReady ─────────────────────────────────────────────────

  describe('openDialogWhenReady()', () => {
    it('should open dialog when ApplicationRef has components', fakeAsync(() => {
      // AppComponent already present (mockComponents = [{}]).
      createService(true, [{}] as any);
      (userIdService as any).setUserId(mockUserId);

      // Advance past the 50 ms polling interval.
      tick(100);

      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
        (LAUNCH_CALLER as any)['B2B_UNIT_SELECTION'],
        undefined,
        jasmine.objectContaining({
          orgUnits: mockUnits,
          defaultUnitName: mockDefaultUnitName,
          onConfirm: jasmine.any(Function),
        })
      );
    }));

    it('should open dialog after timeout when AppComponent never mounts', fakeAsync(() => {
      // No components mounted.
      createService(true, [] as any);
      (userIdService as any).setUserId(mockUserId);

      // Advance past STABLE_TIMEOUT_MS (10 000 ms).
      tick(10_001);

      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    }));

    it('should NOT open dialog when sessionStorage flag is set', fakeAsync(() => {
      createService(true, [{}] as any);
      const windowRef = TestBed.inject(WindowRef);
      windowRef.sessionStorage?.setItem('cx-b2b-unit-selected', 'true');

      (userIdService as any).setUserId(mockUserId);
      tick(100);

      expect(launchDialogService.openDialogAndSubscribe).not.toHaveBeenCalled();
      windowRef.sessionStorage?.removeItem('cx-b2b-unit-selected');
    }));
  });

  // ── setDefaultUnit ──────────────────────────────────────────────────────

  describe('setDefaultUnit()', () => {
    beforeEach(() => createService());

    it('should call connector.setDefaultOrgUnit with userId and unitName', () => {
      service.setDefaultUnit(mockUserId, mockDefaultUnitName);

      expect(connector.setDefaultOrgUnit).toHaveBeenCalledWith(
        mockUserId,
        mockDefaultUnitName
      );
    });

    it('should close dialog on success', () => {
      service.setDefaultUnit(mockUserId, mockDefaultUnitName);

      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('CONFIRMED');
    });

    it('should set sessionStorage confirmed flag on success', () => {
      const windowRef = TestBed.inject(WindowRef);
      service.setDefaultUnit(mockUserId, mockDefaultUnitName);

      expect(windowRef.sessionStorage?.getItem('cx-b2b-unit-selected')).toBe(
        'true'
      );
      windowRef.sessionStorage?.removeItem('cx-b2b-unit-selected');
    });

    it('should update active unit in state on success', () => {
      stateService.setActiveUnit.calls.reset();
      service.setDefaultUnit(mockUserId, mockDefaultUnitName);

      expect(stateService.setActiveUnit).toHaveBeenCalledWith(
        mockDefaultUnitName
      );
    });

    it('should dispatch B2bUnitSwitchedEvent on success (redirectToHome=false by default)', () => {
      service.setDefaultUnit(mockUserId, mockDefaultUnitName);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          unitName: mockDefaultUnitName,
          redirectedToHome: false,
        },
        B2bUnitSwitchedEvent
      );
    });

    it('should dispatch B2bUnitSwitchedEvent with redirectedToHome=true when redirectToHome=true', () => {
      service.setDefaultUnit(mockUserId, mockDefaultUnitName, true);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          unitName: mockDefaultUnitName,
          redirectedToHome: true,
        },
        B2bUnitSwitchedEvent
      );
    });

    it('should dispatch B2bUnitSwitchFailedEvent on error', () => {
      connector.setDefaultOrgUnit.and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              status: 400,
              error: { message: 'Bad Request' },
            })
        )
      );

      service.setDefaultUnit(mockUserId, mockDefaultUnitName);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        jasmine.objectContaining({
          userId: mockUserId,
          unitName: mockDefaultUnitName,
        }),
        B2bUnitSwitchFailedEvent
      );
    });

    it('should NOT dispatch B2bUnitSwitchedEvent on error', () => {
      connector.setDefaultOrgUnit.and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              status: 400,
              error: { message: 'Bad Request' },
            })
        )
      );

      service.setDefaultUnit(mockUserId, mockDefaultUnitName);

      expect(eventService.dispatch).not.toHaveBeenCalledWith(
        jasmine.anything(),
        B2bUnitSwitchedEvent
      );
    });
  });
});
