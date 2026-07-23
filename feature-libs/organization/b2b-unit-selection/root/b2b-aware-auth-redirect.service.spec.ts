/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  AuthFlowRoutesService,
  AuthRedirectService,
  AuthRedirectStorageService,
  FeatureToggles,
  RoutingService,
} from '@spartacus/core';
import { Router } from '@angular/router';
import { SiteContextUrlSerializer } from '@spartacus/core';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';
import { B2bAwareAuthRedirectService } from './b2b-aware-auth-redirect.service';

describe('B2bAwareAuthRedirectService', () => {
  let service: B2bAwareAuthRedirectService;
  let coordinator: jasmine.SpyObj<B2bRedirectCoordinator>;

  beforeEach(() => {
    coordinator = jasmine.createSpyObj('B2bRedirectCoordinator', [
      'isBlocked',
      'whenAllowed$',
    ]);

    TestBed.configureTestingModule({
      providers: [
        B2bAwareAuthRedirectService,
        { provide: B2bRedirectCoordinator, useValue: coordinator },
        { provide: RoutingService, useValue: { go: jasmine.createSpy() } },
        // Router.events must be an Observable so AuthRedirectService.init() doesn't crash.
        { provide: Router, useValue: { events: EMPTY } },
        {
          provide: AuthRedirectStorageService,
          useValue: { getRedirectUrl: () => undefined, setRedirectUrl: () => {} },
        },
        {
          provide: AuthFlowRoutesService,
          useValue: { isAuthFlow: () => false },
        },
        {
          provide: SiteContextUrlSerializer,
          useValue: {},
        },
        {
          provide: FeatureToggles,
          useValue: {},
        },
      ],
    });

    service = TestBed.inject(B2bAwareAuthRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('redirect()', () => {
    it('should call super.redirect() immediately when not blocked', () => {
      coordinator.isBlocked.and.returnValue(false);
      const superSpy = spyOn(
        AuthRedirectService.prototype,
        'redirect'
      ).and.callFake(() => {});

      service.redirect();

      expect(superSpy).toHaveBeenCalledTimes(1);
    });

    it('should NOT call super.redirect() immediately when blocked', () => {
      const deferred$ = new BehaviorSubject<boolean>(false);
      coordinator.isBlocked.and.returnValue(true);
      coordinator.whenAllowed$.and.returnValue(
        deferred$.asObservable() as Observable<boolean>
      );
      const superSpy = spyOn(
        AuthRedirectService.prototype,
        'redirect'
      ).and.callFake(() => {});

      service.redirect();

      expect(superSpy).not.toHaveBeenCalled();
    });

    it('should call super.redirect() once whenAllowed$ emits', () => {
      const deferred$ = new BehaviorSubject<boolean>(false);
      coordinator.isBlocked.and.returnValue(true);
      coordinator.whenAllowed$.and.returnValue(
        deferred$.asObservable() as Observable<boolean>
      );
      const superSpy = spyOn(
        AuthRedirectService.prototype,
        'redirect'
      ).and.callFake(() => {});

      service.redirect();
      expect(superSpy).not.toHaveBeenCalled();

      deferred$.next(true);
      expect(superSpy).toHaveBeenCalledTimes(1);
    });
  });
});
