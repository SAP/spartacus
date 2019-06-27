import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Region } from '../../../model/index';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { StateLoaderActions } from '../../../state/index';
import * as fromActions from '../actions/index';
import { REGIONS } from '../user-state';
import { RegionsEffects } from './regions.effect';

const mockRegions: Region[] = [
  {
    isocode: 'CA-ON',
    name: 'Ontarion',
  },
  {
    isocode: 'CA-QC',
    name: 'Quebec',
  },
];

const country = 'CA';

describe('', () => {
  let service: SiteConnector;
  let effect: RegionsEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegionsEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(RegionsEffects);
    service = TestBed.get(SiteConnector);

    spyOn(service, 'getRegions').and.returnValue(of(mockRegions));
  });

  describe('loadRegions$', () => {
    it('should load regions', () => {
      const action = new fromActions.LoadRegions('CA');
      const completion = new fromActions.LoadRegionsSuccess({
        entities: mockRegions,
        country,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadRegions$).toBeObservable(expected);
    });
  });

  describe('resetRegions$', () => {
    it('should return a reset action', () => {
      const action: Action = {
        type: fromActions.CLEAR_MISCS_DATA,
      };

      const completion = new StateLoaderActions.LoaderResetAction(REGIONS);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.resetRegions$).toBeObservable(expected);
    });
  });
});
