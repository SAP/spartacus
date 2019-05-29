import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { hot, cold } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, Observable } from 'rxjs';

import * as fromEffects from './base-site.effect';
import * as fromActions from '../actions/base-site.action';
import { OccModule } from '../../../occ/occ.module';
import { ConfigModule } from '../../../config/config.module';
import { BaseSite } from '../../../model/misc.model';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteAdapter } from '../../connectors/site.adapter';

describe('BaseSite Effects', () => {
  let actions$: Observable<fromActions.BaseSiteAction>;
  let connector: SiteConnector;
  let effects: fromEffects.BaseSiteEffects;

  const baseSite: BaseSite = { uid: 'test-site' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, OccModule],
      providers: [
        fromEffects.BaseSiteEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    connector = TestBed.get(SiteConnector);
    effects = TestBed.get(fromEffects.BaseSiteEffects);

    spyOn(connector, 'getBaseSite').and.returnValue(of(baseSite));
  });

  describe('loadBaseSite$', () => {
    it('should populate base site details data', () => {
      const action = new fromActions.LoadBaseSite();
      const completion = new fromActions.LoadBaseSiteSuccess(baseSite);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadBaseSite$).toBeObservable(expected);
    });
  });
});
