import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { RegionList } from '../../../occ/occ-models';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';

import { RegionsEffects } from './regions.effect';

class MockMiscsService {
  loadRegions(_countryIsoCode: string): Observable<RegionList> {
    return of();
  }
}

const mockRegionsList: RegionList = {
  regions: [
    {
      isocode: 'CA-ON',
      name: 'Ontarion'
    },
    {
      isocode: 'CA-QC',
      name: 'Quebec'
    }
  ]
};

describe('', () => {
  let service: OccMiscsService;
  let effect: RegionsEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegionsEffects,
        { provide: OccMiscsService, useClass: MockMiscsService },
        provideMockActions(() => actions$)
      ]
    });

    effect = TestBed.get(RegionsEffects);
    service = TestBed.get(OccMiscsService);

    spyOn(service, 'loadRegions').and.returnValue(of(mockRegionsList));
  });

  describe('loadRegions$', () => {
    it('should load regions', () => {
      const action = new fromActions.LoadRegions('CA');
      const completion = new fromActions.LoadRegionsSuccess(
        mockRegionsList.regions
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadRegions$).toBeObservable(expected);
    });
  });

  describe('resetRegions$', () => {
    it('should return a reset action', () => {
      const action: Action = {
        type: '[Site-context] Language Change'
      };

      const completion = new fromActions.ResetRegions();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.resetRegions$).toBeObservable(expected);
    });
  });
});
