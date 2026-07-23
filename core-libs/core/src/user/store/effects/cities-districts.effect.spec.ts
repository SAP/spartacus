/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { StateUtils } from '../../../state/utils/index';
import { UserActions } from '../actions/index';
import { CITIES, DISTRICTS } from '../user-state';
import { CitiesDistrictsEffects } from './cities-districts.effect';

const mockCities = [
  { isocode: 'CN-1101', name: 'Beijing' },
  { isocode: 'CN-1102', name: 'Tianjin' },
];

const mockDistricts = [
  { isocode: 'CN-110101', name: 'Dongcheng' },
  { isocode: 'CN-110102', name: 'Xicheng' },
];

const regionIsocode = 'CN-11';
const cityIsocode = 'CN-1101';

describe('CitiesDistrictsEffects', () => {
  let service: SiteConnector;
  let effect: CitiesDistrictsEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CitiesDistrictsEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(CitiesDistrictsEffects);
    service = TestBed.inject(SiteConnector);

    spyOn(service, 'getCities').and.returnValue(of(mockCities));
    spyOn(service, 'getDistricts').and.returnValue(of(mockDistricts));
  });

  describe('loadCities$', () => {
    it('should load cities', () => {
      const action = new UserActions.LoadCities(regionIsocode);
      const completion = new UserActions.LoadCitiesSuccess({
        entities: mockCities,
        regionIsocode,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadCities$).toBeObservable(expected);
    });
  });

  describe('resetCities$', () => {
    it('should return a reset action', () => {
      const action: Action = { type: UserActions.CLEAR_CITIES };
      const completion = new StateUtils.LoaderResetAction(CITIES);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.resetCities$).toBeObservable(expected);
    });
  });

  describe('loadDistricts$', () => {
    it('should load districts', () => {
      const action = new UserActions.LoadDistricts(cityIsocode);
      const completion = new UserActions.LoadDistrictsSuccess({
        entities: mockDistricts,
        cityIsocode,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadDistricts$).toBeObservable(expected);
    });
  });

  describe('resetDistricts$', () => {
    it('should return a reset action', () => {
      const action: Action = { type: UserActions.CLEAR_DISTRICTS };
      const completion = new StateUtils.LoaderResetAction(DISTRICTS);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.resetDistricts$).toBeObservable(expected);
    });
  });
});
