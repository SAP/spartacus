/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';
import { createB2bRedirectPatcher } from './b2b-redirect-patcher';

describe('createB2bRedirectPatcher', () => {
  let router: any;
  let coordinator: jasmine.SpyObj<B2bRedirectCoordinator>;
  let appRef: Partial<ApplicationRef>;
  let originalScheduleNavigation: jasmine.Spy;
  let whenAllowed$: BehaviorSubject<boolean>;

  const rawUrl = {} as any;
  const source = 'imperative' as any;
  const restoredState = null as any;
  const extras = {} as any;

  beforeEach(() => {
    originalScheduleNavigation = jasmine
      .createSpy('scheduleNavigation')
      .and.returnValue(Promise.resolve(true));

    whenAllowed$ = new BehaviorSubject<boolean>(true);

    coordinator = jasmine.createSpyObj('B2bRedirectCoordinator', [
      'isBlocked',
      'whenAllowed$',
    ]);
    coordinator.whenAllowed$.and.returnValue(
      whenAllowed$.asObservable() as Observable<boolean>
    );

    router = { scheduleNavigation: originalScheduleNavigation };
    appRef = { components: [] as any[] };

    TestBed.configureTestingModule({});
  });

  function patch(): void {
    createB2bRedirectPatcher(router as Router, coordinator, appRef as ApplicationRef)();
  }

  describe('when not blocked', () => {
    beforeEach(() => {
      coordinator.isBlocked.and.returnValue(false);
    });

    it('should call originalScheduleNavigation immediately', () => {
      patch();
      router.scheduleNavigation(rawUrl, source, restoredState, extras);
      expect(originalScheduleNavigation).toHaveBeenCalledWith(
        rawUrl,
        source,
        restoredState,
        extras,
        undefined
      );
    });
  });

  describe('when blocked but AppComponent not yet mounted (token restore)', () => {
    beforeEach(() => {
      coordinator.isBlocked.and.returnValue(true);
      (appRef as any).components = [];
    });

    it('should call originalScheduleNavigation immediately (page-refresh path)', () => {
      patch();
      router.scheduleNavigation(rawUrl, source, restoredState, extras);
      expect(originalScheduleNavigation).toHaveBeenCalledWith(
        rawUrl,
        source,
        restoredState,
        extras,
        undefined
      );
    });
  });

  describe('when blocked and AppComponent is mounted (interactive login)', () => {
    beforeEach(() => {
      coordinator.isBlocked.and.returnValue(true);
      (appRef as any).components = [{}]; // AppComponent mounted
    });

    it('should NOT call originalScheduleNavigation immediately', () => {
      patch();
      router.scheduleNavigation(rawUrl, source, restoredState, extras);
      expect(originalScheduleNavigation).not.toHaveBeenCalled();
    });

    it('should return Promise.resolve(false)', async () => {
      patch();
      const result = await router.scheduleNavigation(
        rawUrl,
        source,
        restoredState,
        extras
      );
      expect(result).toBeFalse();
    });

    it('should call originalScheduleNavigation after whenAllowed$ emits', () => {
      const deferred$ = new BehaviorSubject<boolean>(false);
      coordinator.whenAllowed$.and.returnValue(
        deferred$.asObservable() as Observable<boolean>
      );

      patch();
      router.scheduleNavigation(rawUrl, source, restoredState, extras);
      expect(originalScheduleNavigation).not.toHaveBeenCalled();

      deferred$.next(true);
      expect(originalScheduleNavigation).toHaveBeenCalledWith(
        rawUrl,
        source,
        restoredState,
        extras,
        undefined
      );
    });
  });
});
