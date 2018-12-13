import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as fromActions from './../actions';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';
import { RegionsEffects } from './regions.effect';
import { RegionList } from '../../../occ/occ-models';

class MockMiscsService {
  loadRegions(_countryIsoCode: string): Observable<any> {
    return;
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
});
