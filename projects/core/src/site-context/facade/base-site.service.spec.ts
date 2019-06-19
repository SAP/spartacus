import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { SiteConnector, StateWithSiteContext } from '@spartacus/core';
import { of } from 'rxjs';
import { SiteAdapter } from '../connectors/site.adapter';
import * as fromStore from '../store';
import { SiteContextStoreModule } from '../store/site-context-store.module';
import { BaseSiteService } from './base-site.service';
import createSpy = jasmine.createSpy;

describe('BaseSiteService', () => {
  let service: BaseSiteService;
  const mockBaseSite = 'mock-base-site';
  const mockBaseSiteSelect = createSpy('select').and.returnValue(() =>
    of(mockBaseSite)
  );
  const mockBaseSiteDetailsSelect = createSpy('select').and.returnValue(() =>
    of({ uid: 'test-basesite' })
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
          provide: SiteAdapter,
          useValue: {},
        },
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.stub();
    service = TestBed.get(BaseSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getActive should return active baseSite uid', () => {
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
      const connector = TestBed.get(SiteConnector);
      spyOn(connector, 'getBaseSite').and.returnValue(of({}));
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

  it('getBaseSiteData should return active baseSite details', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      mockBaseSiteDetailsSelect
    );

    let result;
    service.getBaseSiteData().subscribe(res => (result = res));
    expect(result).toEqual({ uid: 'test-basesite' });
  });

  it('getBaseSiteData should load base site data if it does not exist', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      createSpy('select').and.returnValue(() => of({}))
    );

    service.getBaseSiteData().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadBaseSite());
  });
});
