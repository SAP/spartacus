import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfigModule } from '../../../config/config.module';
import { BaseSite } from '../../../model/misc.model';
import { BaseOccModule } from '../../../occ/base-occ.module';
import { SiteAdapter } from '../../connectors/site.adapter';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import * as fromEffects from './base-site.effect';

describe('BaseSite Effects', () => {
  let actions$: Observable<SiteContextActions.BaseSiteAction>;
  let connector: SiteConnector;
  let effects: fromEffects.BaseSiteEffects;

  const baseSite: BaseSite = { uid: 'test-site' };
  const baseSites: BaseSite[] = [{ uid: 'test-site' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(), HttpClientTestingModule, BaseOccModule],
      providers: [
        fromEffects.BaseSiteEffects,
        { provide: SiteAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    connector = TestBed.inject(SiteConnector);
    effects = TestBed.inject(fromEffects.BaseSiteEffects);

    spyOn(connector, 'getBaseSite').and.returnValue(of(baseSite));
    spyOn(connector, 'getBaseSites').and.returnValue(of([baseSite]));
  });

  describe('loadBaseSite$', () => {
    it('should populate base site details data', () => {
      const action = new SiteContextActions.LoadBaseSite();
      const completion = new SiteContextActions.LoadBaseSiteSuccess(baseSite);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadBaseSite$).toBeObservable(expected);
    });
  });

  describe('loadBaseSites$', () => {
    it('should populate all base site data', () => {
      const action = new SiteContextActions.LoadBaseSites();
      const completion = new SiteContextActions.LoadBaseSitesSuccess(baseSites);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadBaseSites$).toBeObservable(expected);
    });
  });
});
