import { TestBed } from '@angular/core/testing';

import { BaseSiteService } from './base-site.service';
import { OccConfig, StateWithSiteContext } from '@spartacus/core';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SiteContextStoreModule } from '../store/site-context-store.module';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import * as fromStore from '../store';

describe('BaseSiteService', () => {
  let service: BaseSiteService;
  const mockBaseSite = 'mock-base-site';
  const mockBaseSiteSelect = createSpy('select').and.returnValue(() =>
    of(mockBaseSite)
  );
  let store: Store<StateWithSiteContext>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteContextStoreModule,
      ],
      providers: [
        BaseSiteService,
        {
          provide: OccConfig,
          useValue: {},
        },
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(BaseSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getActive should return active baseSite', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockBaseSiteSelect);

    let result;
    service.getActive().subscribe(res => (result = res));

    expect(result).toEqual(mockBaseSite);
  });

  it('getAll should return active baseSite', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockBaseSiteSelect);

    let result;
    service.getAll().subscribe(res => (result = res));
    expect(result).toEqual([mockBaseSite]);
  });

  describe('setActive', () => {
    it('should dispatch SetActiveBaseSite action', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(mockBaseSiteSelect);
      service.setActive('my-base-site');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SetActiveBaseSite('my-base-site')
      );
    });

    it('should not dispatch SetActiveBaseSite action if not changed', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValues(mockBaseSiteSelect);
      service.setActive(mockBaseSite);
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
